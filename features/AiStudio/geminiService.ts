
import { GoogleGenAI } from "@google/genai";

interface GenerateParams {
  prompt: string;
  hiddenPrompt: string;
  imageBase64?: string; // Ảnh gốc (nếu có)
  styleImageBase64?: string; // Ảnh style (nếu có)
  modelType: 'flash' | 'pro';
  aspectRatio: string;
  resolution: string;
  apiKey: string;
}

export const generateCreativeContent = async (params: GenerateParams) => {
  const { prompt, hiddenPrompt, imageBase64, styleImageBase64, modelType, aspectRatio, resolution, apiKey } = params;

  if (!apiKey) throw new Error("Chưa có API Key");

  const ai = new GoogleGenAI({ apiKey });
  
  // 1. Chọn Model
  const modelName = modelType === 'pro' ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';

  // 2. Xây dựng Prompt cuối cùng
  const finalPrompt = `${hiddenPrompt} USER REQUEST: ${prompt}`;

  // 3. Chuẩn bị nội dung gửi đi (Parts)
  const parts: any[] = [{ text: finalPrompt }];

  if (imageBase64) {
    parts.push({
      inlineData: {
        mimeType: 'image/png', // Giả định png/jpeg đều ok
        data: imageBase64.split(',')[1] // Loại bỏ prefix data:image/...
      }
    });
  }

  if (styleImageBase64) {
     // Nếu có ảnh style, thêm vào prompt text hoặc gửi kèm (tùy logic model, ở đây gửi kèm part)
     parts.push({
        inlineData: {
            mimeType: 'image/png',
            data: styleImageBase64.split(',')[1]
        }
     });
     parts[0].text += " (Follow the style of the provided reference image)";
  }

  // 4. Config
  const config: any = {
    imageConfig: {
      aspectRatio: aspectRatio,
    }
  };

  // Chỉ Pro model mới hỗ trợ chọn size (1K, 2K, 4K) - Flash mặc định không set được hoặc tự động
  if (modelType === 'pro') {
      // Logic mapping resolution string to API enum if needed, or passes string if supported. 
      // Tài liệu: "Supported values are 1K, 2K, and 4K"
      config.imageConfig.imageSize = resolution;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: { parts },
      config: config
    });

    // 5. Xử lý kết quả trả về
    // Tìm phần tử có inlineData (là ảnh)
    if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
    }
    
    throw new Error("Không tìm thấy ảnh trong phản hồi của AI.");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Lỗi khi tạo ảnh với Gemini.");
  }
};
