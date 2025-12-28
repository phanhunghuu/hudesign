
import React, { useState, useRef } from 'react';
import { Send, Phone, Mail, MapPin, Loader2, CheckCircle } from 'lucide-react';
import { COURSES } from '../constants';

/**
 * HƯỚNG DẪN DÀNH CHO HUDESIGN:
 * 1. Đảm bảo URL bên dưới là URL Web App bạn nhận được từ Google Apps Script.
 * 2. Khi Deploy trên Google Script, phần "Who has access" BẮT BUỘC phải chọn "Anyone".
 */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx66OgnehbiEjue5ckcdsMFjxD5gNBLU6k4xU1Imkkv8U5vWJmb_hTYutpVDktf3OWO/exec"; 

const RegistrationForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('submitting');

    const formData = new FormData(formRef.current);
    
    try {
      // Kiểm tra nếu URL đã được thay đổi khỏi giá trị mặc định (không còn là chuỗi rỗng hoặc placeholder cũ)
      if (SCRIPT_URL && SCRIPT_URL.includes("script.google.com")) {
        // GỬI DỮ LIỆU THẬT
        await fetch(SCRIPT_URL, {
          method: 'POST',
          body: formData,
          mode: 'no-cors' // Chế độ này cần thiết để tránh lỗi CORS với Google Script
        });
        
        // Vì dùng no-cors, trình duyệt không đọc được phản hồi từ server, 
        // nhưng nếu không nhảy vào catch nghĩa là yêu cầu đã được gửi đi thành công.
        setStatus('success');
      } else {
        // CHẾ ĐỘ GIẢ LẬP (Nếu chưa cấu hình URL)
        console.warn("Chưa cấu hình URL Google Script chính xác. Đang chạy giả lập.");
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus('success');
      }
      
      formRef.current.reset();
      setTimeout(() => setStatus('idle'), 8000);
    } catch (error) {
      console.error("Lỗi gửi form:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl relative border border-slate-100">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grid)" />
             <defs>
               <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                 <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
               </pattern>
             </defs>
           </svg>
        </div>

        <div className="relative z-10 grid lg:grid-cols-5">
          <div className="lg:col-span-2 p-10 md:p-16 bg-indigo-600 text-white space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Bắt đầu hành trình thiết kế của bạn ngay hôm nay!</h2>
              <p className="text-indigo-100 text-lg">Để lại thông tin, đội ngũ Hudesign sẽ liên hệ tư vấn lộ trình học phù hợp nhất cho bạn trong vòng 24h.</p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center space-x-6 group">
                <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-white/20 transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest">Hotline</p>
                  <p className="text-xl font-bold">0912.412.132</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 group">
                <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-white/20 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest">Email</p>
                  <p className="text-xl font-bold">hello@hudesign.site</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 group">
                <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-white/20 transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest">Văn phòng</p>
                  <p className="text-xl font-bold">Cần Thơ, Việt Nam</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 p-10 md:p-16 bg-white relative">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-xl shadow-green-100">
                  <CheckCircle className="text-green-600 w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900">Gửi yêu cầu thành công!</h3>
                  <p className="text-slate-500 text-lg max-w-sm mx-auto">Cảm ơn bạn đã quan tâm. Hudesign sẽ gọi lại cho bạn sớm nhất có thể.</p>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Họ và tên *</label>
                    <input 
                      name="name"
                      required
                      type="text" 
                      placeholder="Nguyễn Văn A" 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Số điện thoại *</label>
                    <input 
                      name="phone"
                      required
                      type="tel" 
                      placeholder="09xxx..." 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email liên hệ</label>
                  <input 
                    name="email"
                    type="email" 
                    placeholder="email@example.com" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Chọn khóa học quan tâm *</label>
                  <div className="relative">
                    <select 
                      name="course"
                      required
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer font-medium pr-12"
                    >
                      <option value="">-- Vui lòng chọn --</option>
                      {COURSES.map(course => (
                        <option key={course.id} value={course.title}>{course.title}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Lời nhắn hoặc yêu cầu riêng</label>
                  <textarea 
                    name="message"
                    rows={4}
                    placeholder="Bạn muốn tập trung học phần nào nhất? Ví dụ: Thiết kế banner Facebook, Chỉnh ảnh cưới..." 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none font-medium"
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold">
                    Có lỗi xảy ra khi gửi dữ liệu. Vui lòng thử lại hoặc liên hệ Hotline.
                  </div>
                )}

                <button 
                  disabled={status === 'submitting'}
                  type="submit" 
                  className={`w-full py-5 rounded-2xl font-black text-white text-lg transition-all flex items-center justify-center space-x-3 shadow-xl shadow-indigo-600/20 active:scale-[0.98] ${status === 'submitting' ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin" size={24} />
                      <span>Đang gửi thông tin...</span>
                    </>
                  ) : (
                    <>
                      <span>Gửi yêu cầu tư vấn</span>
                      <Send size={20} />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-400 font-medium italic">Thông tin của bạn được bảo mật tuyệt đối.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
