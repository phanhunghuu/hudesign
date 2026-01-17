
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, X, PenTool, Layout, 
  Printer, ArrowRight, ArrowDown, Star, Zap, Shield, Crown, HelpCircle, AlertCircle,
  Monitor, Package, MessageSquare, CreditCard, CheckCircle2
} from 'lucide-react';

// === DỮ LIỆU LOGO (GIỮ NGUYÊN) ===
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
  { name: 'Số option logo', values: ['2', '3', '5', '6'] },
  { name: 'File bàn giao (AI, PDF, PNG)', values: [true, true, true, true] },
  { name: 'Phối cảnh Logo (Mockup)', values: [false, true, true, true] },
  { name: 'Số lần chỉnh sửa', values: ['3', '4', '8', 'Không giới hạn'] },
  { name: 'Thời gian demo', values: ['4 ngày', '7 ngày', '10 ngày', '20 ngày'] },
  { name: 'Cẩm nang thương hiệu', values: [false, false, true, true] },
  { name: 'Hướng dẫn sử dụng', values: [false, false, false, true] },
  { name: 'Video Intro Logo', values: [false, false, false, true] }
];

// === DỮ LIỆU BRANDING KIT ===
const BRANDING_PACKAGES = [
  {
    id: 'kit-basic',
    name: 'KIT BASIC',
    price: '4.000.000',
    desc: 'Khởi đầu chuyên nghiệp cho Shop nhỏ',
    color: 'bg-teal-500',
    features: [
      { text: '1 Logo nhận diện (3 Option, sửa 4 lần)', highlight: true },
      { text: '1 Menu thiết kế (Tối đa 2 mặt)' },
      { text: '1 Name Card (2 mặt)' },
      { text: '4 Post Social Media (Template)' }
    ]
  },
  {
    id: 'kit-core',
    name: 'KIT CORE',
    price: '6.000.000',
    desc: 'Giải pháp đồng bộ toàn diện',
    color: 'bg-indigo-600',
    popular: true,
    features: [
      { text: '1 Logo nhận diện (3 Option, sửa 4 lần)', highlight: true },
      { text: '1 Menu thiết kế (Tối đa 2 mặt)' },
      { text: '1 Name Card (2 mặt)' },
      { text: '1 Bảng hiệu / Biển vẫy' },
      { text: '6 Post Social Media (Template)', highlight: true }
    ]
  },
  {
    id: 'kit-pro',
    name: 'KIT PRO',
    price: '8.000.000',
    desc: 'Gói cao cấp đầy đủ nhất',
    color: 'bg-purple-600',
    features: [
      { text: '1 Logo nhận diện (3 Option, sửa 4 lần)', highlight: true },
      { text: '1 Menu thiết kế (Tối đa 2 mặt)' },
      { text: '1 Name Card (2 mặt)' },
      { text: '1 Bảng hiệu / Biển vẫy' },
      { text: '10 Post Social Media (Template)', highlight: true }
    ]
  }
];

// === DỮ LIỆU IN ẤN ===
const PRINT_SERVICES = [
  { title: "Menu", price: "Từ 400.000đ", note: "Bìa 400k, Ruột 300k/trang" },
  { title: "Card Visit / Voucher", price: "400.000đ", note: "Thiết kế 2 mặt chuẩn in" },
  { title: "Tờ rơi / Flyer", price: "1.000.000đ - 1.500.000đ", note: "A3, A4, A5, A6" },
  { title: "Standee", price: "350.000đ - 750.000đ", note: "Thiết kế sự kiện, quảng cáo" },
  { title: "Backdrop", price: "1.000.000đ - 1.500.000đ", note: "Hội nghị, sinh nhật, tiệc" },
  { title: "Phong bì thư", price: "500.000đ", note: "Đồng bộ nhận diện" },
  { title: "Thiệp mời", price: "300.000đ", note: "Sang trọng, thẩm mỹ" },
];

// === DỮ LIỆU SOCIAL MEDIA ===
const SOCIAL_SERVICES = [
  { title: "Banner / Cover Fanpage", price: "350.000đ - 450.000đ", desc: "Ảnh bìa Facebook, Zalo, Shopee chuẩn kích thước." },
  { title: "Template Post (Gói lẻ)", price: "200.000đ / Post", desc: "Thiết kế theo nhận diện, dùng để chạy quảng cáo." },
  { title: "Thiết kế Story / Reels Cover", price: "250.000đ / Ảnh", desc: "Ảnh dọc tối ưu hiển thị mobile." },
];

// === DANH SÁCH CATEGORY CHÍNH ===
const MAIN_CATEGORIES = [
  {
    id: 'logo',
    title: 'Thiết kế Logo',
    subtitle: 'Nhận diện cốt lõi',
    icon: <PenTool className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    bg: 'bg-slate-900',
  },
  {
    id: 'branding',
    title: 'Branding Kit',
    subtitle: 'Combo Tiết kiệm',
    icon: <Package className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    bg: 'bg-indigo-600',
  },
  {
    id: 'social',
    title: 'Social Media',
    subtitle: 'Banner & Ads',
    icon: <Monitor className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    bg: 'bg-purple-600',
  },
  {
    id: 'print',
    title: 'Ấn phẩm in ấn',
    subtitle: 'Menu, Card, Poster',
    icon: <Printer className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    bg: 'bg-orange-500',
  }
];

const PricingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const closeModal = () => setSelectedCategory(null);

  // Render Modal Content based on category
  const renderModalContent = () => {
    switch (selectedCategory) {
      case 'logo':
        return (
          <div className="space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-slate-900 uppercase">Bảng giá Logo</h3>
              <p className="text-slate-500 text-sm">Chọn gói phù hợp với quy mô doanh nghiệp của bạn</p>
            </div>
            
            {/* Desktop Table for Logo */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200">
              <div className="grid grid-cols-5 bg-slate-50 border-b border-slate-200">
                <div className="p-4 font-black text-xs uppercase text-slate-400 flex items-end">Tính năng</div>
                {LOGO_PACKAGES.map(pkg => (
                  <div key={pkg.id} className="p-4 text-center">
                    <h4 className={`font-black ${pkg.id === 'vip' ? 'text-orange-500' : 'text-slate-900'}`}>{pkg.name}</h4>
                    <p className="text-indigo-600 font-bold text-sm">{pkg.price}</p>
                  </div>
                ))}
              </div>
              <div className="divide-y divide-slate-100 bg-white">
                {LOGO_FEATURES.map((feat, idx) => (
                  <div key={idx} className="grid grid-cols-5 hover:bg-slate-50 transition-colors">
                    <div className="p-4 text-sm font-medium text-slate-600 flex items-center">{feat.name}</div>
                    {feat.values.map((val, vIdx) => (
                      <div key={vIdx} className="p-4 flex items-center justify-center border-l border-slate-50">
                        {val === true ? <Check size={16} className="text-green-500" /> : val === false ? <span className="text-slate-200">-</span> : <span className="text-xs font-bold text-slate-700">{val}</span>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Cards for Logo */}
            <div className="md:hidden space-y-4">
              {LOGO_PACKAGES.map((pkg, i) => (
                <div key={pkg.id} className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-black text-slate-900">{pkg.name}</h4>
                      <p className="text-indigo-600 font-bold">{pkg.price}</p>
                    </div>
                    <div className={`p-2 rounded-full ${pkg.color}`}>{pkg.icon}</div>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {LOGO_FEATURES.map((feat, idx) => {
                      const val = feat.values[i];
                      if (val === false) return null;
                      return (
                        <li key={idx} className="flex justify-between border-b border-slate-50 pb-1 last:border-0">
                          <span>{feat.name}</span>
                          <span className="font-bold text-slate-900">{val === true ? <Check size={14} className="text-green-500"/> : val}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'branding':
        return (
          <div className="space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-slate-900 uppercase">Branding Kit Combo</h3>
              <p className="text-slate-500 text-sm">Giải pháp đồng bộ thương hiệu tiết kiệm hơn</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {BRANDING_PACKAGES.map((kit) => (
                <div key={kit.id} className={`relative flex flex-col p-6 rounded-[2rem] border-2 transition-all ${kit.popular ? 'border-indigo-500 bg-indigo-50/50 scale-105 shadow-xl z-10' : 'border-slate-100 bg-white hover:border-indigo-200'}`}>
                  {kit.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">Khuyên dùng</div>}
                  <div className="text-center mb-6 space-y-2">
                    <h4 className="text-xl font-black text-slate-900">{kit.name}</h4>
                    <p className="text-3xl font-black text-indigo-600 tracking-tight">{kit.price}</p>
                    <p className="text-xs text-slate-500 font-medium">{kit.desc}</p>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {kit.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <Check size={16} className={`mt-0.5 shrink-0 ${f.highlight ? 'text-indigo-600' : 'text-slate-400'}`} strokeWidth={3} />
                        <span className={f.highlight ? 'font-bold' : 'font-medium'}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/design-brief?service=branding&package=${kit.id}`} className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest text-center transition-all ${kit.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                    Chọn gói này
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-slate-900 uppercase">Social Media</h3>
              <p className="text-slate-500 text-sm">Hình ảnh quảng cáo & Truyền thông online</p>
            </div>
            <div className="grid gap-4">
              {SOCIAL_SERVICES.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-purple-200 hover:shadow-md transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-50 p-3 rounded-xl text-purple-600 group-hover:scale-110 transition-transform"><Monitor size={20} /></div>
                    <div>
                      <h4 className="font-black text-slate-900 text-lg">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 text-right">
                    <span className="block font-black text-purple-600 text-lg">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 text-center">
               <p className="text-sm font-bold text-purple-800 mb-2">Cần chăm sóc Fanpage trọn gói?</p>
               <p className="text-xs text-purple-600 mb-4">Hudesign có các gói content + thiết kế theo tháng. Liên hệ để nhận báo giá chi tiết.</p>
               <a href="https://zalo.me/0912412132" target="_blank" className="inline-block bg-purple-600 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-purple-700 transition-all">Liên hệ Zalo</a>
            </div>
          </div>
        );

      case 'print':
        return (
          <div className="space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-slate-900 uppercase">Ấn phẩm in ấn</h3>
              <p className="text-slate-500 text-sm">Thiết kế chuẩn in, hỗ trợ xuất file chất lượng cao</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {PRINT_SERVICES.map((item, i) => (
                <div key={i} className="p-5 bg-white border border-slate-100 rounded-2xl hover:border-orange-200 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-black text-slate-900">{item.title}</h4>
                    <Printer size={16} className="text-orange-400" />
                  </div>
                  <p className="text-orange-600 font-black text-lg mb-1">{item.price}</p>
                  <p className="text-xs text-slate-400 italic">{item.note}</p>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-3 bg-orange-50 p-4 rounded-xl border border-orange-100 text-xs text-orange-800">
               <AlertCircle size={16} className="shrink-0 mt-0.5" />
               <p>Giá trên là chi phí thiết kế, chưa bao gồm phí in ấn. Hudesign sẽ bàn giao file gốc (AI/PDF) để bạn có thể in tại bất kỳ nhà in nào.</p>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tight">
            Bảng giá <span className="text-indigo-600">Dịch vụ</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">
            Chọn nhóm dịch vụ bạn quan tâm để xem chi tiết báo giá.
          </p>
        </div>

        {/* MAIN CATEGORY GRID - NO IMAGES, SOLID BACKGROUND */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {MAIN_CATEGORIES.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="group relative h-72 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Background Color Only */}
              <div className={`absolute inset-0 transition-all duration-500 ${cat.bg} group-hover:brightness-110`}></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center text-white space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">{cat.title}</h2>
                  <p className="text-sm font-medium opacity-80">{cat.subtitle}</p>
                </div>
                <div className="pt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                    Xem giá <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WORKFLOW WITH ICONS & ARROWS */}
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-lg text-center space-y-10">
           <h3 className="text-xl font-black text-slate-900 uppercase flex items-center justify-center gap-2">
              <HelpCircle size={24} className="text-indigo-600" />
              Quy trình làm việc
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 text-center relative">
              {[
                { icon: <MessageSquare size={24} />, text: 'Tư vấn & Báo giá' },
                { icon: <CreditCard size={24} />, text: 'Đặt cọc 50%' },
                { icon: <PenTool size={24} />, text: 'Triển khai Demo' },
                { icon: <CheckCircle2 size={24} />, text: 'Chỉnh sửa & Bàn giao' },
              ].map((item, i, arr) => (
                <div key={i} className="flex flex-col items-center relative group">
                   <div className="w-14 h-14 rounded-2xl bg-slate-50 text-indigo-600 flex items-center justify-center border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm z-10">
                      {item.icon}
                   </div>
                   <p className="text-xs font-black text-slate-700 uppercase tracking-tight mt-3">{item.text}</p>
                   
                   {/* ARROW LOGIC */}
                   {i < arr.length - 1 && (
                     <>
                       {/* Desktop Arrow (Right) */}
                       <div className="hidden md:block absolute top-7 -right-1/2 translate-x-1/2 -translate-y-1/2 text-slate-200 z-0">
                         <ArrowRight size={24} strokeWidth={3} />
                       </div>
                       
                       {/* Mobile Arrow (Down) */}
                       <div className="md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-slate-200 z-0">
                         <ArrowDown size={20} strokeWidth={3} />
                       </div>
                     </>
                   )}
                </div>
              ))}
           </div>
           
           {/* MỤC LƯU Ý - ĐÃ CẬP NHẬT STYLE */}
           <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-center gap-2 text-red-600 mb-3">
                 <AlertCircle size={14} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Lưu ý quan trọng</span>
              </div>
              <ul className="text-[10px] md:text-[11px] text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto space-y-1 text-left list-disc pl-5 italic">
                <li>Bảng giá áp dụng cho phạm vi công việc đã nêu; các yêu cầu ngoài phạm vi sẽ được báo phí trước khi thực hiện.</li>
                <li>Giá chưa bao gồm chi phí in ấn, tài nguyên trả phí và bản quyền hình ảnh/font (nếu có).</li>
                <li>Số lần chỉnh sửa theo gói đã chọn; chỉnh sửa ngoài phạm vi hoặc đổi ý tưởng sau khi duyệt concept sẽ tính thêm phí.</li>
                <li>Thời gian hoàn thành có thể thay đổi nếu nội dung cung cấp chậm hoặc chỉnh sửa nhiều lần.</li>
                <li>Designer không chịu trách nhiệm với lỗi từ nội dung khách cung cấp.</li>
                <li>File bàn giao theo thỏa thuận; file gốc chỉ bao gồm nếu có ghi rõ trong báo giá.</li>
                <li>Sản phẩm chỉ sử dụng cho mục đích đã thống nhất. Bàn giao đầy đủ sau khi hoàn tất thanh toán.</li>
              </ul>
           </div>
        </div>

        {/* CTA BOTTOM */}
        <div className="mt-16 text-center">
           <Link to="/design-brief" className="inline-flex items-center space-x-2 bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95">
              <span>Gửi yêu cầu thiết kế ngay</span>
              <ArrowRight size={18} />
           </Link>
        </div>

      </div>

      {/* MODAL POPUP */}
      {selectedCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl p-6 md:p-10 no-scrollbar">
            <button onClick={closeModal} className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10">
              <X size={20} />
            </button>
            {renderModalContent()}
            <div className="mt-10 pt-6 border-t border-slate-100 text-center">
               <Link to={`/design-brief?service=${selectedCategory}`} className="inline-block w-full md:w-auto px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-indigo-600 transition-colors">
                 Đặt dịch vụ này
               </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PricingPage;
