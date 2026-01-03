
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  ArrowLeft, CheckCircle, Clock, Sparkles, Send, Loader2, 
  Calendar, Zap, ChevronRight, MessageSquare, Flame, 
  Target, Package, RefreshCcw, Info
} from 'lucide-react';
import { COURSES } from '../constants';
import { AICustomPlan, Course } from '../types';

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

  if (!course) return null;

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <Link to="/courses" className="inline-flex items-center space-x-2 text-slate-500 hover:text-indigo-600 font-bold text-sm mb-8 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại danh sách khóa học</span>
        </Link>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                  {course.type}
                </span>
                {course.isHot && (
                  <span className="bg-red-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1">
                    <Flame size={12} fill="currentColor" /> HOT
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                {course.title}
              </h1>
              <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                {course.content}
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex items-baseline space-x-3">
                <span className="text-sm font-bold text-slate-400 line-through decoration-red-500/50">{course.originalPrice}</span>
                <span className="text-3xl md:text-5xl font-black text-indigo-600 tracking-tight">{course.discountPrice}</span>
              </div>
              <div className="flex gap-4">
                <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 flex items-center space-x-2">
                  <Clock className="text-indigo-600" size={16} />
                  <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{course.duration}</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {course.perks.map((perk, i) => (
                <div key={i} className="flex items-start space-x-3 group">
                  <div className="mt-1 bg-green-100 p-1 rounded-full shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle size={14} className="text-green-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-600">{perk}</span>
                </div>
              ))}
            </div>

            <Link 
              to={`/register?course=${course.id}`}
              className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:bg-indigo-600 transition-all active:scale-95 flex items-center justify-center space-x-3 w-full sm:w-auto text-center"
            >
              <span>Đăng ký giữ chỗ ngay</span>
              <Send size={20} />
            </Link>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100">
               <img 
                 src={course.image} 
                 alt={course.title}
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 hidden md:block animate-float">
               <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 p-4 rounded-2xl">
                    <Sparkles className="text-indigo-600 w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900 leading-none">Cam kết</p>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">1 kèm 1 thực chiến</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Full Curriculum Section */}
        <section className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-indigo-600 font-black text-sm uppercase tracking-widest">Lộ trình học A - Z</h2>
            <p className="text-3xl md:text-5xl font-black text-slate-900 uppercase">Hành trình làm chủ công cụ</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {course.curriculum?.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:border-indigo-100 transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {item.session}
                  </span>
                  <Calendar size={18} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                <div className="space-y-2">
                  {item.topics.map((topic, i) => (
                    <div key={i} className="flex items-center space-x-2 text-slate-500">
                      <ChevronRight size={14} className="text-indigo-400 shrink-0" />
                      <span className="text-sm font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Customizer Section */}
        <section className="bg-slate-900 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden mb-32">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-8">
              <div className="inline-flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <Sparkles size={16} className="text-indigo-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">AI Customizer</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight">Cá nhân hóa <br/><span className="text-indigo-500">nội dung học</span></h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                Bạn có mục tiêu cụ thể? Hãy để AI của Hudesign thiết kế lại nội dung của {course.curriculum?.length || 5} buổi học này sao cho tập trung 100% vào nhu cầu của bạn.
              </p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Target size={14} /> Mục đích học của bạn?
                  </label>
                  <input 
                    type="text" 
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="VD: Để tự thiết kế banner Facebook, học nhanh để đi làm..." 
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Package size={14} /> Sản phẩm bạn muốn làm được?
                  </label>
                  <input 
                    type="text" 
                    value={products}
                    onChange={(e) => setProducts(e.target.value)}
                    placeholder="VD: Poster sự kiện, Album ảnh cưới, Video Reels TikTok..." 
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
              {!aiPlan && !loading && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40 py-20">
                   <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                      <Sparkles size={40} className="text-slate-700" />
                   </div>
                   <p className="text-slate-500 font-black uppercase tracking-widest text-sm">Kết quả nội dung AI <br/>sẽ hiển thị tại đây</p>
                </div>
              )}

              {loading && (
                <div className="h-full flex flex-col items-center justify-center py-20 space-y-6 animate-pulse">
                   <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                   <p className="text-indigo-400 font-black text-sm uppercase tracking-widest">Đang phân tích nhu cầu của bạn...</p>
                </div>
              )}

              {aiPlan && !loading && (
                <div className="space-y-10 animate-in fade-in zoom-in duration-500">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Nội dung cá nhân hóa</p>
                        <h3 className="text-2xl font-black uppercase">DÀNH RIÊNG CHO BẠN</h3>
                     </div>
                     <div className="flex gap-4">
                        <div className="bg-indigo-600/20 border border-indigo-500/30 px-6 py-3 rounded-2xl text-center">
                           <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-1">Thời lượng</p>
                           <p className="text-xl font-black">{aiPlan.estimatedSessions} buổi</p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-indigo-600/10 p-6 rounded-3xl border border-indigo-500/20 flex gap-4 items-start">
                     <Info size={20} className="text-indigo-400 shrink-0 mt-1" />
                     <p className="text-sm font-medium text-slate-300 leading-relaxed italic">"{aiPlan.reasoning}"</p>
                  </div>

                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 no-scrollbar">
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
                    <Link 
                      to={`/register?course=${course.id}`}
                      className="w-full bg-white text-slate-900 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-indigo-50 transition-all active:scale-95 text-center"
                    >
                      <MessageSquare size={18} />
                      <span>Xác nhận nội dung & Đăng ký ngay</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ / Info */}
        <section className="max-w-4xl mx-auto mb-32">
          <div className="bg-slate-50 rounded-[2.5rem] p-10 md:p-16 border border-slate-100 space-y-10">
            <h3 className="text-2xl font-black text-slate-900 uppercase">Hỏi đáp nhanh</h3>
            <div className="space-y-8">
              {[
                { q: "Học phí đã bao gồm tài nguyên chưa?", a: "Toàn bộ học phí đã bao gồm các bộ Template, Ebook và tài liệu thực hành độc quyền của Hudesign." },
                { q: "Tôi có được hỗ trợ sau khóa học không?", a: "Chắc chắn rồi. Bạn sẽ được tham gia nhóm học viên để hỏi đáp và nhận hỗ trợ trực tiếp từ Hủ mãi mãi." },
                { q: "Có được chia sẻ dự án để thực hành sau khoá học không?", a: "Chúng mình sẽ chia sẻ những tài nguyên mới, những dự án thực chiến để học viên cùng thực hành và tăng thu nhập." }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <p className="font-black text-slate-900 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                    {item.q}
                  </p>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed pl-3.5">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseDetailPage;
