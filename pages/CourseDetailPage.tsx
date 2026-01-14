
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  ArrowLeft, CheckCircle, Clock, Sparkles, Send, Loader2, 
  BookOpen, RefreshCcw, MessageSquare, Flame, 
  Target, Package, Info, X, Phone, User
} from 'lucide-react';
import { COURSES } from '../constants';
import { AICustomPlan, Course } from '../types';

// === THÔNG TIN TELEGRAM CỦA BẠN (Dán mã bạn vừa lấy vào đây) ===
const TELEGRAM_BOT_TOKEN = "7496763782:AAFOYZzRsBNgCLpdDlJWXMUBwmKwtzCXQBI"; // Dán BOT_TOKEN vào đây
const TELEGRAM_CHAT_ID = "308222651"; // Dán CHAT_ID vào đây
// ===================================================

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  
  // AI Customizer State
  const [loading, setLoading] = useState(false);
  const [aiPlan, setAiPlan] = useState<AICustomPlan | null>(null);
  const [purpose, setPurpose] = useState('');
  const [products, setProducts] = useState('');
  const [intensity, setIntensity] = useState('standard');

  // Popup State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: '', phone: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    const found = COURSES.find(c => c.id === courseId);
    if (!found) {
      navigate('/courses');
      return;
    }
    setCourse(found);
  }, [courseId, navigate]);

  const generateAILearningPath = async () => {
    if (!purpose || !products || !course) return;
    
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const sessionCount = course.curriculum?.length || 5;
      
      const prompt = `Bạn là chuyên gia thiết kế tại Hudesign. 
      Học viên đang xem khóa học: "${course.title}".
      Yêu cầu cá nhân hóa:
      - Mục đích học: ${purpose}
      - Sản phẩm mong muốn: ${products}
      - Thời gian/Cường độ: ${intensity}

      NHIỆM VỤ:
      Dựa trên giáo trình gốc của khóa học này, hãy thiết kế lại nội dung cho ĐÚNG ${sessionCount} BUỔI HỌC (không được thiếu, không được thừa). 
      Nội dung từng buổi phải được điều chỉnh để tập trung 100% vào việc giúp học viên làm được sản phẩm: "${products}".
      Lưu ý: Bạn KHÔNG cần tính toán học phí cho yêu cầu này.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 0 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              estimatedSessions: { type: Type.INTEGER },
              reasoning: { type: Type.STRING },
              syllabus: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    session: { type: Type.STRING },
                    title: { type: Type.STRING },
                    topics: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["session", "title", "topics"]
                }
              }
            },
            required: ["estimatedSessions", "reasoning", "syllabus"]
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      setAiPlan(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPlan || !course) return;

    setIsSending(true);
    
    // Format nội dung gửi đi (Sử dụng Markdown để tin nhắn Telegram đẹp hơn)
    const syllabusText = aiPlan.syllabus.map(s => 
      `*${s.session}: ${s.title}*\n• ${s.topics.join('\n• ')}`
    ).join('\n\n');

    const message = `🚀 *YÊU CẦU TƯ VẤN LỘ TRÌNH AI*\n\n👤 *Khách hàng:* ${contactInfo.name}\n📞 *Số điện thoại:* ${contactInfo.phone}\n🎓 *Khóa học:* ${course.title}\n\n🎯 *Mục tiêu:* ${purpose}\n📦 *Sản phẩm:* ${products}\n⚡ *Cường độ:* ${intensity === 'fast' ? 'Cấp tốc' : 'Bình thường'}\n\n💡 *Lý do AI đề xuất:*\n_${aiPlan.reasoning}_\n\n📚 *LỘ TRÌNH CHI TIẾT:*\n${syllabusText}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      if (response.ok) {
        setSendSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSendSuccess(false);
        }, 3000);
      } else {
        alert("Có lỗi khi gửi tin nhắn. Vui lòng kiểm tra BOT_TOKEN và CHAT_ID.");
      }
    } catch (error) {
      console.error("Telegram error:", error);
    } finally {
      setIsSending(false);
    }
  };

  if (!course) return null;

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <Link to="/courses" className="inline-flex items-center space-x-2 text-slate-500 hover:text-indigo-600 font-bold text-sm mb-6 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại danh sách khóa học</span>
        </Link>

        {/* Hero Section - UPDATED LAYOUT */}
        <div className="space-y-8 md:space-y-12 mb-20 md:mb-24">
          
          {/* 1. Banner Image Top (2:1 Ratio) */}
          <div className="relative w-full aspect-[2/1] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100 border border-slate-100 group">
             <img 
               src={course.image} 
               alt={course.title} 
               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60"></div>

             {/* Tags overlay on banner */}
             <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col gap-3 items-start">
                <span className={`text-[10px] md:text-xs font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg backdrop-blur-md border border-white/20 ${course.type === 'ONLINE' ? 'bg-green-500/90 text-white' : 'bg-white/90 text-indigo-700'}`}>
                  {course.type}
                </span>
                {course.isHot && (
                  <span className="bg-red-600/90 text-white text-[10px] md:text-xs font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg backdrop-blur-md border border-white/20 flex items-center gap-1.5">
                    <Flame size={14} fill="currentColor" /> HOT
                  </span>
                )}
             </div>
          </div>

          {/* 2. Info Grid */}
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
            
            {/* Left Column: Title & Content */}
            <div className="lg:col-span-8 space-y-8">
               <div className="space-y-4">
                 <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
                  {course.title}
                 </h1>
                 <p className="text-slate-500 text-base md:text-xl font-medium leading-relaxed">
                  {course.content}
                 </p>
               </div>

               <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {course.perks.map((perk, i) => (
                  <div key={i} className="flex items-start space-x-3 group p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                    <div className="mt-0.5 bg-green-100 p-1.5 rounded-full shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                    <span className="text-sm font-bold text-slate-600 leading-snug">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Pricing & Action Card */}
            <div className="lg:col-span-4">
               <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6 sticky top-28">
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Học phí ưu đãi</p>
                    <div className="flex flex-wrap items-baseline gap-3">
                       <span className="text-4xl font-black text-indigo-600 tracking-tight">{course.discountPrice}</span>
                       <span className="text-sm font-bold text-slate-400 line-through decoration-slate-300">{course.originalPrice}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-slate-600 font-bold text-sm bg-slate-50 p-4 rounded-2xl border border-slate-100">
                     <Clock className="text-indigo-600 shrink-0" size={20} />
                     <span>Thời lượng: {course.duration}</span>
                  </div>

                  <Link 
                    to={`/register?course=${course.id}`}
                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-base shadow-xl hover:bg-indigo-600 transition-all active:scale-95 flex items-center justify-center space-x-3 group"
                  >
                    <span>Đăng ký giữ chỗ</span>
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <p className="text-center text-[10px] text-slate-400 font-medium">
                    Cam kết hoàn tiền nếu không hài lòng sau buổi học đầu tiên.
                  </p>
               </div>
            </div>

          </div>
        </div>

        {/* Standard Curriculum Section */}
        {course.curriculum && (
          <section className="mb-32">
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full border border-indigo-100 shadow-sm">
                <BookOpen size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Nội dung chi tiết</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900">Lộ trình học tập</h2>
              <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
                Nội dung được thiết kế bài bản để bạn làm chủ kỹ năng từ cơ bản đến nâng cao.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 relative">
              {/* Decorative line for desktop */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2"></div>

              {course.curriculum.map((item, index) => (
                <div key={index} className={`flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} relative`}>
                  {/* Dot on timeline */}
                  <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-indigo-600 shadow-md z-10"></div>
                  
                  <div className={`w-full md:w-[calc(50%-2rem)] bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-lg hover:shadow-xl transition-all group ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`flex flex-col gap-2 mb-4 ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                      <span className="inline-block bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {item.session}
                      </span>
                      <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    
                    <ul className={`space-y-2 ${index % 2 === 0 ? 'flex flex-col md:items-end' : ''}`}>
                      {item.topics.map((topic, i) => (
                        <li key={i} className={`flex items-center gap-2 text-slate-600 font-medium text-sm ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full shrink-0"></div>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* AI Customizer Section */}
        <section className="bg-slate-900 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden mb-32">
          {/* ... AI Section Content ... */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-8">
              <div className="inline-flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <Sparkles size={16} className="text-indigo-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">AI Customizer</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight">Cá nhân hóa <br/><span className="text-indigo-500">nội dung học</span></h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                Nhu cầu của bạn là duy nhất. Hãy để AI thiết kế lại lộ trình tập trung 100% vào mục tiêu của bạn.
              </p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2 font-heading">
                    <Target size={14} /> Mục đích học của bạn?
                  </label>
                  <input 
                    type="text" 
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="VD: tự xây dựng fanpage của mình" 
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2 font-heading">
                    <Package size={14} /> Sản phẩm bạn muốn làm được?
                  </label>
                  <input 
                    type="text" 
                    value={products}
                    onChange={(e) => setProducts(e.target.value)}
                    placeholder="VD: ảnh post facebook, quảng cáo sản phẩm" 
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-white" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <button 
                    onClick={() => setIntensity('standard')}
                    className={`p-4 rounded-2xl border-2 transition-all font-black text-xs uppercase ${intensity === 'standard' ? 'border-indigo-500 bg-indigo-600/20 text-indigo-400' : 'border-white/5 bg-white/5 text-slate-500'}`}
                   >Bình thường</button>
                   <button 
                    onClick={() => setIntensity('fast')}
                    className={`p-4 rounded-2xl border-2 transition-all font-black text-xs uppercase ${intensity === 'fast' ? 'border-indigo-500 bg-indigo-600/20 text-indigo-400' : 'border-white/5 bg-white/5 text-slate-500'}`}
                   >Cấp tốc</button>
                </div>
                <button 
                  onClick={generateAILearningPath}
                  disabled={loading || !purpose || !products}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center space-x-3 transition-all active:scale-95"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <RefreshCcw size={18} />}
                  <span>Tối ưu nội dung với AI</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 min-h-[400px] relative">
              {loading && (
                <div className="h-full flex flex-col items-center justify-center py-20 space-y-6 animate-pulse">
                   <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                   <p className="text-indigo-400 font-black text-sm uppercase tracking-widest">Đang xây dựng lộ trình...</p>
                </div>
              )}

              {aiPlan && !loading && (
                <div className="space-y-10 animate-in fade-in zoom-in duration-500">
                  <div className="bg-indigo-600/10 p-6 rounded-3xl border border-indigo-500/20 flex gap-4 items-start">
                     <Info size={20} className="text-indigo-400 shrink-0 mt-1" />
                     <p className="text-sm font-medium text-slate-300 leading-relaxed italic font-heading">"{aiPlan.reasoning}"</p>
                  </div>

                  <div className="space-y-4 max-h-[450px] overflow-y-auto pr-4 no-scrollbar">
                     {aiPlan.syllabus.map((s, i) => (
                       <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all flex gap-6 items-start">
                          <div className="bg-indigo-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-black text-xs shadow-lg">
                             {i + 1}
                          </div>
                          <div className="space-y-3">
                             <h4 className="text-lg font-black">{s.title}</h4>
                             <div className="flex flex-wrap gap-2">
                               {s.topics.map((t, idx) => (
                                 <span key={idx} className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-slate-300 border border-white/5">{t}</span>
                               ))}
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>

                  <div className="pt-6">
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="w-full bg-white text-slate-900 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-indigo-50 transition-all active:scale-95 text-center"
                    >
                      <MessageSquare size={18} />
                      <span>Xác nhận nội dung & Đăng ký ngay</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* MODAL XÁC NHẬN THÔNG TIN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
              <X size={20} />
            </button>
            
            <div className="p-8 md:p-10 space-y-8">
              {sendSuccess ? (
                <div className="text-center py-10 space-y-6 animate-in zoom-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle size={40} className="text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">Yêu cầu đã gửi!</h2>
                    <p className="text-slate-500 mt-2 font-medium">Hủ sẽ liên hệ lại qua Zalo để tư vấn lộ trình này cho bạn nhé.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <h2 className="text-2xl font-black text-slate-900">Xác nhận thông tin</h2>
                    <p className="text-slate-500 text-sm mt-2 font-medium">Hủ sẽ gửi lộ trình cá nhân hóa này <br/> qua Zalo để chúng ta cùng bắt đầu.</p>
                  </div>

                  <form onSubmit={handleConsultation} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-heading">Họ tên của bạn</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          required 
                          type="text" 
                          value={contactInfo.name}
                          onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                          placeholder="Nguyễn Văn A" 
                          className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all" 
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 font-heading">Số điện thoại Zalo</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          required 
                          type="tel" 
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                          placeholder="09xxx..." 
                          className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all" 
                        />
                      </div>
                    </div>

                    <button 
                      disabled={isSending}
                      type="submit" 
                      className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center space-x-3 shadow-xl hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isSending ? <Loader2 className="animate-spin" size={20} /> : <MessageSquare size={18} />}
                      <span>Tư vấn lộ trình này</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
