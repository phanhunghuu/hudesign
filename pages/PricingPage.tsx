
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, X, Mail, CreditCard, PenTool, Layout, Image as ImageIcon, 
  Printer, FileText, ArrowRight, Star, Zap, Shield, Crown, HelpCircle, AlertCircle
} from 'lucide-react';

const GENERAL_SERVICES = [
  {
    title: "Phong bì thư",
    price: "500.000 VNĐ",
    features: [
      "Thiết kế mới hoàn toàn",
      "Đảm bảo tính thẩm mỹ & nhận diện",
      "Chỉnh sửa thiết kế: 2 lần"
    ],
    icon: <Mail size={24} />
  },
  {
    title: "Thiệp mời",
    price: "300.000 VNĐ",
    features: [
      "Thiết kế đảm bảo tính thẩm mỹ",
      "Sử dụng tone màu phù hợp",
      "Thời gian thực hiện: 1-2 ngày"
    ],
    icon: <CreditCard size={24} />
  },
  {
    title: "Menu",
    price: "Từ 400.000 VNĐ",
    features: [
      "Trang bìa: 400.000 VNĐ",
      "Trang nội dung: 300.000 VNĐ/trang",
      "Đảm bảo tính thẩm mỹ & logic",
      "Chỉnh sửa thiết kế: 2 lần"
    ],
    icon: <Layout size={24} />
  },
  {
    title: "Standee",
    price: "350.000 - 750.000 VNĐ",
    features: [
      "Thiết kế mới hoàn toàn",
      "Đầy đủ thông tin yêu cầu",
      "Thẩm mỹ phù hợp từng lĩnh vực",
      "Thời gian thực hiện: 1-2 ngày"
    ],
    icon: <ImageIcon size={24} />
  },
  {
    title: "Backdrop",
    price: "1.000.000 - 1.500.000 VNĐ",
    features: [
      "Sự kiện, hội nghị, sinh nhật",
      "Đúng nhận diện thương hiệu",
      "Chỉnh sửa thiết kế: 2-3 lần",
      "Thời gian thực hiện: 1-2 ngày"
    ],
    icon: <ImageIcon size={24} />
  },
  {
    title: "Banner/Cover",
    price: "350.000 - 450.000 VNĐ",
    features: [
      "Website / Facebook / Social",
      "Dựa trên ý tưởng khách hàng",
      "Bố cục thẩm mỹ, truyền đạt tốt",
      "Chỉnh sửa thiết kế: 2-3 lần"
    ],
    icon: <Layout size={24} />
  },
  {
    title: "Thẻ (Card/Voucher)",
    price: "400.000 VNĐ",
    features: [
      "Thẻ đeo, thẻ VIP, thẻ bảo hành...",
      "Thiết kế ấn tượng, chuyên nghiệp",
      "Thời gian thiết kế: 1-2 ngày",
      "Giao file in ấn chất lượng cao"
    ],
    icon: <CreditCard size={24} />
  },
  {
    title: "Tờ rơi / Tờ gấp",
    price: "1.000.000 - 1.500.000 VNĐ",
    features: [
      "Đưa đầy đủ thông tin khách hàng",
      "Thiết kế ấn tượng, bắt mắt",
      "Hiệu quả quảng cáo cao",
      "Kích thước: A3, A4, A5, A6"
    ],
    icon: <FileText size={24} />
  }
];

const LOGO_PACKAGES = [
  {
    id: 'basic',
    name: 'CƠ BẢN',
    price: '500.000',
    color: 'bg-green-500',
    icon: <Zap size={20} className="text-white" />
  },
  {
    id: 'standard',
    name: 'PHỔ THÔNG',
    price: '700.000',
    color: 'bg-blue-500',
    icon: <Star size={20} className="text-white" />
  },
  {
    id: 'premium',
    name: 'TIÊU CHUẨN',
    price: '2.000.000',
    color: 'bg-purple-600',
    icon: <Shield size={20} className="text-white" />
  },
  {
    id: 'vip',
    name: 'GÓI VIP',
    price: '6.000.000',
    color: 'bg-orange-500',
    icon: <Crown size={20} className="text-white" />
  }
];

const LOGO_FEATURES = [
  {
    name: 'Số option logo',
    desc: '(Số phương án logo mà Quý khách sẽ được cung cấp để lựa chọn)',
    values: ['2', '3', '5', '6']
  },
  {
    name: 'File bàn giao',
    desc: 'File ảnh: JPG, PNG. File thiết kế: AI, PDF',
    values: [true, true, true, true]
  },
  {
    name: 'Phối cảnh Logo',
    desc: 'Giấy Kraft, bìa da, phối cảnh 3D, kim loại...',
    values: [false, true, true, true]
  },
  {
    name: 'Số lần chỉnh sửa',
    desc: 'Hỗ trợ chỉnh sửa lại các chi tiết trong logo đến số lần tối đa của gói',
    values: ['3', '4', '8', 'Chỉnh sửa đến khi ưng ý']
  },
  {
    name: 'Thời gian gửi demo',
    desc: 'Tính từ lúc nhận được chuyển khoản cọc',
    values: ['4 ngày', '7 ngày', '10 ngày', '20 ngày']
  },
  {
    name: 'Cẩm nang thương hiệu',
    desc: 'Ý nghĩa và quy chuẩn Logo',
    values: [false, false, true, true]
  },
  {
    name: 'Hướng dẫn sử dụng Logo',
    desc: 'Tài liệu hướng dẫn sử dụng logo, những trường hợp cần tránh...',
    values: [false, false, false, true]
  },
  {
    name: 'Dựng Video Intro Logo',
    desc: 'Clip intro 5 - 10s dạng Motion Graphic',
    values: [false, false, false, true]
  }
];

const PricingPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tight">
            Bảng giá <span className="text-indigo-600">Dịch vụ</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">
            Chi phí minh bạch, tối ưu cho từng nhu cầu thiết kế của bạn.
          </p>
        </div>

        {/* SECTION 1: LOGO PACKAGES (MOVED TO TOP) */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
               <Crown size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 uppercase">Bảng giá Thiết kế Logo</h2>
          </div>

          {/* DESKTOP TABLE VIEW */}
          <div className="hidden md:block bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden">
            {/* Table Header (Desktop) */}
            <div className="grid grid-cols-5 bg-slate-50 border-b border-slate-200">
              <div className="p-6 flex items-end">
                 <p className="font-black text-slate-400 text-xs uppercase tracking-widest">Thông tin gói</p>
              </div>
              {LOGO_PACKAGES.map(pkg => (
                <div key={pkg.id} className="p-6 text-center relative group">
                  <div className={`absolute top-0 left-0 w-full h-1 ${pkg.color}`}></div>
                  <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow-md ${pkg.color}`}>
                    {pkg.icon}
                  </div>
                  <h3 className="font-black text-slate-900 text-lg uppercase mb-1">{pkg.name}</h3>
                  <p className="text-indigo-600 font-black text-xl tracking-tight">{pkg.price} VNĐ</p>
                </div>
              ))}
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-100">
              {LOGO_FEATURES.map((feature, idx) => (
                <div key={idx} className="grid grid-cols-5 hover:bg-slate-50/50 transition-colors">
                  {/* Feature Name */}
                  <div className="p-6 border-r border-slate-100 flex flex-col justify-center">
                    <p className="font-bold text-slate-900 text-sm mb-1">{feature.name}</p>
                    {feature.desc && <p className="text-[10px] text-slate-400 font-medium leading-tight">{feature.desc}</p>}
                  </div>

                  {/* Feature Values per Package */}
                  {feature.values.map((val, vIdx) => (
                    <div key={vIdx} className="p-6 flex items-center justify-center border-r last:border-r-0 border-slate-50">
                      {/* Value Display */}
                      <div className="text-center">
                        {val === true ? (
                          <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        ) : val === false ? (
                          <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center">
                            <X size={14} strokeWidth={3} />
                          </div>
                        ) : (
                          <span className="font-bold text-slate-700 text-sm">{val}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Table Footer Actions */}
            <div className="grid grid-cols-5 bg-slate-50 border-t border-slate-200">
               <div className="p-6"></div>
               {LOGO_PACKAGES.map(pkg => (
                 <div key={pkg.id} className="p-6">
                    <Link 
                      to={`/design-brief?service=logo`}
                      className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest text-center block text-white shadow-lg hover:opacity-90 transition-all active:scale-95 ${pkg.color}`}
                    >
                      Chọn gói {pkg.name}
                    </Link>
                 </div>
               ))}
            </div>
          </div>

          {/* MOBILE CARDS VIEW */}
          <div className="md:hidden space-y-6">
            {LOGO_PACKAGES.map((pkg, pkgIndex) => (
              <div key={pkg.id} className="bg-white rounded-[2rem] shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden relative flex flex-col">
                {/* Card Header */}
                <div className={`${pkg.color} p-6 text-white text-center relative`}>
                   <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
                   <div className="relative z-10">
                     <div className="mx-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner ring-2 ring-white/30">
                       {pkg.icon}
                     </div>
                     <h3 className="font-black text-xl uppercase mb-1 tracking-tight">{pkg.name}</h3>
                     <p className="font-black text-3xl tracking-tighter">{pkg.price} <span className="text-sm font-bold opacity-80 align-middle">VNĐ</span></p>
                   </div>
                </div>
                
                {/* Features List */}
                <div className="p-6 space-y-4 flex-grow">
                  {LOGO_FEATURES.map((feature, fIndex) => {
                    const val = feature.values[pkgIndex];
                    if (val === false) return null; // Ẩn các tính năng không có
                    return (
                      <div key={fIndex} className="flex items-start gap-3 text-sm">
                        <div className="shrink-0 mt-0.5">
                          {val === true ? (
                            <Check size={18} className="text-green-500" strokeWidth={3} />
                          ) : (
                            <Star size={18} className="text-indigo-500 fill-indigo-100" />
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-slate-700 block">{feature.name}</span>
                          {val !== true && (
                            <span className="text-indigo-600 font-black block mt-0.5">{val}</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 mt-auto">
                   <Link 
                      to={`/design-brief?service=logo`}
                      className={`block w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest text-center text-white shadow-lg hover:brightness-110 active:scale-95 transition-all ${pkg.color}`}
                    >
                      Chọn gói {pkg.name}
                   </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EXTRA INFO - MOVED HERE */}
        <div className="mb-24 bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-lg text-center space-y-6">
           <h3 className="text-2xl font-black text-slate-900">Sản phẩm thêm theo yêu cầu</h3>
           <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
              <div className="space-y-3">
                 <p className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <Check size={16} className="text-indigo-600" />
                    <span>Thêm 1 phương án thiết kế Logo: <strong className="text-slate-900">500.000đ</strong></span>
                 </p>
                 <p className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <Check size={16} className="text-indigo-600" />
                    <span>Dựng Video Intro Logo (5-10s): <strong className="text-slate-900">1.000.000đ</strong></span>
                 </p>
              </div>
              <div className="space-y-3">
                 <p className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <Check size={16} className="text-indigo-600" />
                    <span>Thiết kế Cẩm nang Ý nghĩa & Quy chuẩn Logo: <strong className="text-slate-900">500.000đ</strong></span>
                 </p>
                 <p className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <Check size={16} className="text-indigo-600" />
                    <span>Cẩm nang thương hiệu + Hướng dẫn sử dụng: <strong className="text-slate-900">2.000.000đ</strong></span>
                 </p>
              </div>
           </div>
        </div>

        {/* SECTION 2: GENERAL SERVICES (MOVED DOWN) */}
        <div className="mb-24">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
               <PenTool size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 uppercase">Thiết kế Đồ họa</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GENERAL_SERVICES.map((service, index) => (
              <div key={index} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all group flex flex-col h-full">
                <div className="mb-4 bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-lg font-black text-slate-900 uppercase mb-2">{service.title}</h3>
                <div className="mb-6">
                  <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-black tracking-tight whitespace-nowrap">
                    {service.price}
                  </span>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-500 font-medium leading-relaxed">
                      <div className="min-w-[4px] h-[4px] rounded-full bg-slate-300 mt-1.5"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/design-brief" 
                  className="w-full py-3 rounded-xl bg-slate-50 text-slate-600 font-black text-xs uppercase tracking-widest text-center hover:bg-indigo-600 hover:text-white transition-all"
                >
                  Đặt thiết kế
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* IMPORTANT NOTES SECTION (UPDATED) */}
        <div className="mt-16 bg-slate-100 rounded-[2rem] p-8 md:p-12 border border-slate-200">
           <h3 className="text-xl font-black text-slate-900 uppercase mb-6 flex items-center gap-2">
              <AlertCircle size={24} className="text-red-500" />
              LƯU Ý QUAN TRỌNG
           </h3>
           <ul className="space-y-3 text-sm font-medium text-slate-600 leading-relaxed list-disc pl-5">
              <li><strong className="text-slate-900">Bảng giá trên chưa bao gồm 10% thuế VAT.</strong></li>
              <li>Bảng giá áp dụng cho phạm vi công việc đã nêu. Các yêu cầu ngoài phạm vi sẽ được báo phí riêng trước khi thực hiện.</li>
              <li>Giá chưa bao gồm chi phí in ấn, mua tài nguyên trả phí, bản quyền hình ảnh / font (nếu có).</li>
              <li>Số lần chỉnh sửa được áp dụng theo gói đã chọn. Các chỉnh sửa phát sinh ngoài số lần quy định sẽ tính thêm phí.</li>
              <li>Thay đổi ý tưởng, phong cách hoặc nội dung chính sau khi đã duyệt concept được xem là yêu cầu mới.</li>
              <li>Thời gian hoàn thành có thể thay đổi nếu khách hàng cung cấp nội dung chậm hoặc chỉnh sửa nhiều lần.</li>
              <li>Designer không chịu trách nhiệm với lỗi phát sinh do nội dung khách cung cấp (sai chính tả, sai thông tin…).</li>
              <li>File bàn giao là file thiết kế theo thỏa thuận. File gốc (AI/PSD) chỉ bao gồm nếu đã ghi rõ trong báo giá.</li>
              <li>Sản phẩm thiết kế chỉ được sử dụng cho mục đích đã thống nhất, mọi mục đích khác cần trao đổi thêm.</li>
              <li>Thanh toán theo thỏa thuận. Công việc chỉ được bàn giao đầy đủ sau khi hoàn tất thanh toán.</li>
           </ul>
        </div>

        {/* CTA BOTTOM */}
        <div className="mt-16 text-center">
           <Link to="/design-brief" className="inline-flex items-center space-x-2 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95">
              <span>Bắt đầu dự án ngay</span>
              <ArrowRight size={18} />
           </Link>
        </div>

      </div>
    </div>
  );
};

export default PricingPage;
