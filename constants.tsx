
import React from 'react';
import { Palette, Camera, Laptop, Sparkles } from 'lucide-react';
import { Course } from './types';

export const COURSES: Course[] = [
  {
    id: 'marketing-offline',
    title: 'Khóa Thiết kế Đồ họa Marketing (OFFLINE)',
    description: 'Học 2 phần mềm chuyên nghiệp Photoshop (Ps) & Illustrator (Ai).',
    content: 'Đào tạo bài bản từ tư duy thẩm mỹ đến công cụ thiết kế chuyên nghiệp.',
    duration: '8 – 10 buổi (tối thiểu 2h/buổi)',
    suitableFor: ['Người làm Marketing', 'Chủ shop online', 'Sinh viên'],
    originalPrice: '5.990.000 VNĐ',
    discountPrice: '5.490.000 VNĐ',
    type: 'OFFLINE',
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
    id: 'marketing-online',
    title: 'Khóa Thiết kế Đồ họa Marketing (ONLINE)',
    description: 'Tương tự khóa Offline (Ps & Ai), học trực tuyến qua Zoom/Google Meet.',
    content: 'Học mọi lúc mọi nơi nhưng vẫn đảm bảo chất lượng tương tác cao nhất.',
    duration: '8 – 10 buổi (tối thiểu 2h/buổi)',
    suitableFor: ['Người ở xa', 'Người bận rộn', 'Người muốn học linh động tại nhà'],
    originalPrice: '4.990.000 VNĐ',
    discountPrice: '4.490.000 VNĐ',
    type: 'ONLINE',
    perks: [
      'Nền tảng: Zoom, Google Meet hoặc Discord.',
      'Lịch học linh động theo lịch rảnh của học viên.',
      'Hỗ trợ kèm 1 – 1 tận tình.',
      'Giáo trình "cá nhân hóa" cho học viên.',
      'Bài tập thực hành theo nhu cầu của học viên.',
      'Đồng hành hỗ trợ học viên sau khóa học.'
    ],
    curriculum: [
      { session: 'Buổi 1', title: 'Setup phần mềm & Tư duy hình ảnh', topics: ['Cài đặt & tối ưu máy tính', 'Nguyên lý thị giác', 'Quy trình thiết kế Online'] },
      { session: 'Buổi 2-5', title: 'Kỹ thuật Photoshop thực chiến', topics: ['Tách nền vật thể phức tạp', 'Thiết kế Cover/Thumbnail', 'Làm ảnh Gif động quảng cáo'] },
      { session: 'Buổi 6-9', title: 'Thiết kế Vector với Illustrator', topics: ['Vẽ minh họa sản phẩm', 'Thiết kế Infographic', 'Kỹ thuật đổ màu Gradient hiện đại'] },
      { session: 'Buổi 10', title: 'Tổng kết & Định hướng Portfolio', topics: ['Sửa bài cuối khóa', 'Kỹ năng tìm nguồn tài nguyên', 'Hỗ trợ việc làm/Freelance'] }
    ]
  },
  {
    id: 'photography-offline',
    title: 'Khóa Chỉnh sửa ảnh cơ bản cho Photographer (OFFLINE)',
    description: 'Chuyên sâu về Photoshop (Ps) để xử lý hậu kỳ ảnh.',
    content: 'Khóa học chuyên sâu dành riêng cho nhiếp ảnh gia để biến bức ảnh trở nên lung linh.',
    duration: '6 – 7 buổi (tối thiểu 2h/buổi)',
    suitableFor: ['Nhiếp ảnh gia', 'Thợ chụp ảnh studio', 'Freelancer'],
    originalPrice: '3.490.000 VNĐ',
    discountPrice: '2.990.000 VNĐ',
    type: 'OFFLINE',
    perks: [
      'Lịch học linh động: Sắp xếp theo lịch rảnh của học viên.',
      'Hình thức: Hỗ trợ kèm 1 – 1 tận tình.',
      'Nội dung: Giáo trình thiết kế "cá nhân hóa".',
      'Thực hành: Bài tập sát với thực tế.',
      'Hậu mãi: Đồng hành hỗ trợ sau khóa học.'
    ],
    curriculum: [
      { session: 'Buổi 1', title: 'Quản lý file & Camera Raw', topics: ['Quy trình hậu kỳ ảnh RAW', 'Cân bằng trắng & Phơi sáng', 'Khử nhiễu và tăng nét'] },
      { session: 'Buổi 2-3', title: 'Retouch da & Dáng người', topics: ['Kỹ thuật Frequency Separation', 'Chỉnh sửa đường nét (Liquify)', 'Làm đều màu da tự nhiên'] },
      { session: 'Buổi 4-5', title: 'Blading màu nghệ thuật', topics: ['Tạo màu Film/Trong trẻo', 'Xử lý ánh sáng giả lập', 'Áp dụng Preset cá nhân'] },
      { session: 'Buổi 6-7', title: 'Xuất ảnh & Lưu trữ', topics: ['Profile màu cho in ấn', 'Chèn Logo/Watermark hàng loạt', 'Lưu trữ đám mây an toàn'] }
    ]
  },
  {
    id: 'canva-marketing',
    title: 'Khóa Canva Cơ Bản Cho Marketing',
    description: 'Sử dụng Canva để thiết kế nhanh chóng, hiệu quả.',
    content: 'Giải pháp thiết kế "mì ăn liền" chuyên nghiệp cho người không rành kỹ thuật.',
    duration: '4 – 5 buổi (tối thiểu 2h/buổi)',
    suitableFor: ['Content Creator', 'Marketer cần tốc độ', 'Máy tính cấu hình yếu'],
    originalPrice: '4.290.000 VNĐ',
    discountPrice: '2.900.000 VNĐ',
    type: 'OFFLINE',
    perks: [
      'Tiết kiệm 1.300.000 VNĐ khi thanh toán trước.',
      'Lịch học linh động theo thời gian rảnh.',
      'Hỗ trợ kèm 1 – 1 tận tình.',
      'Nội dung: Giáo trình "cá nhân hóa".',
      'Thực hành: Bài tập theo nhu cầu thực tế.'
    ],
    curriculum: [
      { session: 'Buổi 1', title: 'Tổng quan Canva Pro', topics: ['Khai thác kho tài nguyên vô tận', 'Tạo bộ thương hiệu (Brand Kit)', 'Quản lý thiết kế khoa học'] },
      { session: 'Buổi 2-3', title: 'Thiết kế đa kênh', topics: ['Post/Story Facebook & Insta', 'Slide thuyết trình ấn tượng', 'CV/Portfolio chuyên nghiệp'] },
      { session: 'Buổi 4', title: 'Video & Animation cơ bản', topics: ['Làm video Tiktok/Reels ngắn', 'Hiệu ứng chuyển động chữ', 'Chèn nhạc và lồng tiếng'] },
      { session: 'Buổi 5', title: 'Tối ưu hiệu suất làm việc', topics: ['Dùng AI trong Canva (Magic Studio)', 'Làm việc nhóm', 'In ấn trực tiếp từ Canva'] }
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
