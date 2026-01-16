
import { ShoppingBag, Camera, Shirt, Youtube, Palette, PenTool } from 'lucide-react';

export const AI_TASKS = [
  {
    id: 'sales-design',
    label: 'Thiết kế Bán hàng (HOT)',
    icon: ShoppingBag,
    hiddenPrompt: "ROLE: Professional Advertising Designer. TASK: Create a high-converting e-commerce advertisement image. Leave negative space for text. Style: Modern, Commercial.",
    defaultRatio: '1:1',
    description: 'Tạo ảnh quảng cáo sản phẩm chuyên nghiệp, tối ưu chuyển đổi.'
  },
  {
    id: 'product-photo',
    label: 'Chụp ảnh Sản phẩm',
    icon: Camera,
    hiddenPrompt: "ROLE: World-class Product Photographer. TASK: Place the product in a stunning, realistic environment. Soft studio lighting, bokeh background. 8k resolution.",
    defaultRatio: '4:3',
    requiresImage: true,
    description: 'Ghép sản phẩm vào bối cảnh studio 8K siêu thực.'
  },
  {
    id: 'pattern-design',
    label: 'Họa tiết Độc quyền',
    icon: Palette,
    hiddenPrompt: "ROLE: Textile & Surface Designer. TASK: Create a seamless, tileable pattern design. Vector art style or fabric texture.",
    defaultRatio: '1:1',
    description: 'Thiết kế hoa văn, họa tiết vải vóc hoặc bao bì.'
  },
  {
    id: 'outfit-change',
    label: 'Thay đổi Trang phục',
    icon: Shirt,
    hiddenPrompt: "ROLE: Fashion Stylist. TASK: Change the outfit of the person while keeping the pose exactly the same. Realistic fabric textures.",
    defaultRatio: '3:4',
    requiresImage: true,
    description: 'Thay đổi quần áo model giữ nguyên dáng pose.'
  },
  {
    id: 'youtube-thumb',
    label: 'Thumbnail YouTube',
    icon: Youtube,
    hiddenPrompt: "ROLE: YouTube Viral Strategist. TASK: Create a click-bait style background. High saturation, dramatic lighting, exciting atmosphere.",
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
