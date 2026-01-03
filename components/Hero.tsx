
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[90vh] md:min-h-screen bg-gradient-hudesign flex items-center pt-16 md:pt-20 overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-64 h-64 md:w-96 md:h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 -left-20 w-64 h-64 md:w-96 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        <div className="space-y-6 md:space-y-8 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            <span className="text-indigo-400 font-bold text-[10px] uppercase tracking-widest">Đào tạo 1 kèm 1 thực chiến</span>
          </div>
          
          <h1 className="text-3xl md:text-6xl font-black text-white leading-[1.2] md:leading-tight">
            Thiết kế đồ họa cơ bản cho <span className="text-indigo-400">Marketers</span>
          </h1>
          
          <p className="text-sm md:text-lg text-slate-300 max-w-md mx-auto md:mx-0 leading-relaxed">
            Làm chủ Photoshop, Illustrator và Canva để tự tay tạo ra các ấn phẩm quảng cáo thu hút khách hàng.
          </p>

          <div className="flex justify-center md:justify-start gap-4 md:gap-6">
            {['https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg', 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg', 'https://www.vectorlogo.zone/logos/canva/canva-icon.svg'].map((src, i) => (
              <div key={i} className="w-10 h-10 md:w-14 md:h-14 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                <img src={src} alt="tool" className="w-6 h-6 md:w-9 md:h-9" />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 md:gap-4 pt-2">
            <Link 
              to="/register"
              className="bg-indigo-600 text-white font-black px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 text-sm md:text-base text-center"
            >
              Đăng ký tư vấn ngay
            </Link>
            <Link 
              to="/courses"
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all text-sm md:text-base text-center"
            >
              Xem các khóa học
            </Link>
          </div>
        </div>

        <div className="relative group h-[220px] md:h-[400px] max-w-sm mx-auto md:ml-auto md:mr-0 w-full mt-4 md:mt-0">
          <div className="absolute -inset-2 bg-indigo-500/20 rounded-3xl blur-xl group-hover:bg-indigo-500/30 transition-all"></div>
          
          <div className="relative h-full w-full">
            <div className="absolute -top-4 -right-2 md:-top-8 md:-right-8 bg-white p-2 md:p-4 rounded-xl shadow-2xl flex items-center space-x-2 rotate-6 z-40 border border-indigo-100 scale-90 md:scale-100">
              <div className="bg-green-100 p-1.5 rounded-lg">
                <Sparkles className="text-green-600 w-4 h-4 md:w-6 md:h-6" />
              </div>
              <div className="pr-1 text-left">
                <p className="text-[8px] md:text-[10px] text-slate-500 font-black uppercase leading-none mb-1 tracking-tighter">Cam kết</p>
                <p className="text-[10px] md:text-sm font-black text-slate-900 whitespace-nowrap">Kèm 1-1 tận tâm</p>
              </div>
            </div>

            <div className="relative bg-slate-800/40 backdrop-blur-sm rounded-[2rem] p-1.5 md:p-3 border border-white/10 h-full overflow-hidden shadow-2xl">
              {SLIDE_IMAGES.map((slide, index) => (
                <div 
                  key={index}
                  className={`absolute inset-1.5 md:inset-3 transition-all duration-1000 ease-in-out transform ${
                    index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <img 
                    src={slide.url} 
                    alt={slide.title}
                    className="w-full h-full object-cover rounded-[1.5rem]"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 z-10">
                    <p className="text-white text-[8px] font-bold uppercase tracking-widest">{slide.title}</p>
                  </div>
                </div>
              ))}
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
