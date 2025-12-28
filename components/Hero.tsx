
import React, { useState, useEffect } from 'react';

/**
 * CHỖ THAY ẢNH SLIDE Ở ĐÂY NÈ:
 * - url: Dán link ảnh của bạn vào (nên dùng link từ Unsplash, Pinterest hoặc link ảnh đã upload)
 * - title: Tên hiện trên nhãn nhỏ của ảnh
 */
const SLIDE_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    title: "Thiết kế Banner Marketing"
  },
  {
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    title: "Sáng tạo nội dung số"
  },
  {
    url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800",
    title: "Xây dựng bộ nhận diện"
  },
  {
    url: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=800",
    title: "Học Photoshop chuyên sâu"
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Hàm cuộn mượt mà đến section
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-hudesign flex items-center pt-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span className="text-indigo-400 font-bold text-xs uppercase tracking-widest">Học thiết kế cơ bản</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Khóa học thiết kế đồ họa cơ bản cho <span className="text-indigo-400">người làm marketing</span>
          </h1>
          
          <p className="text-lg text-slate-300 max-w-xl mx-auto md:mx-0">
            Trang bị kỹ năng thiết kế thực tế để bùng nổ doanh số. Tự tay tạo ra các ấn phẩm quảng cáo "triệu view" với Photoshop, Illustrator và Canva.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" alt="PS" className="w-10 h-10" />
              </div>
              <span className="text-white text-xs mt-2 font-bold opacity-60">Photoshop</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg" alt="AI" className="w-10 h-10" />
              </div>
              <span className="text-white text-xs mt-2 font-bold opacity-60">Illustrator</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-all">
                <img src="https://www.vectorlogo.zone/logos/canva/canva-icon.svg" alt="Canva" className="w-10 h-10" />
              </div>
              <span className="text-white text-xs mt-2 font-bold opacity-60">Canva</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
            <button 
              onClick={(e) => scrollToSection(e, 'courses')}
              className="bg-white text-indigo-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-2xl shadow-white/10 text-center"
            >
              Tìm hiểu thêm
            </button>
            <button 
              onClick={(e) => scrollToSection(e, 'register')}
              className="bg-indigo-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 text-center"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>

        <div className="relative group h-[250px] md:h-[380px] max-w-md mx-auto md:ml-auto md:mr-0 w-full">
          <div className="absolute -inset-4 bg-indigo-500/20 rounded-3xl blur-2xl group-hover:bg-indigo-500/30 transition-all"></div>
          
          <div className="relative h-full w-full">
            {/* Huy hiệu Cam kết (Popup) */}
            <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 bg-white p-3 md:p-4 rounded-2xl shadow-2xl flex items-center space-x-3 rotate-6 animate-bounce z-40 border border-indigo-100">
              <div className="bg-green-100 p-2 rounded-lg">
                <Sparkles className="text-green-600 w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="pr-2 text-left">
                <p className="text-[9px] md:text-[10px] text-slate-500 font-black uppercase tracking-tighter leading-none mb-1">Thành thạo công cụ</p>
                <p className="text-xs md:text-sm font-black text-slate-900 whitespace-nowrap">Kèm 1 - 1 tận tâm</p>
              </div>
            </div>

            <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-2 md:p-3 border border-white/10 h-full overflow-hidden shadow-2xl">
              {SLIDE_IMAGES.map((slide, index) => (
                <div 
                  key={index}
                  className={`absolute inset-2 md:inset-3 transition-all duration-1000 ease-in-out transform ${
                    index === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                  }`}
                >
                  <img 
                    src={slide.url} 
                    alt={slide.title}
                    className="w-full h-full object-cover rounded-2xl grayscale-[15%] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 z-10">
                    <p className="text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{slide.title}</p>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex space-x-2 z-20">
                {SLIDE_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'w-6 bg-indigo-500' : 'w-1.5 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sparkles = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);

export default Hero;
