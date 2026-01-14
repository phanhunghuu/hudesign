
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { 
  ArrowLeft, Send, User, Phone, Briefcase, Palette, 
  FileText, Image as ImageIcon, CheckCircle, Loader2, 
  X, Plus, Sparkles, Layout, PenTool, Type, HelpCircle, Layers,
  Wand2, Users2, Baby, Monitor, MapPin, Package, Printer, 
  Maximize, Minimize, Calendar, Info, Edit3, Heart, Shield, Star, 
  MessageSquare, UserPlus, Zap, Clock, Flag, Facebook, Instagram, 
  Smartphone, Hash, ListChecks, Shapes, FilePlus2, Target,
  Copy, FileType, Scissors, Droplets, StickyNote, CreditCard
} from 'lucide-react';

// === THÔNG TIN TELEGRAM ===
const TELEGRAM_BOT_TOKEN = "7496763782:AAFOYZzRsBNgCLpdDlJWXMUBwmKwtzCXQBI"; 
const TELEGRAM_CHAT_ID = "308222651"; 

// 1. Các loại logo
const LOGO_TYPES = [
  { id: 'wordmark', title: 'Logo chữ (wordmark)', img: 'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767767179/loailogo_2_ytqdfx.png' },
  { id: 'combination', title: 'Chữ + biểu tượng', img: 'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767767176/loailogo_1_hv9wq3.png' },
  { id: 'icon', title: 'Chỉ biểu tượng', img: 'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767767181/loailogo_3_xgulot.png' }
];

// 2. Các phong cách thiết kế
const STYLE_OPTIONS = [
  { id: 'luxury', title: 'Sang trọng / Tinh tế', img: 'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767762496/cacloailogo_1_npvnuh.png' },
  { id: 'modern', title: 'Trẻ trung / Hiện đại', img: 'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767762490/cacloailogo_2_bakimv.png' },
  { id: 'active', title: 'Màu sắc / Năng động', img: 'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767762491/cacloailogo_3_h1dftv.png' },
  { id: 'mystic', title: 'Mạnh mẽ / Cá tính', img: 'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767762490/cacloailogo_4_myqpdw.png' },
  { id: 'premium', title: 'Tối giản / Cao cấp', img: 'https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767762494/cacloailogo_5_umpqhz.png' }
];

const GENDER_OPTIONS = ['Nam', 'Nữ', 'Cả hai'];
const AGE_OPTIONS = ['Trẻ em', 'Gen Z (18-24)', 'Millennials (25-34)', 'Trung niên (35-50)', 'Tất cả'];

const USAGE_OPTIONS = [
  { id: 'online', title: 'Dùng online (Fanpage / Website)', icon: <Monitor size={14} /> },
  { id: 'signage', title: 'Bảng hiệu', icon: <MapPin size={14} /> },
  { id: 'packaging', title: 'Nhãn sản phẩm, Bao bì', icon: <Package size={14} /> },
  { id: 'print', title: 'Các ấn phẩm in ấn', icon: <Printer size={14} /> }
];

const VERSION_OPTIONS = ['Ngang', 'Dọc', 'Icon', 'Trắng/đen'];

const SERVICE_TYPES = [
  { id: 'logo', title: 'Thiết kế Logo', icon: <PenTool size={24} />, desc: 'Tạo bộ nhận diện cốt lõi' },
  { id: 'branding', title: 'Branding Kit', icon: <Layout size={24} />, desc: 'Bộ nhận diện thương hiệu' },
  { id: 'social', title: 'Social Media', icon: <Sparkles size={24} />, desc: 'Banner FB, Insta, TikTok' },
  { id: 'print', title: 'Ấn phẩm in ấn', icon: <FileText size={24} />, desc: 'Menu, Flyer, Standee' }
];

// Dữ liệu Branding Kit chuyên sâu
const BRANDING_GOALS = ['Bán hàng tốt hơn', 'Nhận diện chuyên nghiệp', 'Đồng bộ hình ảnh', 'Mở rộng thương hiệu'];
const BRAND_STAGES = ['Mới bắt đầu', 'Đã bán nhưng chưa đồng bộ', 'Đang Rebrand'];
const BRAND_FEELS = ['Sang trọng', 'Tinh tế', 'Trẻ trung', 'Cá tính', 'Bí ẩn', 'Tối giản', 'Gần gũi'];
const BRAND_PERSONAS = ['Lịch lãm', 'Năng động', 'Nghệ sĩ', 'Doanh nhân', 'Thân thiện'];
const KIT_COMPONENTS = ['Logo guideline', 'Bảng màu', 'Font chữ chính-phụ', 'Pattern / Texture', 'Icon / Illustration', 'Mockup ứng dụng'];
const BRAND_VOICES = ['Cao cấp - Trang trọng', 'Gần gũi - Dễ hiểu', 'Truyền cảm hứng', 'Trẻ trung - Năng động'];
const ADDRESS_WAYS = ['Anh/Chị', 'Bạn', 'Khách hàng'];
const LONGEVITY_OPTIONS = ['1–2 năm', '3–5 năm'];

// Dữ liệu Social Media chuyên sâu
const SOCIAL_PLATFORMS = ['Facebook', 'Instagram', 'TikTok', 'Shopee', 'Zalo', 'Website', 'Khác'];
const SOCIAL_SIZES = [
  { id: '1:1', title: 'Vuông (1:1)', desc: 'Post FB/IG' },
  { id: '4:5', title: 'Dọc (4:5)', desc: 'Post FB/IG chuẩn' },
  { id: '9:16', title: 'Story (9:16)', desc: 'Reels / TikTok' },
  { id: '16:9', title: 'Ngang (16:9)', desc: 'Cover / Banner' }
];
const SOCIAL_GOALS = ['Bán hàng / Chốt đơn', 'Thông báo chương trình', 'Tăng tương tác / Viral', 'Xây dựng thương hiệu'];
const MANDATORY_INFO = ['Logo', 'Giá sản phẩm', 'Ưu đãi / Khuyến mãi', 'Số điện thoại', 'Địa chỉ / Website', 'Câu kêu gọi (CTA)'];

// Dữ liệu In ấn chuyên sâu
const PRINT_TYPES = ['Menu', 'Name card', 'Flyer (Tờ rơi)', 'Poster', 'Brochure', 'Tem nhãn', 'Bao bì', 'Khác'];
const PRINT_SIDES = ['In 1 mặt', 'In 2 mặt'];
const PRINT_COLORS = ['Hệ màu CMYK (Đa sắc)', 'In 1 màu (Pantone)', 'In trắng đen'];
const PRINT_FINISHING = ['Cán mờ', 'Cán bóng', 'Ép kim', 'Dập nổi / chìm', 'UV định hình', 'Không gia công'];

const DesignBriefPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    service: 'logo',
    projectName: '',
    industry: '',
    description: '',
    slogan: '',
    colors: '',
    logoType: '', 
    style: '',
    targetGender: 'Cả hai',
    targetAge: 'Tất cả',
    usage: [] as string[],
    versions: [] as string[],
    deadline: '',
    notes: '',
    // Branding specific
    brandingGoals: [] as string[],
    brandStage: 'Mới bắt đầu',
    brandFeels: [] as string[],
    brandPersona: '',
    kitComponents: [] as string[],
    brandVoice: '',
    addressWay: '',
    longevity: '3–5 năm',
    expandProducts: 'Không',
    // Social specific
    socialPlatforms: [] as string[],
    socialSizes: [] as string[],
    postQuantity: '1',
    socialGoal: '',
    mandatoryInfo: [] as string[],
    mainContent: '',
    // Print specific
    printType: '',
    customPrintType: '',
    printSize: '',
    printSides: 'In 1 mặt',
    printIsFolded: 'Không gấp',
    printColors: 'Hệ màu CMYK (Đa sắc)',
    printMaterial: '',
    printFinishing: [] as string[],
    printQuantity: '',
    printUnit: ''
  });

  const [refImages, setRefImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service');
    if (serviceParam && SERVICE_TYPES.some(s => s.id === serviceParam)) {
      setFormData(prev => ({ ...prev, service: serviceParam }));
    }
  }, [location]);

  const toggleList = (field: keyof typeof formData, value: string) => {
    setFormData(prev => {
      const currentList = prev[field] as string[];
      return {
        ...prev,
        [field]: currentList.includes(value) 
          ? currentList.filter(u => u !== value) 
          : [...currentList, value]
      };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files) as File[];
      setRefImages(prev => [...prev, ...filesArray]);
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setRefImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const generateAiIdea = async () => {
    if (!formData.projectName || !formData.industry) {
      alert("Vui lòng nhập Tên dự án và Ngành nghề để Hủ gợi ý tốt nhất nhé!");
      return;
    }

    setAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Bạn là một chuyên gia tư vấn sáng tạo tại Hudesign Academy. Khách hàng đang cần ý tưởng cho dịch vụ ${SERVICE_TYPES.find(s => s.id === formData.service)?.title} cho:
      - Tên dự án: ${formData.projectName}
      - Ngành nghề: ${formData.industry}
      - Đối tượng mục tiêu: ${formData.targetGender}, độ tuổi ${formData.targetAge}
      ${formData.service === 'print' ? `- Loại ấn phẩm: ${formData.printType}` : ''}
      
      Hãy viết một đoạn mô tả ngắn gọn (khoảng 3-4 dòng) về một hướng thiết kế hình ảnh độc đáo, thu hút và phù hợp với khách hàng mục tiêu trên. Trả lời trực tiếp nội dung bằng tiếng Việt.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      const text = response.text;
      if (text) {
        setFormData(prev => ({ ...prev, description: text }));
      }
    } catch (error) {
      console.error("AI Error:", error);
      alert("Hệ thống AI đang bận, bạn vui lòng tự mô tả nhé!");
    } finally {
      setAiLoading(false);
    }
  };

  const sendToTelegram = async () => {
    setLoading(true);
    
    let extraDetails = '';
    if (formData.service === 'branding') {
      extraDetails = `
💎 *CHI TIẾT BRANDING KIT:*
🎯 *Mục tiêu:* ${formData.brandingGoals.join(', ')}
📊 *Giai đoạn:* ${formData.brandStage}
🎭 *Tính cách:* ${formData.brandPersona}
🌈 *Cảm xúc:* ${formData.brandFeels.join(', ')}
📦 *Thành phần Kit:* ${formData.kitComponents.join(', ')}
🗣️ *Giọng nói:* ${formData.brandVoice}
🤝 *Xưng hô:* ${formData.addressWay}
⏳ *Tầm nhìn:* ${formData.longevity}
🚀 *Mở rộng:* ${formData.expandProducts}
      `;
    } else if (formData.service === 'social') {
      extraDetails = `
📱 *CHI TIẾT SOCIAL MEDIA:*
🌐 *Nền tảng:* ${formData.socialPlatforms.join(', ')}
📏 *Kích thước:* ${formData.socialSizes.join(', ')}
🔢 *Số lượng:* ${formData.postQuantity} post
🎯 *Mục tiêu:* ${formData.socialGoal}
📌 *Thông tin bắt buộc:* ${formData.mandatoryInfo.join(', ')}
✍️ *Nội dung chính:* ${formData.mainContent || 'Theo mô tả chung'}
      `;
    } else if (formData.service === 'print') {
      extraDetails = `
🖨️ *CHI TIẾT IN ẤN:*
📄 *Loại:* ${formData.printType === 'Khác' ? formData.customPrintType : formData.printType}
📐 *Kích thước:* ${formData.printSize}
🔄 *Mặt in:* ${formData.printSides} | *Gấp:* ${formData.printIsFolded}
🎨 *Màu sắc:* ${formData.printColors}
📜 *Chất liệu:* ${formData.printMaterial || 'Designer tư vấn'}
✨ *Gia công:* ${formData.printFinishing.join(', ')}
🔢 *Số lượng in:* ${formData.printQuantity || 'Chưa rõ'}
🏭 *Đơn vị in:* ${formData.printUnit || 'Để designer tư vấn'}
      `;
    }

    const textMsg = `
🎨 *YÊU CẦU THIẾT KẾ MỚI (DESIGN BRIEF)*

👤 *Khách hàng:* ${formData.name}
📞 *Liên hệ:* ${formData.contact}
📦 *Dịch vụ:* ${SERVICE_TYPES.find(s => s.id === formData.service)?.title}

🏷️ *Tên dự án:* ${formData.projectName}
🏢 *Ngành nghề:* ${formData.industry}
👥 *Đối tượng:* ${formData.targetGender} | Nhóm tuổi: ${formData.targetAge}
✍️ *Slogan/Text:* ${formData.slogan || 'Không có'}
🎨 *Màu sắc yêu thích:* ${formData.colors || 'Tùy designer'}
${extraDetails}
🌟 *Phong cách:* ${formData.style || 'N/A'}

⏰ *Deadline:* ${formData.deadline || '...'} ngày

📝 *Mô tả chi tiết:* 
_${formData.description}_

🗒️ *Ghi chú thêm:* 
_${formData.notes || 'Không có'}_

---
🖼️ *Đang gửi ${refImages.length} ảnh mẫu bên dưới...*
    `;

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: textMsg,
          parse_mode: 'Markdown'
        })
      });

      for (const file of refImages) {
        const photoData = new FormData();
        photoData.append('chat_id', TELEGRAM_CHAT_ID);
        photoData.append('photo', file);
        photoData.append('caption', `Ảnh mẫu từ: ${formData.name}`);
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
          method: 'POST',
          body: photoData
        });
      }

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Lỗi gửi Telegram:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại hoặc gửi trực tiếp qua Zalo!");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (success) {
      setSuccess(false);
      setStep(1);
    } else if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  };

  const selectedService = SERVICE_TYPES.find(s => s.id === formData.service);
  const labelClass = "text-[11px] md:text-xs font-black text-slate-700 uppercase tracking-widest ml-1 mb-2 block";

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8 gap-4">
          <button onClick={handleBack} className="inline-flex items-center space-x-2 text-indigo-600 font-black text-xs md:text-sm hover:-translate-x-1 transition-transform uppercase outline-none shrink-0">
            <ArrowLeft size={16} />
            <span className="hidden xs:inline">{success ? "VỀ TRANG CHỦ" : (step > 1 ? `LẠI BƯỚC ${step - 1}` : "TRANG CHỦ")}</span>
            <span className="xs:hidden">QUAY LẠI</span>
          </button>
          {!success && step > 1 && selectedService && (
            <div className="animate-in fade-in slide-in-from-right-2 flex-grow flex justify-end">
              <div className="flex items-center space-x-2 md:space-x-3 bg-indigo-50 border border-indigo-100 px-3 py-1.5 md:px-4 md:py-2 rounded-2xl shadow-sm">
                <div className="w-6 h-6 md:w-7 md:h-7 bg-indigo-600 text-white rounded-lg md:rounded-xl flex items-center justify-center shrink-0 shadow-md">
                  {React.cloneElement(selectedService.icon as React.ReactElement<any>, { size: 12 })}
                </div>
                <div className="pr-2 border-r border-indigo-200">
                  <p className="text-[10px] md:text-[11px] font-black text-slate-900 uppercase tracking-tight whitespace-nowrap">{selectedService.title}</p>
                </div>
                <button onClick={() => setStep(1)} className="text-indigo-600 hover:text-indigo-800 transition-colors p-1 rounded-lg hover:bg-white/50 outline-none flex items-center gap-1">
                  <Edit3 size={12} />
                  <span className="hidden sm:inline text-[10px] font-black uppercase">Đổi</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 relative">
          {success ? (
            <div className="p-16 text-center space-y-8 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner"><CheckCircle size={48} className="text-green-600" /></div>
              <div className="space-y-3">
                <h2 className="text-3xl font-black text-slate-900">YÊU CẦU ĐÃ ĐƯỢC GỬI!</h2>
                <p className="text-slate-500 font-thin">Hủ đã nhận được Brief của bạn. Mình sẽ nghiên cứu và liên hệ lại ngay nhé!</p>
              </div>
              <button onClick={() => { setSuccess(false); setStep(1); }} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all">Gửi thêm yêu cầu khác</button>
            </div>
          ) : (
            <>
              <div className="h-2 bg-slate-100 flex"><div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }}></div></div>
              <div className="p-8 md:p-16">
                
                {step === 1 && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
                    <div className="space-y-2 text-center md:text-left">
                      <h2 className="text-3xl font-black text-slate-900 uppercase">1. Thông tin cơ bản</h2>
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-slate-500 font-thin">Bạn cần thiết kế sản phẩm gì?</p>
                        <Link to="/pricing" className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full border border-indigo-100 text-xs font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                          <CreditCard size={14} />
                          <span>Tham khảo bảng giá</span>
                        </Link>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {SERVICE_TYPES.map(s => (
                        <button key={s.id} onClick={() => setFormData({...formData, service: s.id})} className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center text-center space-y-4 ${formData.service === s.id ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 hover:border-slate-200 text-slate-400'}`}>
                          <div className={`p-4 rounded-2xl ${formData.service === s.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'}`}>{s.icon}</div>
                          <div><p className="font-black text-[10px] uppercase mb-1">{s.title}</p><p className="text-[8px] font-thin opacity-60 leading-tight">{s.desc}</p></div>
                        </button>
                      ))}
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className={labelClass}>Họ tên của bạn *</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="Nguyễn Văn A" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className={labelClass}>Số điện thoại / Zalo *</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input required value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} type="tel" placeholder="09xxx..." className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                        </div>
                      </div>
                    </div>
                    <div className="pt-4">
                      <button onClick={() => setStep(2)} disabled={!formData.name || !formData.contact} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-30">Tiếp theo: Chi tiết dự án</button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
                    <div className="space-y-2 text-center md:text-left">
                      <h2 className="text-3xl font-black text-slate-900 uppercase">2. Chi tiết dự án</h2>
                      <p className="text-slate-500 font-thin">Hãy kể cho Hủ nghe về dự án của bạn nhé.</p>
                    </div>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className={labelClass}>Tên thương hiệu / Dự án *</label>
                          <input required value={formData.projectName} onChange={e => setFormData({...formData, projectName: e.target.value})} type="text" placeholder="VD: Bánh ướt Cây Me" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Ngành nghề kinh doanh *</label>
                          <input required value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} type="text" placeholder="VD: Ẩm thực, F&B" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                        </div>
                      </div>

                      {/* IN ẤN: LOẠI ẤN PHẨM & KÍCH THƯỚC */}
                      {formData.service === 'print' && (
                        <div className="space-y-8 p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100">
                          <div className="space-y-4">
                            <label className={labelClass + " flex items-center gap-2"}><FileType size={14} className="text-indigo-600" /> Loại ấn phẩm cần thiết kế</label>
                            <div className="flex flex-wrap gap-2">
                              {PRINT_TYPES.map(type => (
                                <button key={type} type="button" onClick={() => setFormData({...formData, printType: type})} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${formData.printType === type ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}>{type}</button>
                              ))}
                            </div>
                            {formData.printType === 'Khác' && (
                              <input value={formData.customPrintType} onChange={e => setFormData({...formData, customPrintType: e.target.value})} type="text" placeholder="Nhập loại ấn phẩm của bạn..." className="w-full mt-2 px-6 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm outline-none" />
                            )}
                          </div>
                          <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                              <label className={labelClass}><Maximize size={14} className="inline mr-1" /> Kích thước (cm/px)</label>
                              <input value={formData.printSize} onChange={e => setFormData({...formData, printSize: e.target.value})} type="text" placeholder="VD: A5 (14.8 x 21cm)" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm outline-none" />
                            </div>
                            <div className="space-y-2">
                              <label className={labelClass}><Copy size={14} className="inline mr-1" /> Hình thức in</label>
                              <div className="flex gap-2">
                                {PRINT_SIDES.map(side => (
                                  <button key={side} type="button" onClick={() => setFormData({...formData, printSides: side})} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all border-2 ${formData.printSides === side ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-400'}`}>{side}</button>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className={labelClass}><Scissors size={14} className="inline mr-1" /> Quy cách gấp</label>
                              <div className="flex gap-2">
                                {['Không gấp', 'Gấp đôi', 'Gấp 3'].map(fold => (
                                  <button key={fold} type="button" onClick={() => setFormData({...formData, printIsFolded: fold})} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all border-2 ${formData.printIsFolded === fold ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-400'}`}>{fold}</button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SOCIAL MEDIA: NỀN TẢNG & KÍCH THƯỚC */}
                      {formData.service === 'social' && (
                        <div className="space-y-8 p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100">
                          <div className="space-y-4">
                            <label className={labelClass + " flex items-center gap-2"}><Smartphone size={14} className="text-indigo-600" /> Nền tảng đăng bài</label>
                            <div className="flex flex-wrap gap-2">
                              {SOCIAL_PLATFORMS.map(platform => (
                                <button key={platform} type="button" onClick={() => toggleList('socialPlatforms', platform)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${formData.socialPlatforms.includes(platform) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}>{platform}</button>
                              ))}
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <label className={labelClass + " flex items-center gap-2"}><Shapes size={14} className="text-indigo-600" /> Kích thước mong muốn</label>
                              <div className="grid grid-cols-2 gap-2">
                                {SOCIAL_SIZES.map(size => (
                                  <button key={size.id} type="button" onClick={() => toggleList('socialSizes', size.title)} className={`p-3 rounded-xl text-[10px] font-bold transition-all border-2 text-left ${formData.socialSizes.includes(size.title) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-400'}`}>
                                    <p className="font-black uppercase">{size.title}</p>
                                    <p className="text-[8px] opacity-60">{size.desc}</p>
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-4">
                              <label className={labelClass + " flex items-center gap-2"}><FilePlus2 size={14} className="text-indigo-600" /> Số lượng thiết kế (Post)</label>
                              <div className="relative max-w-[120px]">
                                <input type="number" min="1" value={formData.postQuantity} onChange={e => setFormData({...formData, postQuantity: e.target.value})} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm outline-none" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-black">POST</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <label className={labelClass + " flex items-center gap-2"}><Users2 size={14} className="text-indigo-600" /> Giới tính mục tiêu</label>
                          <div className="flex flex-wrap gap-2">
                            {GENDER_OPTIONS.map(g => (
                              <button key={g} type="button" onClick={() => setFormData({...formData, targetGender: g})} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${formData.targetGender === g ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200'}`}>{g}</button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className={labelClass + " flex items-center gap-2"}><Baby size={14} className="text-indigo-600" /> Nhóm tuổi khách hàng</label>
                          <div className="flex flex-wrap gap-2">
                            {AGE_OPTIONS.map(age => (
                              <button key={age} type="button" onClick={() => setFormData({...formData, targetAge: age})} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${formData.targetAge === age ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200'}`}>{age}</button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={labelClass}>Slogan / Câu chữ chính trên thiết kế</label>
                        <input value={formData.slogan} onChange={e => setFormData({...formData, slogan: e.target.value})} type="text" placeholder="VD: Hương vị truyền thống từ 1990" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className={labelClass.replace('mb-2', 'mb-0')}>Mô tả mong muốn của bạn *</label>
                          <button type="button" onClick={generateAiIdea} disabled={aiLoading} className="flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50">
                            {aiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                            <span>{aiLoading ? "Đang suy nghĩ..." : `Nhờ AI gợi ý ý tưởng ${formData.service}`}</span>
                          </button>
                        </div>
                        <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Hãy mô tả ý tưởng hoặc những gì bạn muốn thể hiện..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none resize-none"></textarea>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => setStep(1)} className="w-1/3 bg-slate-100 text-slate-400 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">Quay lại</button>
                      <button onClick={() => setStep(3)} disabled={!formData.projectName || !formData.industry || !formData.description} className="w-2/3 bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-30">Tiếp theo: Đặc tính</button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-right-4">
                    <div className="space-y-2 text-center md:text-left">
                      <h2 className="text-3xl font-black text-slate-900 uppercase">3. Đặc tính kỹ thuật</h2>
                      <p className="text-slate-500 font-thin">Giúp Hủ hình dung ra cái "gu" và các thông số cần thiết.</p>
                    </div>

                    <div className="space-y-14">
                      {/* IN ẤN: MÀU SẮC & GIA CÔNG */}
                      {formData.service === 'print' && (
                        <div className="space-y-10 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <label className={labelClass + " flex items-center gap-2"}><Droplets size={14} className="text-indigo-600" /> Hệ màu sắc in ấn</label>
                              <div className="flex flex-wrap gap-2">
                                {PRINT_COLORS.map(color => (
                                  <button key={color} type="button" onClick={() => setFormData({...formData, printColors: color})} className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all border-2 ${formData.printColors === color ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}>{color}</button>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-4">
                              <label className={labelClass + " flex items-center gap-2"}><Star size={14} className="text-indigo-600" /> Kỹ thuật gia công sau in</label>
                              <div className="flex flex-wrap gap-2">
                                {PRINT_FINISHING.map(finish => (
                                  <button key={finish} type="button" onClick={() => toggleList('printFinishing', finish)} className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all border-2 ${formData.printFinishing.includes(finish) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}>{finish}</button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                              <label className={labelClass}><StickyNote size={14} className="inline mr-1" /> Chất liệu giấy (Nếu biết)</label>
                              <input value={formData.printMaterial} onChange={e => setFormData({...formData, printMaterial: e.target.value})} type="text" placeholder="VD: Giấy Couche 300gsm, Kraft..." className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm outline-none" />
                            </div>
                            <div className="space-y-2">
                              <label className={labelClass}><Hash size={14} className="inline mr-1" /> Số lượng in dự kiến</label>
                              <input value={formData.printQuantity} onChange={e => setFormData({...formData, printQuantity: e.target.value})} type="text" placeholder="VD: 5 hộp, 1000 tờ..." className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm outline-none" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}><Briefcase size={14} className="inline mr-1" /> Đơn vị in ấn (Nếu đã chọn)</label>
                            <input value={formData.printUnit} onChange={e => setFormData({...formData, printUnit: e.target.value})} type="text" placeholder="Tên nhà in hoặc để Hủ tư vấn đơn vị uy tín..." className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm outline-none" />
                          </div>
                        </div>
                      )}

                      {/* BRANDING KIT: TÍNH CÁCH & GIỌNG NÓI */}
                      {formData.service === 'branding' && (
                        <div className="space-y-10 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                          <div className="space-y-4">
                            <label className={labelClass + " flex items-center gap-2"}><Heart size={14} className="text-indigo-600" /> Thương hiệu muốn được cảm nhận là (Chọn tối đa 3)</label>
                            <div className="flex flex-wrap gap-2">
                              {BRAND_FEELS.map(feel => (
                                <button key={feel} type="button" onClick={() => toggleList('brandFeels', feel)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${formData.brandFeels.includes(feel) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}>{feel}</button>
                              ))}
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <label className={labelClass + " flex items-center gap-2"}><UserPlus size={14} className="text-indigo-600" /> Nếu thương hiệu là một con người</label>
                              <div className="flex flex-wrap gap-2">
                                {BRAND_PERSONAS.map(p => (
                                  <button key={p} type="button" onClick={() => setFormData({...formData, brandPersona: p})} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${formData.brandPersona === p ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}>{p}</button>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-4">
                              <label className={labelClass + " flex items-center gap-2"}><MessageSquare size={14} className="text-indigo-600" /> Giọng điệu truyền thông</label>
                              <div className="flex flex-wrap gap-2">
                                {BRAND_VOICES.map(v => (
                                  <button key={v} type="button" onClick={() => setFormData({...formData, brandVoice: v})} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${formData.brandVoice === v ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}>{v}</button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SOCIAL MEDIA & GENERAL MANDATORY INFO */}
                      <div className="space-y-4 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                        <label className={labelClass + " flex items-center gap-2"}><ListChecks size={14} className="text-indigo-600" /> Thông tin BẮT BUỘC xuất hiện trên bản thiết kế</label>
                        <div className="flex flex-wrap gap-2">
                          {MANDATORY_INFO.map(info => (
                            <button key={info} type="button" onClick={() => toggleList('mandatoryInfo', info)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${formData.mandatoryInfo.includes(info) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}>{info}</button>
                          ))}
                        </div>
                        {formData.service === 'social' && (
                          <div className="pt-4">
                             <label className={labelClass}>Nội dung chi tiết từng post (Nếu nhiều bài)</label>
                             <textarea rows={3} value={formData.mainContent} onChange={e => setFormData({...formData, mainContent: e.target.value})} placeholder="VD: Post 1: Ưu đãi 20%. Post 2: Giới thiệu menu mới..." className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm outline-none resize-none"></textarea>
                          </div>
                        )}
                      </div>

                      <div className="space-y-6">
                        <label className={labelClass + " block text-center md:text-left flex items-center gap-2"}><Palette size={14} className="text-indigo-600" /> PHONG CÁCH THIẾT KẾ MONG MUỐN</label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                          {STYLE_OPTIONS.map(style => {
                            const isSelected = formData.style === style.title;
                            return (
                              <button key={style.id} type="button" onClick={() => setFormData({...formData, style: style.title})} className={`relative flex flex-col items-center p-3 md:p-4 rounded-[2.5rem] border-2 transition-all ${isSelected ? 'border-indigo-600 bg-white shadow-xl scale-[1.05]' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                                <div className={`w-full aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-3 md:mb-4 border border-slate-50`}><img src={style.img} className="w-full h-full object-cover" alt={style.title} /></div>
                                <span className={`text-center font-black text-[9px] uppercase tracking-widest px-1 leading-tight transition-colors ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`}>{style.title}</span>
                                {isSelected && <div className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full p-1 shadow-md z-10 border-2 border-white"><CheckCircle size={16} /></div>}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={labelClass}>Màu sắc yêu thích / Chủ đạo</label>
                        <input value={formData.colors} onChange={e => setFormData({...formData, colors: e.target.value})} type="text" placeholder="VD: Xanh dương đậm và Vàng đồng" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                      </div>

                      <div className="space-y-4">
                        <label className={labelClass}>Tải lên ảnh mẫu / Ảnh sản phẩm / Logo gốc (Nếu có)</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                          {previews.map((src, i) => (
                            <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group border border-slate-100">
                              <img src={src} className="w-full h-full object-cover" alt="Preview" />
                              <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                            </div>
                          ))}
                          <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center space-y-2 text-slate-400 hover:border-indigo-400 hover:text-indigo-400 transition-all bg-slate-50"><Plus size={24} /><span className="text-[8px] font-black uppercase">Thêm file</span></button>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" multiple accept="image/*,application/pdf" />
                        <p className="text-[10px] text-slate-400 italic font-thin flex items-center gap-2"><ImageIcon size={12} /> Hủ khuyến khích bạn gửi file Logo định dạng Vector (AI, PDF) để in ấn sắc nét nhất.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 pt-8">
                      <button onClick={() => setStep(2)} className="w-1/4 bg-slate-100 text-slate-400 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">Quay lại</button>
                      <button onClick={() => setStep(4)} className="w-3/4 bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95">Tiếp theo: Cam kết & Gửi</button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
                    <div className="space-y-2 text-center md:text-left">
                      <h2 className="text-3xl font-black text-slate-900 uppercase">4. Cam kết & Gửi Brief</h2>
                      <p className="text-slate-500 font-thin">Bước cuối cùng để Hủ chốt lại các yêu cầu kỹ thuật.</p>
                    </div>

                    <div className="space-y-12">
                      <div className="grid md:grid-cols-2 gap-8 p-6 bg-slate-50 rounded-3xl">
                        <div className="space-y-4">
                           <label className={labelClass}><Calendar size={14} className="inline mr-1" /> {formData.service === 'print' ? 'Thời gian cần file in' : 'Thời gian mong muốn nhận demo'} (Ngày)</label>
                           <div className="relative max-w-[180px]">
                              <input type="number" min="1" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} placeholder="VD: 5" className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm outline-none pr-12" />
                              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-black text-[10px] uppercase">Ngày</span>
                           </div>
                        </div>
                        <div className="space-y-4">
                          <label className={labelClass}><Star size={14} className="inline mr-1" /> Quy định sửa đổi</label>
                          <div className="p-4 bg-white border border-slate-100 rounded-2xl">
                             <p className="text-[10px] text-slate-500 font-bold leading-relaxed">Hudesign hỗ trợ <strong className="text-indigo-600 uppercase">3 lần chỉnh sửa</strong> miễn phí dựa trên Brief này. Vui lòng kiểm tra kỹ mọi thông số!</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={labelClass}>Ghi chú thêm cho Designer (Nếu có)</label>
                        <textarea rows={3} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Bất cứ lưu ý nào khác dành cho Hủ..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none resize-none"></textarea>
                      </div>

                      <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
                        <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-amber-700 font-medium leading-relaxed">Sau khi nhận được Brief, Hủ sẽ chủ động liên hệ lại qua Zalo để xác nhận báo giá và quy trình thực hiện. Cảm ơn bạn đã tin tưởng!</p>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-8">
                      <button type="button" onClick={() => setStep(3)} className="w-1/4 bg-slate-100 text-slate-400 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">Quay lại</button>
                      <button type="button" disabled={loading} onClick={sendToTelegram} className="w-3/4 bg-indigo-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-600/20 flex items-center justify-center space-x-3">{loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}<span>{loading ? 'Đang gửi Brief...' : 'Gửi Brief cho Hudesign'}</span></button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignBriefPage;
