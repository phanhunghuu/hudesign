
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { 
  ArrowLeft, Send, User, Phone, Briefcase, Palette, 
  FileText, Image as ImageIcon, CheckCircle, Loader2, 
  X, Plus, Sparkles, Layout, PenTool, Type, HelpCircle, Layers,
  Wand2
} from 'lucide-react';

// === THÔNG TIN TELEGRAM ===
const TELEGRAM_BOT_TOKEN = "7496763782:AAFOYZzRsBNgCLpdDlJWXMUBwmKwtzCXQBI"; 
const TELEGRAM_CHAT_ID = "308222651"; 

/**
 * ============================================================
 * NƠI SỬA LINK ẢNH MINH HỌA
 * ============================================================
 */

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

const SERVICE_TYPES = [
  { id: 'logo', title: 'Thiết kế Logo', icon: <PenTool size={24} />, desc: 'Tạo bộ nhận diện cốt lõi' },
  { id: 'branding', title: 'Branding Kit', icon: <Layout size={24} />, desc: 'Bộ nhận diện thương hiệu' },
  { id: 'social', title: 'Social Media', icon: <Sparkles size={24} />, desc: 'Banner FB, Insta, TikTok' },
  { id: 'print', title: 'Ấn phẩm in ấn', icon: <FileText size={24} />, desc: 'Menu, Flyer, Standee' }
];

const DesignBriefPage: React.FC = () => {
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
    style: '' 
  });

  const [refImages, setRefImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      const prompt = `Bạn là một chuyên gia tư vấn thương hiệu tại Hudesign Academy. Khách hàng đang cần ý tưởng thiết kế logo cho:
      - Tên thương hiệu: ${formData.projectName}
      - Ngành nghề: ${formData.industry}
      
      Hãy viết một đoạn mô tả ngắn gọn (khoảng 3-4 dòng) về một ý tưởng thiết kế logo độc đáo, sáng tạo và phù hợp với ngành nghề này. Hãy trả lời trực tiếp nội dung mô tả bằng tiếng Việt, không cần lời chào hỏi.`;

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
    const textMsg = `
🎨 *YÊU CẦU THIẾT KẾ MỚI (DESIGN BRIEF)*

👤 *Khách hàng:* ${formData.name}
📞 *Liên hệ:* ${formData.contact}
📦 *Dịch vụ:* ${SERVICE_TYPES.find(s => s.id === formData.service)?.title}

🏷️ *Tên dự án:* ${formData.projectName}
🏢 *Ngành nghề:* ${formData.industry}
✍️ *Slogan/Text:* ${formData.slogan || 'Không có'}
🎨 *Màu sắc yêu thích:* ${formData.colors || 'Tùy designer'}

📐 *Loại Logo:* ${formData.logoType || 'Chưa chọn'}
🌟 *Phong cách:* ${formData.style || 'Chưa chọn'}

📝 *Mô tả chi tiết:* 
_${formData.description}_

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

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <Link to="/" className="inline-flex items-center space-x-2 text-indigo-600 font-black text-sm mb-8 hover:-translate-x-1 transition-transform">
          <ArrowLeft size={16} />
          <span>QUAY LẠI TRANG CHỦ</span>
        </Link>

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          {success ? (
            <div className="p-16 text-center space-y-8 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle size={48} className="text-green-600" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-black text-slate-900">YÊU CẦU ĐÃ ĐƯỢC GỬI!</h2>
                <p className="text-slate-500 font-thin">Hủ đã nhận được Brief của bạn. Mình sẽ nghiên cứu và liên hệ lại ngay nhé!</p>
              </div>
              <button onClick={() => setSuccess(false)} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all">
                Gửi thêm yêu cầu khác
              </button>
            </div>
          ) : (
            <>
              <div className="h-2 bg-slate-100 flex">
                <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
              </div>

              <div className="p-8 md:p-16">
                {step === 1 && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-right-4">
                    <div className="space-y-2 text-center md:text-left">
                      <h2 className="text-3xl font-black text-slate-900 uppercase">1. Thông tin cơ bản</h2>
                      <p className="text-slate-500 font-thin">Bạn cần thiết kế sản phẩm gì?</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {SERVICE_TYPES.map(s => (
                        <button 
                          key={s.id}
                          onClick={() => setFormData({...formData, service: s.id})}
                          className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center text-center space-y-4 ${formData.service === s.id ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 hover:border-slate-200 text-slate-400'}`}
                        >
                          <div className={`p-4 rounded-2xl ${formData.service === s.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                            {s.icon}
                          </div>
                          <div>
                            <p className="font-black text-[10px] uppercase mb-1">{s.title}</p>
                            <p className="text-[8px] font-thin opacity-60 leading-tight">{s.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Họ tên của bạn *</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="Nguyễn Văn A" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số điện thoại / Zalo *</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input required value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} type="tel" placeholder="09xxx..." className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button onClick={() => setStep(2)} disabled={!formData.name || !formData.contact} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-30">
                        Tiếp theo: Chi tiết dự án
                      </button>
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
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên thương hiệu / Dự án *</label>
                          <input required value={formData.projectName} onChange={e => setFormData({...formData, projectName: e.target.value})} type="text" placeholder="VD: Bánh ướt Cây Me" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ngành nghề kinh doanh *</label>
                          <input required value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} type="text" placeholder="VD: Ẩm thực, F&B" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Slogan / Câu chữ trên thiết kế</label>
                        <input value={formData.slogan} onChange={e => setFormData({...formData, slogan: e.target.value})} type="text" placeholder="VD: Hương vị truyền thống từ 1990" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mô tả mong muốn của bạn *</label>
                          <button 
                            type="button"
                            onClick={generateAiIdea}
                            disabled={aiLoading}
                            className="flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50"
                          >
                            {aiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                            <span>{aiLoading ? "Đang suy nghĩ..." : "Nhờ AI gợi ý ý tưởng logo"}</span>
                          </button>
                        </div>
                        <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Hãy mô tả ý tưởng hoặc những gì bạn muốn thể hiện..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none resize-none"></textarea>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setStep(1)} className="w-1/3 bg-slate-100 text-slate-400 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">Quay lại</button>
                      <button onClick={() => setStep(3)} disabled={!formData.projectName || !formData.industry || !formData.description} className="w-2/3 bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-30">Tiếp theo: Phong cách</button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-right-4">
                    <div className="space-y-2 text-center md:text-left">
                      <h2 className="text-3xl font-black text-slate-900 uppercase">3. Phong cách & Loại hình</h2>
                      <p className="text-slate-500 font-thin">Giúp Hủ hình dung ra cái "gu" mà bạn đang hướng tới.</p>
                    </div>

                    <div className="space-y-14">
                      {/* PHẦN CHỌN LOẠI LOGO */}
                      <div className="space-y-6">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block text-center md:text-left flex items-center gap-2">
                          <Layers size={14} className="text-indigo-600" /> LOẠI LOGO MONG MUỐN
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {LOGO_TYPES.map(type => (
                            <button 
                              key={type.id}
                              type="button"
                              onClick={() => setFormData({...formData, logoType: type.title})}
                              className={`relative flex flex-col items-center p-4 rounded-[2.5rem] border-2 transition-all ${
                                formData.logoType === type.title
                                ? 'border-indigo-600 bg-white shadow-xl scale-[1.02]' 
                                : 'border-slate-100 bg-white hover:border-slate-200'
                              }`}
                            >
                              <div className="w-full aspect-video rounded-[1.5rem] overflow-hidden mb-4">
                                <img src={type.img} className="w-full h-full object-cover" alt={type.title} />
                              </div>
                              <span className={`text-center font-black text-[10px] uppercase tracking-widest px-1 leading-tight ${
                                formData.logoType === type.title ? 'text-indigo-600' : 'text-slate-500'
                              }`}>
                                {type.title}
                              </span>
                              {formData.logoType === type.title && (
                                <div className="absolute top-3 right-3 bg-indigo-600 text-white rounded-full p-1 shadow-md">
                                  <CheckCircle size={16} />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* PHẦN CHỌN PHONG CÁCH - CHỌN 1 DUY NHẤT */}
                      <div className="space-y-6">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block text-center md:text-left flex items-center gap-2">
                          <Palette size={14} className="text-indigo-600" /> PHONG CÁCH THIẾT KẾ (CHỌN 1)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                          {STYLE_OPTIONS.map(style => {
                            const isSelected = formData.style === style.title;
                            return (
                              <button 
                                key={style.id}
                                type="button"
                                onClick={() => setFormData({...formData, style: style.title})}
                                className={`relative flex flex-col items-center p-3 md:p-4 rounded-[2.5rem] border-2 transition-all ${
                                  isSelected 
                                  ? 'border-indigo-600 bg-white shadow-xl scale-[1.05]' 
                                  : 'border-slate-100 bg-white hover:border-slate-200'
                                }`}
                              >
                                <div className={`w-full aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-3 md:mb-4 border border-slate-50 transition-all duration-500`}>
                                  <img src={style.img} className="w-full h-full object-cover" alt={style.title} />
                                </div>
                                <span className={`text-center font-black text-[9px] uppercase tracking-widest px-1 leading-tight transition-colors ${
                                  isSelected ? 'text-indigo-600' : 'text-slate-500'
                                }`}>
                                  {style.title}
                                </span>
                                {isSelected && (
                                  <div className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full p-1 shadow-md z-10 border-2 border-white">
                                    <CheckCircle size={16} />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Màu sắc yêu thích / Chủ đạo</label>
                        <input value={formData.colors} onChange={e => setFormData({...formData, colors: e.target.value})} type="text" placeholder="VD: Xanh dương đậm và Vàng đồng" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tải lên ảnh mẫu / Ảnh tham khảo (Nếu có)</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                          {previews.map((src, i) => (
                            <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group border border-slate-100">
                              <img src={src} className="w-full h-full object-cover" alt="Preview" />
                              <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                          <button 
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center space-y-2 text-slate-400 hover:border-indigo-400 hover:text-indigo-400 transition-all bg-slate-50"
                          >
                            <Plus size={24} />
                            <span className="text-[8px] font-black uppercase">Thêm ảnh</span>
                          </button>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" multiple accept="image/*" />
                        <p className="text-[10px] text-slate-400 italic font-thin flex items-center gap-2">
                          <ImageIcon size={12} />
                          Hủ khuyên bạn nên gửi ít nhất 2-3 ảnh mẫu để mình hiểu gu bạn nhất.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-8">
                      <button type="button" onClick={() => setStep(2)} className="w-1/4 bg-slate-100 text-slate-400 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">Quay lại</button>
                      <button 
                        type="button"
                        disabled={loading}
                        onClick={sendToTelegram}
                        className="w-3/4 bg-indigo-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-600/20 flex items-center justify-center space-x-3"
                      >
                        {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                        <span>{loading ? 'Đang gửi Brief...' : 'Gửi Brief cho Hudesign'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="mt-12 text-center text-slate-400 text-xs font-thin space-y-2">
          <p>Dữ liệu được bảo mật bởi Hudesign Academy.</p>
          <div className="flex items-center justify-center space-x-2 text-indigo-400 font-black uppercase tracking-widest">
            <CheckCircle size={14} />
            <span>Kèm 1-1 & Thực chiến 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignBriefPage;
