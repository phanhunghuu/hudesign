
import { GoogleGenAI } from "@google/genai";

interface GenerateParams {
  prompt: string;
  hiddenPrompt: string;
  imageBase64?: string;   // Ảnh sản phẩm chính
  imageBase64_2?: string; // Ảnh sản phẩm 2
  imageBase64_3?: string; // Ảnh sản phẩm 3
  logoBase64?: string;    // Ảnh Logo
  headline?: string;      // Tiêu đề chính
  subHeadline?: string;   // Tiêu đề phụ
  styleImageBase64?: string; // Ảnh style
  modelType: 'flash' | 'pro';
  aspectRatio: string;
  resolution: string;
  apiKey: string;
}

// Hàm phụ: Phân tích phong cách ảnh mẫu (Chạy ngầm bước 1)
const analyzeStyleImage = async (apiKey: string, base64Image: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-2.5-flash"; 
  
  const prompt = `
    Analyze the ARTISTIC STYLE of this image for a background generation task.
    
    CRITICAL RULE: IGNORE the main object/product in this image. 
    - Do NOT mention the product name.
    - ONLY describe the surrounding environment, vibe, and TEXT EFFECTS.

    Output 5 key technical aspects (comma separated):
    1. Lighting Type.
    2. Background Texture/Material.
    3. Color Palette.
    4. Composition/Angle.
    5. TYPOGRAPHY STYLE (Important): Describe the text effect.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: 'image/png',
              data: base64Image.split(',')[1]
            }
          }
        ]
      }
    });
    return response.text || "";
  } catch (e) {
    console.warn("Lỗi phân tích style, sẽ bỏ qua bước này:", e);
    return "";
  }
};

export const generateCreativeContent = async (params: GenerateParams) => {
  const { 
    prompt, hiddenPrompt, 
    imageBase64, imageBase64_2, imageBase64_3, 
    logoBase64, headline, subHeadline, 
    styleImageBase64, modelType, aspectRatio, resolution, apiKey 
  } = params;

  if (!apiKey) throw new Error("Chưa có API Key");

  // --- BƯỚC 1: PHÂN TÍCH STYLE (NẾU CÓ) ---
  let styleDescription = "";
  if (styleImageBase64) {
    styleDescription = await analyzeStyleImage(apiKey, styleImageBase64);
  }

  // --- BƯỚC 2: CHUẨN BỊ PARTS VÀ MAPPING DYNAMIC ---
  // Thay vì hardcode thứ tự, ta sẽ push vào mảng và ghi nhận index
  const parts: any[] = []; // Phần text sẽ được unshift vào đầu sau cùng
  let imageMapDescription = "--- INPUT IMAGES MAPPING ---";
  let partIndex = 1; // Bắt đầu từ 1 vì part 0 là text prompt (sẽ add sau)

  // 1. MAIN PRODUCT
  if (imageBase64) {
    parts.push({ inlineData: { mimeType: 'image/png', data: imageBase64.split(',')[1] } });
    imageMapDescription += `\n[IMAGE ${partIndex}]: MAIN PRODUCT (Hero Object). Keep 100% original identity.`;
    partIndex++;
  }

  // 2. PRODUCT 2
  if (imageBase64_2) {
    parts.push({ inlineData: { mimeType: 'image/png', data: imageBase64_2.split(',')[1] } });
    imageMapDescription += `\n[IMAGE ${partIndex}]: SECONDARY PRODUCT. Place harmoniously with Main Product. Keep 100% original identity.`;
    partIndex++;
  }

  // 3. PRODUCT 3
  if (imageBase64_3) {
    parts.push({ inlineData: { mimeType: 'image/png', data: imageBase64_3.split(',')[1] } });
    imageMapDescription += `\n[IMAGE ${partIndex}]: THIRD PRODUCT. Group with others. Keep 100% original identity.`;
    partIndex++;
  }

  // 4. LOGO
  if (logoBase64) {
    parts.push({ inlineData: { mimeType: 'image/png', data: logoBase64.split(',')[1] } });
    imageMapDescription += `\n[IMAGE ${partIndex}]: LOGO. Insert naturally onto the product or background.`;
    partIndex++;
  }

  // 5. STYLE REFERENCE
  if (styleImageBase64) {
    parts.push({ inlineData: { mimeType: 'image/png', data: styleImageBase64.split(',')[1] } });
    imageMapDescription += `\n[IMAGE ${partIndex}]: STYLE REFERENCE. Use lighting/colors from this. IGNORE objects in this image.`;
    partIndex++;
  }

  // --- BƯỚC 3: XÂY DỰNG PROMPT KỸ THUẬT ---
  let textPrompt = `
    ${hiddenPrompt}
    
    USER REQUEST: "${prompt}"
    
    ${imageMapDescription}
    
    --- COMPOSITING & RETOUCHING RULES (STRICT) ---
    You are an Expert Photo Compositor. 
    1. **NO MORPHING**: The user provided REAL products. Do NOT redraw them or change their labels/shapes. Use the exact pixels provided where possible, just blending edges and lighting.
    2. **GROUPING**: If multiple products are provided (Main, Secondary, Third), you MUST include ALL of them in the final image. Arrange them in a professional composition (e.g., triangle layout or side-by-side).
    3. **LIGHTING**: Adjust the lighting and shadows of the products to match the new background environment perfectly.
    
    ${styleDescription ? `--- STYLE GUIDE ---\nUsing "STYLE REFERENCE" image as inspiration:\n${styleDescription}` : ''}
  `;

  // Xử lý Text & Font
  if (headline) {
    textPrompt += `
    \n--- TYPOGRAPHY RULES ---
    1. HEADLINE: "${headline}"
       - Style: 3D Render, Glossy, or Bold Sticker (matching the vibe).
       - Font: Must use a VIETNAMESE-SAFE font (Roboto, Arial, Montserrat) to prevent encoding errors.
    ${subHeadline ? `2. SUB-HEADLINE: "${subHeadline}" (Smaller, below headline).` : ''}
    `;
  }

  // Đưa Text Prompt lên đầu danh sách parts
  parts.unshift({ text: textPrompt });

  // Config
  const modelName = modelType === 'pro' ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
  const config: any = {
    imageConfig: {
      aspectRatio: aspectRatio,
    }
  };

  if (modelType === 'pro') {
      config.imageConfig.imageSize = resolution;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: modelName,
      contents: { parts },
      config: config
    });

    if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
    }
    
    console.error("Gemini Response No Image:", response);
    throw new Error("AI không trả về hình ảnh. Vui lòng thử lại với mô tả khác.");

  } catch (error: any) {
    console.error("--- GEMINI GENERATE ERROR ---", error);
    const msg = error.message || "";

    if (msg.includes("429") || msg.includes("Quota")) {
        throw new Error("Hệ thống quá tải. Vui lòng thử lại sau.");
    }
    if (msg.includes("SAFETY") || msg.includes("blocked")) {
        throw new Error("Nội dung vi phạm tiêu chuẩn an toàn.");
    }
    throw new Error("Lỗi xử lý: " + (msg.length > 50 ? "Vui lòng thử lại" : msg));
  }
};
