
import React from 'react';
import { Palette, Camera, Laptop, Sparkles, Video, Settings2 } from 'lucide-react';
import { Course, CustomerProject } from './types';

// Helper to optimize images
const opt = (url: string) => url.includes('unsplash.com') ? `${url}&w=800&q=75&auto=format` : url;

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
    duration: '4 – 5 buổi',
    suitableFor: ['Content Creator', 'Marketer cần tốc độ'],
    originalPrice: '2.890.000 VNĐ',
    discountPrice: '1.990.000 VNĐ',
    type: 'OFFLINE',
    image: 'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767362810/minh-hoa-canva-3_qk3iec.png',
    isHot: true,
    perks: [
      'Tặng tài khoản Canva Pro.',
      'Lịch học linh động.',
      'Thực hành theo dự án của bạn.'
    ],
    curriculum: [
      { session: 'Buổi 1', title: 'Tổng quan Canva & Tư duy thiết kế nhanh', topics: ['Giao diện Canva Pro', 'Hệ thống Element', 'Tư duy bố cục'] },
      { session: 'Buổi 2', title: 'Thiết kế hình ảnh Marketing', topics: ['Post Facebook', 'Story thu hút', 'AI trong Canva'] },
      { session: 'Buổi 3-5', title: 'Video & Quản lý Branding', topics: ['Edit Video ngắn', 'Thiết kế Slide', 'Đóng gói Brand Kit'] }
    ]
  },
  {
    id: 'marketing-offline',
    title: 'Thiết Kế Đồ Họa 2D (Ps + Ai)',
    description: 'Làm chủ bộ đôi Photoshop và Illustrator để cân mọi dự án thiết kế.',
    content: 'Từ tư duy bố cục, phối màu đến kỹ thuật xử lý ảnh chuyên sâu và vẽ vector.',
    duration: '10 – 12 buổi',
    suitableFor: ['Người mới bắt đầu', 'Marketers', 'Sinh viên'],
    originalPrice: '5.500.000 VNĐ',
    discountPrice: '4.500.000 VNĐ',
    type: 'OFFLINE',
    image: opt('https://images.unsplash.com/photo-1561070791-2526d30994b5?'),
    perks: [
      'Học trọn bộ Ps và Ai thực chiến.',
      'Kèm 1-1 trực tiếp tại Cần Thơ.',
      'Hỗ trợ cài đặt phần mềm miễn phí.',
      'Cấp chứng nhận hoàn thành từ Hudesign.'
    ],
    curriculum: [
      { session: 'Buổi 1-3', title: 'Làm chủ Photoshop cơ bản', topics: ['Giao diện & Layer', 'Cắt ghép vật thể', 'Xử lý màu sắc'] },
      { session: 'Buổi 4-6', title: 'Thiết kế ấn phẩm truyền thông', topics: ['Banner Facebook', 'Poster quảng cáo', 'Retouch ảnh chân dung'] },
      { session: 'Buổi 7-10', title: 'Thiết kế Vector với Illustrator', topics: ['Vẽ Logo', 'Thiết kế bộ nhận diện', 'Dàn trang in ấn'] }
    ]
  },
  {
    id: 'capcut-pro',
    title: 'Edit Video Thực Chiến (CapCut PC)',
    description: 'Biến video thô thành những thước phim triệu view chỉ với CapCut.',
    content: 'Khóa học tập trung vào kỹ thuật cắt ghép, hiệu ứng, âm thanh và chuyển cảnh chuyên nghiệp.',
    duration: '6 – 8 buổi',
    suitableFor: ['Content Creator', 'TikToker', 'Chủ shop'],
    originalPrice: '3.500.000 VNĐ',
    discountPrice: '2.500.000 VNĐ',
    type: 'OFFLINE',
    image: opt('https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1768356607/khoa-hoc-video_et1cgd.png'),
    perks: [
      'Tặng kho hiệu ứng & nhạc không bản quyền.',
      'Hướng dẫn xây dựng kịch bản video.',
      'Tư duy màu sắc và nhịp điệu video.'
    ]
  },
  {
    id: 'marketing-online',
    title: 'Thiết kế đồ họa 2D (Học online)',
    description: 'Dành cho các bạn ở xa muốn học thiết kế để phục vụ công việc Marketing.',
    content: 'Lớp học trực tuyến tương tác cao, học đến đâu thực hành được ngay đó.',
    duration: '8 buổi',
    suitableFor: ['Các bạn ở xa Cần Thơ', 'Người bận rộn'],
    originalPrice: '4.000.000 VNĐ',
    discountPrice: '3.200.000 VNĐ',
    type: 'ONLINE',
    image: opt('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?'),
    perks: [
      'Có video xem lại sau mỗi buổi học.',
      'Hỗ trợ qua Ultraview/Teamview.',
      'Giáo trình tinh gọn, ứng dụng cao.'
    ]
  },
  {
    id: 'photography-offline',
    title: 'Kỹ năng Photoshop cho Photographer',
    description: 'Trang bị kỹ năng Photoshop cần thiết để chỉnh sửa và hậu kỳ ảnh chuyên nghiệp',
    content: 'Học retouch, chỉnh màu, ánh sáng và hoàn thiện ảnh theo workflow thực tế',
    duration: '5 buổi',
    suitableFor: ['Chủ shop online', 'Photographer'],
    originalPrice: '3.800.000 VNĐ',
    discountPrice: '2.900.000 VNĐ',
    type: 'OFFLINE',
    image: opt('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?'),
    perks: [
      'Retouch chuyên sâu, đánh sáng',
      'Hỗ trợ các plugin chuyên dụng.',
      'Hướng dẫn retouch ảnh sản phẩm cao cấp.'
    ]
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

export const CUSTOM_BUILDER_OPTIONS = {
  softwares: [
    { id: 'photoshop', name: 'Photoshop', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg' },
    { id: 'illustrator', name: 'Illustrator', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg' },
    { id: 'canva', name: 'Canva Pro', icon: 'https://www.vectorlogo.zone/logos/canva/canva-icon.svg' },
    { id: 'capcut', name: 'CapCut PC', icon: 'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767362810/minh-hoa-canva-3_qk3iec.png' },
  ],
  onlineProducts: [
    { id: 'fb-ads', name: 'Facebook Ads', icon: '📱' },
    { id: 'tiktok-video', name: 'TikTok/Reels', icon: '🎬' },
    { id: 'branding-online', name: 'Avatar/Cover', icon: '👤' },
  ],
  printProducts: [
    { id: 'menu', name: 'Menu/Catalog', icon: '📖' },
    { id: 'namecard', name: 'Name Card', icon: '💳' },
    { id: 'poster', name: 'Poster/Banner', icon: '🖼️' },
  ],
  levels: [
    { id: 'beginner', name: 'Người mới bắt đầu', description: 'Chưa biết gì về thiết kế hoặc công cụ.' },
    { id: 'basic', name: 'Đã biết cơ bản', description: 'Đã dùng qua công cụ nhưng chưa có tư duy.' },
    { id: 'advance', name: 'Muốn chuyên sâu', description: 'Đã làm được sản phẩm, muốn tối ưu hơn.' },
  ]
};
