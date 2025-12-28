
import React, { useState, useRef } from 'react';
import { Send, Phone, Mail, MapPin, Loader2, CheckCircle } from 'lucide-react';
import { COURSES } from '../constants';

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
      if (SCRIPT_URL && SCRIPT_URL.includes("script.google.com")) {
        await fetch(SCRIPT_URL, {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        });
        setStatus('success');
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus('success');
      }
      formRef.current.reset();
      setTimeout(() => setStatus('idle'), 10000);
    } catch (error) {
      console.error("Lỗi gửi form:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative border border-slate-800">
        <div className="relative z-10 grid lg:grid-cols-5">
          <div className="lg:col-span-2 p-8 md:p-16 bg-indigo-600 text-white space-y-8 md:space-y-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-6 leading-tight">Bạn đã sẵn sàng để bứt phá?</h2>
              <p className="text-indigo-100 text-sm md:text-lg">Liên hệ với Hudesign để được tư vấn lộ trình học phù hợp nhất cho mục tiêu của bạn.</p>
            </div>

            <div className="space-y-6 md:space-y-8">
              {[
                { icon: <Phone size={20} />, label: 'Hotline', value: '0912.412.132' },
                { icon: <Mail size={20} />, label: 'Email', value: 'hello@hudesign.site' },
                { icon: <MapPin size={20} />, label: 'Văn phòng', value: 'Ninh Kiều, Cần Thơ' }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4 md:space-x-6">
                  <div className="bg-white/10 p-3 md:p-4 rounded-xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest">{item.label}</p>
                    <p className="text-base md:text-xl font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 p-8 md:p-16 bg-white">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500 py-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="text-green-600 w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">Gửi thành công!</h3>
                  <p className="text-slate-500 text-sm md:text-lg">Chúng mình sẽ gọi lại cho bạn sớm nhất có thể.</p>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-bold text-sm"
                >
                  Quay lại form
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Họ và tên *</label>
                    <input name="name" required type="text" placeholder="Nguyễn Văn A" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Số điện thoại *</label>
                    <input name="phone" required type="tel" placeholder="09xxx..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-sm" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Khóa học quan tâm *</label>
                  <div className="relative">
                    <select name="course" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer font-medium text-sm pr-10">
                      <option value="">-- Chọn khóa học --</option>
                      {COURSES.map(course => <option key={course.id} value={course.title}>{course.title}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Lời nhắn</label>
                  <textarea name="message" rows={3} placeholder="Ví dụ: Mình muốn học Photoshop để tự thiết kế banner bán hàng..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all resize-none font-medium text-sm"></textarea>
                </div>

                <button 
                  disabled={status === 'submitting'}
                  type="submit" 
                  className={`w-full py-4 rounded-xl font-black text-white text-base transition-all flex items-center justify-center space-x-3 shadow-lg active:scale-[0.98] ${status === 'submitting' ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  {status === 'submitting' ? (
                    <><Loader2 className="animate-spin" size={20} /><span>Đang gửi...</span></>
                  ) : (
                    <><Send size={18} /><span>Gửi yêu cầu tư vấn</span></>
                  )}
                </button>
                <p className="text-center text-[10px] text-slate-400 font-medium italic">Chúng mình sẽ bảo mật thông tin của bạn.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
