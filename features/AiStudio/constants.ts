
import { ShoppingBag, Camera, Shirt, Youtube, Palette, PenTool } from 'lucide-react';

export const AI_TASKS = [
  {
    id: 'sales-design',
    label: 'Thiết kế Bán hàng (HOT)',
    icon: ShoppingBag,
    hiddenPrompt: "ROLE: Expert Advertising Designer. GOAL: Create a high-converting product background for e-commerce. RULES: 1. Minimalist and clean composition. 2. Leave 30% negative space for overlay text. 3. Lighting must be soft studio quality. 4. Style: Commercial, Premium, Modern. 5. NO text, NO blurry elements.",
    defaultRatio: '1:1',
    description: 'Tạo ảnh quảng cáo sản phẩm chuyên nghiệp, tối ưu chuyển đổi.'
  },
  {
    id: 'product-photo',
    label: 'Chụp ảnh Sản phẩm',
    icon: Camera,
    hiddenPrompt: "ROLE: World-class Product Photographer. GOAL: Hyper-realistic product photography. RULES: 1. Depth of field with bokeh background. 2. Lighting: Dramatic rim light or soft window light. 3. Texture: 8K resolution, highly detailed. 4. Context: Luxury environment suitable for the object. 5. Photorealistic, NOT illustration.",
    defaultRatio: '4:3',
    requiresImage: true,
    description: 'Ghép sản phẩm vào bối cảnh studio 8K siêu thực.'
  },
  {
    id: 'pattern-design',
    label: 'Họa tiết Độc quyền',
    icon: Palette,
    hiddenPrompt: "ROLE: Textile & Surface Designer. GOAL: Create a Seamless Pattern. RULES: 1. View: Top-down flat lay (2D). 2. No perspective, no shadows, no depth. 3. Style: Vector art, clean lines, or fabric texture. 4. Repeatable design. 5. Colors: Harmonious palette.",
    defaultRatio: '1:1',
    description: 'Thiết kế hoa văn, họa tiết vải vóc hoặc bao bì.'
  },
  {
    id: 'outfit-change',
    label: 'Thay đổi Trang phục',
    icon: Shirt,
    hiddenPrompt: "ROLE: High-Fashion Stylist & Digital Artist. GOAL: Visualizing fashion outfit. RULES: 1. Focus strictly on the clothing material (silk, denim, leather...). 2. Realistic fabric draping and physics. 3. Lighting matches the original scene. 4. Keep the pose natural. 5. High-fashion magazine quality.",
    defaultRatio: '3:4',
    requiresImage: true,
    description: 'Thay đổi quần áo model giữ nguyên dáng pose.'
  },
  {
    id: 'youtube-thumb',
    label: 'Thumbnail YouTube',
    icon: Youtube,
    hiddenPrompt: "ROLE: Viral YouTube Strategist. GOAL: Create a Clickbait Background. RULES: 1. High contrast and high saturation. 2. Dramatic facial expressions (if people present) or dramatic lighting. 3. Background: Exciting, mysterious, or action-packed. 4. Composition: Rule of thirds. 5. Style: 3D Render or Digital Art, Vibrant colors.",
    defaultRatio: '16:9',
    description: 'Tạo nền thumbnail kịch tính, thu hút lượt click.'
  }
];

export const ASPECT_RATIOS = [
  { label: 'Vuông (1:1)', value: '1:1' },
  { label: 'Ngang (16:9)', value: '16:9' },
  { label: 'Dọc (9:16)', value: '9:16' },
  { label: 'Ảnh (4:3)', value: '4:3' },
  { label: 'Chân dung (3:4)', value: '3:4' },
];

export const RESOLUTIONS = [
  { label: '1K (Tiêu chuẩn)', value: '1K', isVip: false },
  { label: '2K (Sắc nét)', value: '2K', isVip: true },
  { label: '4K (Siêu nét)', value: '4K', isVip: true },
];

export const MODELS = [
  { id: 'flash', name: 'Cơ bản (Flash)', desc: 'Tốc độ nhanh, Miễn phí', isVip: false },
  { id: 'pro', name: 'Chuyên nghiệp (Pro)', desc: 'Chất lượng cao, VIP', isVip: true },
];
