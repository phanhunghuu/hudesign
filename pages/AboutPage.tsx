
import React from 'react';
import { Award, Users, Facebook, Music2, MessageCircle, Sparkles, Shield, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  // === THAY ĐỔI LINK ẢNH CỦA BẠN TẠI ĐÂY ===
  const myPortraitUrl = "https://i.postimg.cc/K8cZt5LQ/HUDESIGN-S-PORTFOLIO.png"; 
  // =========================================

  return (
    <div className="min-h-screen bg-white">
      {/* Main Intro Section */}
      <section className="flex flex-col md:flex-row h-screen min-h-[700px] overflow-hidden">
        {/* Left Side: Photo Container */}
        <div className="w-full md:w-1/2 bg-[#5d5d5d] relative flex flex-col items-center justify-end">
          {/* Logo Overlay */}
          <div className="absolute top-24 left-8 md:top-28 md:left-12 z-20">
            <img src="https://i.postimg.cc/prJR9FbQ/15.png" alt="Hudesign Logo" className="h-10 md:h-14 w-auto brightness-0 invert opacity-80" />
          </div>
          
          {/* Portrait Image - Fixed to stay inside the box */}
          <div className="relative z-10 w-full h-full flex items-end justify-center px-4 pt-32">
            <img 
              src={myPortraitUrl} 
              alt="Ngọc Huy - Founder Hudesign" 
              className="max-w-full max-h-full object-contain object-bottom pointer-events-none transition-opacity duration-700"
              style={{ maxHeight: 'calc(100% - 20px)' }}
            />
          </div>
          
          {/* Subtle shadow at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-0"></div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white relative z-20">
          <div className="max-w-xl space-y-8 md:space-y-10">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Xin chào, <br/>
                là <span className="text-indigo-600">Hủ</span> đây!
              </h1>
              <div className="w-20 h-2 bg-indigo-600 rounded-full"></div>
            </div>

            <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
              Với hơn 7 năm kinh nghiệm trong ngành Graphic Design và Branding, mình đã giúp hàng trăm bạn Marketers làm chủ công cụ thiết kế để tự tin hơn trong công việc.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-4">
              <div className="flex items-center space-x-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="bg-indigo-600 p-3 rounded-2xl text-white">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">7 Năm</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kinh nghiệm</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="bg-indigo-600 p-3 rounded-2xl text-white">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">500+</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Học viên</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6 pt-4">
              <p className="text-sm font-black text-slate-900 uppercase tracking-widest">FOLLOW ME:</p>
              <div className="flex space-x-5">
                <a href="https://facebook.com/phanhung.huu" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-all hover:scale-110" title="Facebook">
                  <Facebook size={24} />
                </a>
                <a href="https://www.tiktok.com/@hudesign" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-all hover:scale-110" title="TikTok">
                  <Music2 size={24} />
                </a>
                <a href="https://zalo.me/0912412132" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-all hover:scale-110" title="Zalo">
                  <MessageCircle size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-slate-900 py-24 md:py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-600/10 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 md:mb-24 space-y-4">
            <h2 className="text-indigo-400 font-black text-sm uppercase tracking-widest">Giá trị cốt lõi</h2>
            <p className="text-3xl md:text-5xl font-black uppercase">Tại sao mình làm Hudesign?</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Chất lượng thật",
                desc: "Học thật, làm thật, kết quả thật. Mình nói không với những lý thuyết suông không áp dụng được vào thực tế."
              },
              {
                icon: <Heart className="w-10 h-10" />,
                title: "Đồng hành tận tâm",
                desc: "Học với mình là học sự đồng hành. Mình hỗ trợ bạn ngay cả khi khóa học đã kết thúc từ lâu."
              },
              {
                icon: <Sparkles className="w-10 h-10" />,
                title: "Tư duy thẩm mỹ",
                desc: "Công cụ chỉ là phương tiện. Mình sẽ dạy bạn cách tư duy hình ảnh để thiết kế luôn có 'gu' riêng."
              }
            ].map((item, i) => (
              <div key={i} className="space-y-6 p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group">
                <div className="text-indigo-400 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className="py-24 max-w-4xl mx-auto px-4 text-center">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Cùng tạo nên những <br/><span className="text-indigo-600">điều khác biệt!</span></h2>
          <p className="text-slate-500 text-lg md:text-xl font-medium">Bạn đã sẵn sàng để nâng tầm kỹ năng thiết kế đồ họa của mình cùng Hủ chưa?</p>
          <div className="pt-4">
             <a href="#/courses" className="inline-block bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:bg-indigo-600 transition-all active:scale-95">
               Khám phá các khóa học
             </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
