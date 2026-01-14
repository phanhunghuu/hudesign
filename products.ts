
import { Product } from './types';

// Helper tối ưu ảnh Unsplash
const opt = (url: string) => url.includes('unsplash.com') ? `${url}&w=800&q=75&auto=format` : url;

export const PRODUCTS: Product[] = [
  {
    id: 'template-marketing-01',
    code: 'CV001',
    name: 'Combo 50+ Mẫu Canva chủ đề TẾT (2026)',
    category: 'Canva',
    price: 99000,
    image: 'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767362560/templatecanva_ooy1ud.png',
    description: 'Bộ template tổng hợp các mẫu thiết kế tết 1 file duy nhất Canva, dễ dàng chỉnh sửa và xuất ảnh.',
    features: ['Chỉnh sửa 100% trên Canva', 'Đa dạng kích thước', 'Hỗ trợ chỉnh sửa'],
    reviewImages: [
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/v1767746833/586649384_1471756938292937_363968141553149955_n_ejikvu.jpg',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/v1767746833/600405375_1496609115807719_1938025937198231248_n_xi4rqq.jpg'
    ],
    downloadUrl: 'https://www.canva.com/design/DAG9yXGNPj4/e3eeUraF53sFej-1twd-cw/edit'
  },
  {
    id: 'insta-brand-pack',
    code: 'CV002',
    name: 'Instagram Brand Identity (30+ Templates)',
    category: 'Canva',
    price: 299000,
    image: opt('https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?'),
    description: 'Xây dựng hình ảnh Instagram chuyên nghiệp và đồng bộ chỉ trong 5 phút.',
    features: ['Đầy đủ Post & Story', 'Tông màu sang trọng', 'Hướng dẫn phối màu'],
    reviewImages: [
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&q=80&w=400'
    ],
    downloadUrl: 'https://www.canva.com/design/DAF-example2'
  },
  {
    id: 'psd-text-effects',
    code: 'PS001',
    name: 'Combo 20 Hiệu Ứng Chữ 3D Retro',
    category: 'Photoshop',
    price: 180000,
    image: opt('https://images.unsplash.com/photo-1561070791-2526d30994b5?'),
    description: 'Biến chữ viết bình thường thành tác phẩm nghệ thuật 3D chỉ với 1 click.',
    features: ['Sử dụng Smart Object', 'Phong cách Retro/Vintage', 'Dễ dàng thay đổi font'],
    reviewImages: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1572044162444-ad60f128bde7?auto=format&fit=crop&q=80&w=400'
    ],
    downloadUrl: 'https://drive.google.com/ps001-example'
  },
  {
    id: 'typography-poster',
    code: 'AI001',
    name: 'Abstract Typography Poster Pack',
    category: 'Illustrator',
    price: 190000,
    image: opt('https://images.unsplash.com/photo-1541462608141-ad60397d4573?'),
    description: 'Bộ sưu tập poster chữ nghệ thuật trừu tượng đầy ấn tượng.',
    features: ['Định dạng Vector AI/EPS', 'Màu sắc chuẩn in ấn'],
    reviewImages: [
      'https://images.unsplash.com/photo-1541462608141-ad60397d4573?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=400'
    ],
    downloadUrl: 'https://drive.google.com/ai001-example'
  },
  {
    id: 'font-premium-01',
    code: 'FT001',
    name: '100+ Font Chữ Việt Hóa Premium',
    category: 'All',
    price: 150000,
    image: opt('https://images.unsplash.com/photo-1558655146-d09347e92766?'),
    description: 'Bộ sưu tập font chữ đã được việt hóa hoàn chỉnh, không lỗi dấu, phù hợp mọi thiết kế.',
    features: ['Hỗ trợ đầy đủ dấu tiếng Việt', 'Đa dạng phong cách', 'Dùng cho cả Mobile & PC'],
    reviewImages: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1583156330890-2169ca440040?auto=format&fit=crop&q=80&w=400'
    ],
    downloadUrl: 'https://drive.google.com/ft001-example'
  }
];
