
import React from 'react';
import { Palette, Camera, Laptop, Sparkles, Video, Settings2 } from 'lucide-react';
import { Course, Product, CustomerProject } from './types';

// Helper to optimize unsplash images
const opt = (url: string) => url.includes('unsplash.com') ? `${url}&w=800&q=75&auto=format` : url;

/**
 * ============================================================
 * NƠI SỬA ẢNH DỰ ÁN (PORTFOLIO)
 * ============================================================
 * Bạn chỉ cần thay thế các link ảnh trong mảng 'images' bên dưới.
 * Khuyên dùng: Upload ảnh lên Cloudinary hoặc ImgBB rồi dán link vào đây.
 */
export const PORTFOLIO_PROJECTS: CustomerProject[] = [
  {
    id: 'p0',
    brandName: 'Bánh ướt Cây Me',
    category: 'F&B Branding & Social',
    year: '2025-2026',
    images: [
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767747065/cac7b73b-8a72-4c29-afc3-23289fe611f2.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767746833/586649384_1471756938292937_363968141553149955_n_ejikvu.jpg',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767746833/600405375_1496609115807719_1938025937198231248_n_xi4rqq.jpg',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767746833/533646355_1378294757639156_3128667634612435430_n_zluyw1.jpg',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767746833/603927086_1500515078750456_7571103097737398428_n_sn6iav.jpg',
    ]
  },
  {
    id: 'p1',
    brandName: 'Barbershop Gia Lai',
    category: 'Social Media Design',
    year: '2024',
    images: [
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767747552/c47f639d-f2aa-4a91-808e-bf86169deed3.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767747542/HUDESIGN_S_PORTFOLIO-1_suufyh.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767747544/HUDESIGN_S_PORTFOLIO_2_gpupmv.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767747543/HUDESIGN_S_PORTFOLIO_1.png4_p7wehb.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767747544/HUDESIGN_S_PORTFOLIO.png5_v7ekwi.png',
    ]
  },
  {
    id: 'p2',
    brandName: 'Gia Hảo - F&B',
    category: 'F&B Branding',
    year: '2024',
    images: [
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767747775/839b3b16-4e88-403c-89dc-d14aaf9068e8.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767748009/giahao2_yppfai.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767748008/giahao1_og4b5s.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767748007/giahao6_fa9mbw.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767747979/giahao3_cajhzn.png',
    ]
  },
  {
    id: 'p3',
    brandName: 'Fschool - THPT FPT Cần Thơ',
    category: 'Marketing Poster',
    year: '2023',
    images: [
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767750124/33f34a1b-1c5a-42e1-af27-6669bad4719e.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767750525/fpt4_nzeun2.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767750524/fpt3_pys6pn.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767750522/fpt5_etw9zy.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767750522/fpt1_uomyas.png',
    ]
  },
  {
    id: 'p4',
    brandName: 'Citiship.vn - Shipper Cần Thơ',
    category: 'Branding Design',
    year: '2018-2023',
    images: [
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767751290/a2989fda-5547-4793-b6e6-44d99075c536.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767751608/58863f08-e8b9-4d46-9141-cd716896b283.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767751556/c864699d-7d84-458e-8b5b-e801a10e0ccc.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767751419/33ca1150-de5c-4d86-9a63-2891b8283da5.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767751412/72bf2128-3980-45f1-8e6b-c3ec09d4e3f8.png',
    ]
  },
  {
    id: 'p5',
    brandName: 'Yenny Jewelry',
    category: 'Branding Design',
    year: '2022',
    images: [
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/v1767751902/yenny1_iyik2u.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/v1767751966/yenny2_bpxy8n.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/v1767751862/yenny3_nhjrjk.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/v1767751863/yenny4_nuqzhn.png',
      'https://res.cloudinary.com/dcwgy4tnb/image/upload/v1767751887/yenny5_dbxp7w.png',
    ]
  }
];

export const COURSES: Course[] = [
  // ... existing courses ...
  {
    id: 'custom-path',
    title: 'Build Your Own Path - Khóa học Tự chọn',
    description: 'Tự chọn phần mềm và sản phẩm bạn muốn học. AI sẽ thiết kế lộ trình riêng cho bạn.',
    content: 'Dành cho Marketers bận rộn, chỉ muốn học đúng thứ mình cần để áp dụng ngay vào công việc.',
    duration: 'Linh động theo lộ trình',
    suitableFor: ['Marketers thực chiến', 'Chủ shop tối ưu thời gian', 'Người đã có nền tảng'],
    originalPrice: 'Liên hệ',
    discountPrice: 'Tối ưu nhất',
    type: 'OFFLINE',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800',
    isSpecial: true,
    perks: [
      'Học đúng trọng tâm, không lan man.',
      'Lộ trình do AI đề xuất dựa trên mục tiêu.',
      'Tiết kiệm chi phí và thời gian.',
      'Sản phẩm đầu ra là dự án thực tế của bạn.'
    ]
  },
  {
    id: 'canva-marketing',
    title: 'Khóa Canva Cơ Bản Cho Marketing',
    description: 'Sử dụng Canva để thiết kế nhanh chóng, hiệu quả.',
    content: 'Giải pháp thiết kế "mì ăn liền" chuyên nghiệp cho người không rành kỹ thuật.',
    duration: '4 – 5 buổi (tối thiểu 2h/buổi)',
    suitableFor: ['Content Creator', 'Marketer cần tốc độ', 'Máy tính cấu hình yếu'],
    originalPrice: '2.890.000 VNĐ',
    discountPrice: '1.990.000 VNĐ',
    type: 'OFFLINE',
    image: 'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767362810/minh-hoa-canva-3_qk3iec.png',
    isHot: true,
    perks: [
      'Tiết kiệm 900.000 VNĐ khi đăng ký ngay.',
      'Lịch học linh động theo thời gian rảnh.',
      'Hỗ trợ kèm 1 – 1 tận tình.',
      'Nội dung: Giáo trình "cá nhân hóa".',
      'Thực hành: Bài tập theo nhu cầu thực tế.'
    ],
    curriculum: [
      { session: 'Buổi 1', title: 'Tổng quan Canva & Tư duy thiết kế nhanh', topics: ['Giao diện Canva Pro', 'Hệ thống Element & Template', 'Tư duy bố cục kéo thả'] },
      { session: 'Buổi 2', title: 'Thiết kế hình ảnh Online Marketing', topics: ['Thiết kế Post Facebook/Instagram', 'Tạo Story thu hút', 'Sử dụng AI trong Canva'] },
      { session: 'Buổi 3', title: 'Xây dựng Brand Identity đơn giản', topics: ['Chọn bảng màu thương hiệu', 'Kết hợp Font chữ', 'Thiết kế Logo/Namecard nhanh'] },
      { session: 'Buổi 4', title: 'Thiết kế Video & Trình chiếu', topics: ['Tạo video ngắn từ Template', 'Thiết kế Slide thuyết trình', 'Hiệu ứng chuyển động (Animate)'] },
      { session: 'Buổi 5', title: 'Quản lý dự án & Xuất bản', topics: ['Chia sẻ team/client', 'Tối ưu chuẩn in ấn', 'Đóng gói bộ Branding Kit'] }
    ]
  },
  {
    id: 'marketing-offline',
    title: 'Khóa Thiết kế Đồ họa Marketing (OFFLINE)',
    description: 'Học 2 phần mềm chuyên nghiệp Photoshop (Ps) & Illustrator (Ai).',
    content: 'Đào tạo bài bản từ tư duy thẩm mỹ đến công cụ thiết kế chuyên nghiệp.',
    duration: '8 – 10 buổi (tối thiểu 2h/buổi)',
    suitableFor: ['Người làm Marketing', 'Chủ shop online', 'Sinh viên'],
    originalPrice: '6.390.000 VNĐ',
    discountPrice: '5.490.000 VNĐ',
    type: 'OFFLINE',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
    perks: [
      'Lịch học linh động theo lịch rảnh của học viên.',
      'Hỗ trợ kèm 1 – 1 tận tình.',
      'Giáo trình "cá nhân hóa" cho học viên.',
      'Bài tập thực hành theo nhu cầu của học viên.',
      'Đồng hành hỗ trợ học viên sau khóa học.'
    ],
    curriculum: [
      { session: 'Buổi 1', title: 'Tư duy thiết kế & Làm quen Photoshop', topics: ['Bố cục trong Marketing', 'Màu sắc và Font chữ', 'Giao diện và công cụ cơ bản PS'] },
      { session: 'Buổi 2-3', title: 'Xử lý hình ảnh chuyên sâu', topics: ['Cắt ghép vật thể', 'Chỉnh màu sắc sản phẩm', 'Retouch ảnh chân dung cơ bản'] },
      { session: 'Buổi 4-5', title: 'Thiết kế ấn phẩm quảng cáo', topics: ['Banner Facebook/Ads', 'Poster sự kiện', 'Lồng ghép chữ nghệ thuật (Typography)'] },
      { session: 'Buổi 6-8', title: 'Làm chủ Illustrator (Ai)', topics: ['Vẽ Vector chuyên nghiệp', 'Thiết kế Logo/Icon', 'Dàn trang Brochure/Menu'] },
      { session: 'Buổi 9-10', title: 'Project cuối khóa', topics: ['Hoàn thiện bộ nhận diện', 'Xuất file in ấn/digital', 'Đóng gói profile cá nhân'] }
    ]
  },
  {
    id: 'capcut-pro',
    title: 'Khóa Edit Video chuyên nghiệp với Capcut (OFFLINE/ONLINE)',
    description: 'Làm chủ công cụ edit video "quốc dân" trên cả PC và Mobile.',
    content: 'Khóa học thực chiến giúp bạn tạo ra những video TikTok, Reels triệu view với tư duy kể chuyện hình ảnh hiện đại.',
    duration: '8 buổi (tối thiểu 2h/buổi)',
    suitableFor: ['TikToker/YouTuber', 'Chủ doanh nghiệp SME', 'Marketers'],
    originalPrice: '4.700.000 VNĐ',
    discountPrice: '3.800.000 VNĐ',
    type: 'OFFLINE',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800',
    perks: [
      'Kèm 1-1 trực tiếp trên dự án cá nhân.',
      'Học tư duy Storytelling (Kể chuyện qua video).',
      'Tặng kho tài nguyên nhạc, hiệu ứng bản quyền.',
      'Hỗ trợ cài đặt và sử dụng bản Pro.',
      'Bí quyết lên xu hướng TikTok/Reels.'
    ],
    curriculum: [
      { session: 'Buổi 1', title: 'Tư duy Video ngắn & Giao diện Capcut', topics: ['Cấu trúc video triệu view', 'Sử dụng Capcut trên PC vs Mobile', 'Quy trình hậu kỳ chuyên nghiệp'] },
      { session: 'Buổi 2', title: 'Cắt ghép cơ bản & Nhịp điệu (Rhythm)', topics: ['Kỹ thuật cặp (Cut/Split)', 'Tốc độ (Speed Ramp)', 'Chuyển cảnh (Transitions) mượt mà'] },
      { session: 'Buổi 3', title: 'Text, Phụ đề & Typography Video', topics: ['Tự động tạo phụ đề', 'Thiết kế chữ nghệ thuật', 'Hiệu ứng xuất hiện chữ'] },
      { session: 'Buổi 4', title: 'Âm thanh & Hiệu ứng (SFX)', topics: ['Mix nhạc nền & Voiceover', 'Sử dụng hiệu ứng âm thanh (SFX)', 'Đồng bộ hình ảnh theo nhịp nhạc'] },
      { session: 'Buổi 5', title: 'Kỹ xảo nâng cao & Keyframe', topics: ['Làm chủ Keyframe chuyển động', 'Kỹ thuật Masking (Mặt nạ)', 'Sử dụng Overlay sáng tạo'] },
      { session: 'Buổi 6', title: 'Chỉnh màu (Color Grading)', topics: ['Tư duy màu sắc phim ảnh', 'Sử dụng Filter & Adjustments', 'Xử lý phông xanh (Chroma Key)'] },
      { session: 'Buổi 7-8', title: 'Project thực chiến & Xuất bản', topics: ['Hoàn thiện video Reels/TikTok', 'Tối ưu chuẩn đăng đa nền tảng', 'Thủ thuật tìm nguồn tài nguyên video'] }
    ]
  },
  {
    id: 'marketing-online',
    title: 'Khóa Thiết kế Đồ họa Marketing (ONLINE)',
    description: 'Tương tự khóa Offline (Ps & Ai), học trực tuyến qua Zoom/Google Meet.',
    content: 'Học mọi lúc mọi nơi nhưng vẫn đảm bảo chất lượng tương tác cao nhất.',
    duration: '8 – 10 buổi (tối thiểu 2h/buổi)',
    suitableFor: ['Người ở xa', 'Người bận rộn', 'Người muốn học linh động tại nhà'],
    originalPrice: '5.390.000 VNĐ',
    discountPrice: '4.490.000 VNĐ',
    type: 'ONLINE',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800',
    perks: [
      'Nền tảng: Zoom, Google Meet hoặc Discord.',
      'Lịch học linh động theo lịch rảnh của học viên.',
      'Hỗ trợ kèm 1 – 1 tận tình.',
      'Giáo trình "cá nhân hóa" cho học viên.',
      'Bài tập thực hành theo nhu cầu của học viên.',
      'Đồng hành hỗ trợ học viên sau khóa học.'
    ],
    curriculum: [
      { session: 'Buổi 1', title: 'Tư duy thiết kế & Làm quen Photoshop qua Zoom', topics: ['Bố cục trong Marketing', 'Màu sắc và Font chữ', 'Giao diện và công cụ cơ bản PS'] },
      { session: 'Buổi 2-3', title: 'Xử lý hình ảnh chuyên sâu', topics: ['Cắt ghép vật thể', 'Chỉnh màu sắc sản phẩm', 'Retouch ảnh chân dung cơ bản'] },
      { session: 'Buổi 4-5', title: 'Thiết kế ấn phẩm quảng cáo', topics: ['Banner Facebook/Ads', 'Poster sự kiện', 'Lồng ghép chữ nghệ thuật (Typography)'] },
      { session: 'Buổi 6-8', title: 'Làm chủ Illustrator (Ai) trực tuyến', topics: ['Vẽ Vector chuyên nghiệp', 'Thiết kế Logo/Icon', 'Dàn trang Brochure/Menu'] },
      { session: 'Buổi 9-10', title: 'Project cuối khóa & Portfolio', topics: ['Hoàn thiện bộ nhận diện', 'Xuất file in ấn/digital', 'Đóng gói profile cá nhân'] }
    ]
  },
  {
    id: 'photography-offline',
    title: 'Khóa Học Nhiếp Ảnh & Retouch (OFFLINE)',
    description: 'Làm chủ máy ảnh và kỹ thuật hậu kỳ Lightroom/Photoshop chuyên sâu.',
    content: 'Từ kỹ thuật sử dụng máy ảnh đến tư duy xử lý hậu kỳ chuyên nghiệp cho ảnh chân dung và sản phẩm.',
    duration: '8 buổi (tối thiểu 2h/buổi)',
    suitableFor: ['Người mới bắt đầu', 'Marketers', 'Chủ shop'],
    originalPrice: '5.700.000 VNĐ',
    discountPrice: '4.800.000 VNĐ',
    type: 'OFFLINE',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=800',
    perks: [
      'Học trực tiếp với máy ảnh chuyên nghiệp.',
      'Kèm 1-1 tư duy bố cục và ánh sáng.',
      'Làm chủ Lightroom & Photoshop Retouch.',
      'Hỗ trợ buổi chụp thực tế tại Studio.',
      'Cung cấp kho preset độc quyền.'
    ],
    curriculum: [
      { session: 'Buổi 1', title: 'Làm chủ máy ảnh & Thông số cơ bản', topics: ['ISO, Khẩu độ, Tốc độ', 'Cân bằng trắng WB', 'Các chế độ chụp M/A/S/P'] },
      { session: 'Buổi 2', title: 'Tư duy bố cục & Ánh sáng', topics: ['Quy tắc 1/3, đường dẫn', 'Ánh sáng tự nhiên vs Nhân tạo', 'Góc máy trong nhiếp ảnh'] },
      { session: 'Buổi 3-4', title: 'Thực hành chụp Chân dung/Sản phẩm', topics: ['Setup mẫu/bối cảnh', 'Điều phối ánh sáng', 'Lấy nét và kiểm soát DOF'] },
      { session: 'Buổi 5-6', title: 'Hậu kỳ với Adobe Lightroom', topics: ['Quản lý thư viện ảnh', 'Chỉnh màu (Color Grading)', 'Lọc và xuất file hàng loạt'] },
      { session: 'Buổi 7-8', title: 'Retouch chuyên sâu với Photoshop', topics: ['Xử lý da chuyên nghiệp', 'Nắn bóp hình thể (Liquify)', 'Ghép nền và tạo hiệu ứng'] }
    ]
  }
];

export const CUSTOM_BUILDER_OPTIONS = {
  softwares: [
    { id: 'canva', name: 'Canva', icon: 'https://www.vectorlogo.zone/logos/canva/canva-icon.svg', color: '#00c4cc' },
    { id: 'photoshop', name: 'Photoshop', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg', color: '#31a8ff' },
    { id: 'illustrator', name: 'Illustrator', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg', color: '#ff9a00' },
    { id: 'capcut', name: 'CapCut', icon: 'https://cdn.icon-icons.com/icons2/3914/PNG/512/capcut_logo_icon_248719.png', color: '#ffffff' }
  ],
  onlineProducts: [
    { id: 'social-media', name: 'Social Media Posts', icon: '📱' },
    { id: 'poster-online', name: 'Poster Online', icon: '🎨' },
    { id: 'banner-ads', name: 'Banner Quảng cáo', icon: '📈' },
    { id: 'video-ads', name: 'Video Quảng cáo', icon: '🎬' },
    { id: 'tiktok-reels', name: 'Video TikTok/Reels', icon: '🎵' },
    { id: 'avatar-cover', name: 'Avatar & Ảnh bìa', icon: '👤' }
  ],
  printProducts: [
    { id: 'magazine', name: 'Tạp chí/Sách', icon: '📖' },
    { id: 'flyer', name: 'Tờ rơi/Menu', icon: '📄' },
    { id: 'standee', name: 'Standee/Băng rôn', icon: '🚩' },
    { id: 'business-card', name: 'Danh thiếp/Namecard', icon: '💳' }
  ],
  levels: [
    { id: 'beginner', name: 'Người mới bắt đầu', description: 'Chưa biết gì về công cụ' },
    { id: 'basic', name: 'Đã biết cơ bản', description: 'Muốn học nâng cao thực chiến' },
    { id: 'fast', name: 'Cấp tốc', description: 'Học nhanh để đi làm ngay' }
  ]
};

export const PRODUCTS: Product[] = [
  {
    id: 'template-marketing-01',
    name: 'Combo 50+ Mẫu Canva chủ đề TẾT (2026)',
    category: 'Canva',
    price: 99000,
    image: 'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767362560/templatecanva_ooy1ud.png',
    description: 'Bộ template tổng hợp các mẫu thiết kế tết 1 file duy nhất Canva, dễ dàng chỉnh sửa và xuất ảnh',
    features: ['Chỉnh sửa 100% trên Canva', 'Đa dạng kích thước', 'Hỗ trợ chỉnh sửa'],
    reviewImages: [
      opt('https://images.unsplash.com/photo-1608389163042-8347129571a5?'),
      opt('https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?'),
      opt('https://images.unsplash.com/photo-1549490349-8643362247b5?'),
      opt('https://images.unsplash.com/photo-1583946099379-f9c9cb8bc030?')
    ]
  },
  {
    id: 'insta-brand-pack',
    name: 'Instagram Brand Identity (30+ Templates)',
    category: 'Canva',
    price: 299000,
    image: opt('https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?'),
    description: 'Xây dựng hình ảnh Instagram chuyên nghiệp và đồng bộ chỉ trong 5 phút.',
    features: ['Đầy đủ Post & Story', 'Tông màu sang trọng, hiện đại', 'Hướng dẫn phối màu thương hiệu'],
    reviewImages: [
      opt('https://images.unsplash.com/photo-1611162616475-46b635cb6868?'),
      opt('https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?')
    ]
  },
  {
    id: 'ai-brushes-pro',
    name: 'Hudesign Brush Pro for Illustrator',
    category: 'Illustrator',
    price: 250000,
    image: opt('https://images.unsplash.com/photo-1558655146-d09347e92766?'),
    description: 'Bộ Brush vẽ minh họa chuyên sâu, giúp nét vẽ tự nhiên như vẽ tay.',
    features: ['30+ nét vẽ khác nhau', 'Hỗ trợ Ai mọi phiên bản', 'Hướng dẫn cài đặt chi tiết']
  },
  {
    id: 'logo-kit-minimal',
    name: 'Minimalist Logo Construction Kit',
    category: 'Illustrator',
    price: 350000,
    image: opt('https://images.unsplash.com/photo-1626785774625-ddc7c82a173e?'),
    description: 'Tự tạo Logo chuyên nghiệp từ các khối hình học cơ bản có sẵn.',
    features: ['100+ thành phần Vector', 'Dễ dàng tùy biến hình dạng', 'Tặng kèm 20 bảng màu Logo']
  },
  {
    id: 'psd-poster-mockup',
    name: '10 PSD Mockup Poster Đường Phố',
    category: 'Photoshop',
    price: 150000,
    image: opt('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?'),
    description: 'Mockup chất lượng cao giúp bản thiết kế trông chuyên nghiệp hơn.',
    features: ['Độ phân giải 4K', 'Dễ dàng thay đổi nội dung', 'Layer sắp xếp khoa học']
  },
  {
    id: 'psd-text-effects',
    name: 'Combo 20 Hiệu Ứng Chữ 3D Retro',
    category: 'Photoshop',
    price: 180000,
    image: opt('https://images.unsplash.com/photo-1561070791-2526d30994b5?'),
    description: 'Biến chữ viết bình thường thành tác phẩm nghệ thuật 3D chỉ với 1 click.',
    features: ['Sử dụng Smart Object', 'Phong cách Retro/Vintage', 'Có thể chỉnh sửa font chữ']
  },
  {
    id: 'all-in-one-cv',
    name: 'Template CV & Portfolio Chuyên Nghiệp',
    category: 'All',
    price: 120000,
    image: opt('https://images.unsplash.com/photo-1586281380349-632531db7ed4?'),
    description: 'Mẫu hồ sơ năng lực giúp bạn nổi bật trong mắt nhà tuyển dụng.',
    features: ['Có file Canva & Photoshop', 'Bố cục rõ ràng, hiện đại', 'Tặng kèm tài liệu hướng dẫn viết CV']
  },
  {
    id: 'youtube-kit',
    name: 'YouTube Content Creator Starter Kit',
    category: 'All',
    price: 450000,
    image: opt('https://images.unsplash.com/photo-1524758631624-e2822e304c36?'),
    description: 'Tất cả tài nguyên để bắt đầu kênh YouTube: Banner, Thumbnail, Intro Overlay.',
    features: ['15+ mẫu Thumbnail clickbait', 'Banner tối ưu cho mọi thiết bị', 'Bản quyền trọn đời']
  },
  {
    id: 'fashion-editorial',
    name: 'Fashion Editorial Lookbook Template',
    category: 'Photoshop',
    price: 280000,
    image: opt('https://images.unsplash.com/photo-1509631179647-0177331693ae?'),
    description: 'Thiết kế Lookbook thời trang đẳng cấp như các tạp chí lớn.',
    features: ['Layer thông minh', 'Tự động dàn trang', 'Phong cách tối giản High-end']
  },
  {
    id: 'typography-poster',
    name: 'Abstract Typography Poster Pack',
    category: 'Illustrator',
    price: 190000,
    image: opt('https://images.unsplash.com/photo-1541462608141-ad60397d4573?'),
    description: 'Bộ sưu tập poster chữ nghệ thuật trừu tượng đầy ấn tượng.',
    features: ['Định dạng Vector AI/EPS', 'Dễ dàng thay đổi text', 'Màu sắc Pantone chuẩn in ấn']
  },
  {
    id: 'food-menu-canva',
    name: 'Restaurant & Cafe Menu (Canva Edit)',
    category: 'Canva',
    price: 220000,
    image: opt('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?'),
    description: 'Mẫu menu cho nhà hàng, quán cà phê sang trọng và thu hút.',
    features: ['Bố cục 1-2 trang', 'Hình ảnh minh họa sắc nét', 'Font chữ Việt hóa sẵn']
  }
];

export const SPECIAL_FEATURES = [
  {
    icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
    title: 'Kèm 1 – 1 cầm tay chỉ việc',
    description: 'Học viên được người hướng dẫn trực tiếp tận tình trong suốt buổi học.'
  },
  {
    icon: <Laptop className="w-6 h-6 text-indigo-500" />,
    title: 'Lịch học linh động',
    description: 'Rảnh giờ nào học giờ đó, không lo mất buổi hoặc không theo kịp lớp.'
  },
  {
    icon: <Palette className="w-6 h-6 text-indigo-500" />,
    title: 'Giáo trình cá nhân hóa',
    description: 'Nội dung được soạn riêng dựa trên nhu cầu và mục tiêu thực tế của bạn.'
  }
];
