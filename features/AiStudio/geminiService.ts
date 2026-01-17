
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
  // Ưu tiên dùng model chuyên về ảnh nếu có, hoặc fallback về model đa năng
  const modelName = modelType === 'pro' ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';

  // 2. Xây dựng Prompt "Sandwich" (Kẹp lệnh người dùng vào giữa chỉ dẫn chuyên gia và quy tắc an toàn)
  // Kỹ thuật này giúp AI không bị lạc đề bởi input của người dùng.
  const finalPrompt = `
    ${hiddenPrompt}
    
    SPECIFIC USER REQUEST: "${prompt}"
    
    IMPORTANT: Follow the 'RULES' defined above strictly. Ensure the output is high resolution and visually stunning.
  `;

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
     parts[0].text += " (IMPORTANT: Mimic the art style, color palette, and texture of the provided Reference Style Image).";
  }

  // 4. Config
  const config: any = {
    imageConfig: {
      aspectRatio: aspectRatio,
    }
  };

  // Chỉ Pro model mới hỗ trợ chọn size (1K, 2K, 4K) - Flash mặc định không set được hoặc tự động
  if (modelType === 'pro') {
      config.imageConfig.imageSize = resolution;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: { parts },
      config: config
    });

    // 5. Xử lý kết quả trả về
    if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
    }
    
    // Nếu không có ảnh, có thể do model từ chối prompt (Safety)
    throw new Error("AI từ chối tạo ảnh này do vi phạm chính sách an toàn hoặc lỗi hệ thống.");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    const msg = error.message || "";

    // Xử lý các mã lỗi phổ biến để báo cho khách
    if (msg.includes("429") || msg.includes("Quota") || msg.includes("Resource has been exhausted")) {
        throw new Error("Hệ thống đang quá tải (Hết lượt tạo miễn phí của Server). Vui lòng thử lại sau hoặc liên hệ Admin nạp thêm Credit.");
    }
    
    if (msg.includes("403") || msg.includes("permission")) {
        throw new Error("Lỗi quyền truy cập (API Key chưa bật tính năng tạo ảnh hoặc sai vùng).");
    }

    if (msg.includes("SAFETY")) {
        throw new Error("Nội dung yêu cầu không phù hợp (Vi phạm tiêu chuẩn cộng đồng). Vui lòng đổi mô tả khác.");
    }

    throw new Error("Lỗi kết nối AI: " + (msg.length > 50 ? "Vui lòng thử lại sau" : msg));
  }
};
