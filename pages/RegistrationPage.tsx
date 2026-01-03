
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Send, Phone, Mail, User, MapPin, Loader2, CheckCircle, 
  Calendar, Clock, CreditCard, Wallet, Laptop, Users, 
  Target, Sparkles, BookOpen, Brain, Zap, MessageSquare
} from 'lucide-react';
import { COURSES } from '../constants';

// === THAY LINK GOOGLE APPS SCRIPT CỦA BẠN VÀO ĐÂY ===
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby04wYoQIDiUsavGiOEqLVjKyldFtTkPNHRzeiyzBWomFsoowHkpDjSoJDqXwWCXapF/exec";
// =================================================

const RegistrationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const queryParams = new URLSearchParams(location.search);
  const preselectedCourseId = queryParams.get('course');
  
  const [selectedCourse, setSelectedCourse] = useState(preselectedCourseId || '');
  const [learningStyle, setLearningStyle] = useState('Thực hành là chính');
  const [paymentMethod, setPaymentMethod] = useState('Chuyển khoản');
  const [mode, setMode] = useState('offline');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('submitting');
    
    const formData = new FormData(formRef.current);
    formData.append('learningStyle', learningStyle);
    formData.append('paymentMethod', paymentMethod);
    formData.append('mode', mode);

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Lỗi gửi form:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const learningStyles = [
    { id: 'full', title: 'Kiến thức đồ họa đầy đủ', icon: <BookOpen />, desc: 'Đi sâu chi tiết về lý thuyết và công cụ.' },
    { id: 'aesthetic', title: 'Tư duy thẩm mỹ & Bố cục', icon: <Brain />, desc: 'Tập trung phối màu, chọn font và sắp xếp.' },
    { id: 'practice', title: 'Thực hành là chính', icon: <Zap />, desc: 'Học qua các dự án thực tế, ít lý thuyết.' },
    { id: 'ai-fast', title: 'Template & AI giải quyết nhanh', icon: <Sparkles />, desc: 'Sử dụng AI và mẫu có sẵn để tối ưu tốc độ.' }
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight uppercase">
                Đăng ký <br/><span className="text-indigo-600">bứt phá sáng tạo</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Chỉ mất 2 phút để bắt đầu lộ trình học cá nhân hóa 1 kèm 1 cùng Hudesign.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <CheckCircle className="text-green-500" />, title: "Cam kết 1 kèm 1", desc: "Người hướng dẫn đồng hành xuyên suốt 100% thời gian." },
                { icon: <Clock className="text-indigo-500" />, title: "Lịch học linh hoạt", desc: "Học theo thời gian rảnh của bạn, không lo mất buổi." },
                { icon: <Target className="text-red-500" />, title: "Sản phẩm thực tế", desc: "Đầu ra là các thiết kế bạn đang cần cho công việc." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <div className="shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="font-black text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full"></div>
               <h3 className="text-xl font-black">Hỗ trợ nhanh qua Zalo</h3>
               <div className="flex items-center gap-4">
                 <div className="bg-white/20 p-3 rounded-2xl"><Phone size={24} /></div>
                 <div>
                   <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest">Hotline / Zalo</p>
                   <p className="text-xl font-black">0912.412.132</p>
                 </div>
               </div>
               <button 
                onClick={() => window.open('https://zalo.me/0912412132', '_blank')}
                className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl"
               >
                 Chat ngay với Hủ
               </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            {status === 'success' ? (
              <div className="bg-white rounded-[3rem] p-12 text-center shadow-xl border border-slate-100 space-y-8 animate-in fade-in zoom-in">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-black text-slate-900">ĐĂNG KÝ THÀNH CÔNG!</h2>
                  <p className="text-slate-500 font-medium">Cảm ơn bạn đã tin tưởng Hudesign. Chúng mình sẽ liên hệ với bạn qua Zalo/Số điện thoại sớm nhất có thể.</p>
                </div>
                <button 
                  onClick={() => navigate('/courses')}
                  className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl"
                >
                  Khám phá thêm khóa học
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-slate-100 space-y-10">
                <section className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                    <User className="text-indigo-600" size={20} />
                    <h2 className="font-black text-slate-900 uppercase tracking-tight">Thông tin cá nhân</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Họ và tên *</label>
                      <input required name="name" type="text" placeholder="Nguyễn Văn A" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số điện thoại Zalo *</label>
                      <input required name="phone" type="tel" placeholder="09xxx..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email liên hệ *</label>
                    <input required name="email" type="email" placeholder="example@gmail.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                    <Laptop className="text-indigo-600" size={20} />
                    <h2 className="font-black text-slate-900 uppercase tracking-tight">Chi tiết khóa học</h2>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Khóa học bạn chọn *</label>
                    <select 
                      name="course"
                      required 
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all appearance-none cursor-pointer outline-none"
                    >
                      <option value="">-- Chọn khóa học --</option>
                      {COURSES.map(c => (
                        <option key={c.id} value={c.title}>{c.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setMode('offline')}
                      className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all space-y-3 ${mode === 'offline' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                    >
                      <MapPin size={24} />
                      <span className="font-black text-xs uppercase">Học Offline</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setMode('online')}
                      className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all space-y-3 ${mode === 'online' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                    >
                      <Users size={24} />
                      <span className="font-black text-xs uppercase">Học Online</span>
                    </button>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                    <Calendar className="text-indigo-600" size={20} />
                    <h2 className="font-black text-slate-900 uppercase tracking-tight">Thời gian dự kiến</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lịch rảnh trong tuần *</label>
                      <input required name="schedule" type="text" placeholder="VD: Tối Thứ 2, 4, 6" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số buổi/tuần mong muốn *</label>
                      <input required name="sessionsPerWeek" type="text" placeholder="VD: 2 - 3 buổi" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" />
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                    <MessageSquare className="text-indigo-600" size={20} />
                    <h2 className="font-black text-slate-900 uppercase tracking-tight">Phong cách học tập</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {learningStyles.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setLearningStyle(style.title)}
                        className={`p-6 rounded-[2rem] border-2 transition-all text-left space-y-3 group ${learningStyle === style.title ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                      >
                        <div className={`p-3 rounded-2xl w-fit transition-colors ${learningStyle === style.title ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 group-hover:text-indigo-500'}`}>
                          {style.icon}
                        </div>
                        <div className="space-y-1">
                          <p className={`font-black text-xs uppercase ${learningStyle === style.title ? 'text-indigo-600' : 'text-slate-900'}`}>{style.title}</p>
                          <p className="text-[10px] text-slate-500 font-bold leading-relaxed">{style.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                    <CreditCard className="text-indigo-600" size={20} />
                    <h2 className="font-black text-slate-900 uppercase tracking-tight">Thanh toán & Yêu cầu</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setPaymentMethod('Chuyển khoản')}
                      className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${paymentMethod === 'Chuyển khoản' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                    >
                      <CreditCard size={20} />
                      <span className="font-black text-xs uppercase">Chuyển khoản</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setPaymentMethod('Tiền mặt')}
                      className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${paymentMethod === 'Tiền mặt' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                    >
                      <Wallet size={20} />
                      <span className="font-black text-xs uppercase">Tiền mặt</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Yêu cầu thêm (không bắt buộc)</label>
                    <textarea name="message" rows={3} placeholder="Ví dụ: Mình muốn học để tự thiết kế Menu cho quán cafe của mình..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all resize-none outline-none"></textarea>
                  </div>
                </section>

                <div className="pt-6">
                  <button 
                    disabled={status === 'submitting'}
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-6 rounded-3xl font-black text-lg uppercase tracking-widest shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {status === 'submitting' ? <Loader2 className="animate-spin" /> : <Send size={24} />}
                    <span>{status === 'submitting' ? 'Đang gửi thông tin...' : 'XÁC NHẬN ĐĂNG KÝ'}</span>
                  </button>
                  <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6">Hudesign cam kết bảo mật thông tin học viên 100%</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
