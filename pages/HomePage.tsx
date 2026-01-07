
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, BookOpen, Send, Sparkles, ChevronLeft, ChevronRight, Flame, LayoutGrid, Loader2, CheckCircle } from 'lucide-react';
import { COURSES, PRODUCTS } from '../constants';
import ProductModal from '../components/ProductModal';
import { Product } from '../types';

// === THÔNG TIN TELEGRAM CỦA BẠN ===
const TELEGRAM_BOT_TOKEN = "7496763782:AAFOYZzRsBNgCLpdDlJWXMUBwmKwtzCXQBI"; 
const TELEGRAM_CHAT_ID = "308222651"; 
// ===================================================

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [slidesLoaded, setSlidesLoaded] = useState<boolean[]>(new Array(4).fill(false));
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const slides = [
    "https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767365595/hinh-slide-3_p0en0b.png",
    "https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767365606/hinh-slide-4_o6jjir.png",
    "https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767365595/hinh-slide-1_wdo08s.png",
    "https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767365594/hinh-slide-2_a6n4cq.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSending(true);
    const message = `🎁 *KHÁCH ĐĂNG KÝ NHẬN QUÀ TẶNG*\n\n📧 *Email:* ${newsletterEmail}\n📅 *Thời gian:* ${new Date().toLocaleString('vi-VN')}\n📍 *Nguồn:* Website Newsletter Section`;

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
        setIsSuccess(true);
        setNewsletterEmail('');
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Newsletter error:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const firstItem = container.querySelector('.snap-start') as HTMLElement;
      if (firstItem) {
        const itemWidth = firstItem.offsetWidth + 16; 
        const currentScroll = container.scrollLeft;
        let targetScroll = direction === 'left' ? currentScroll - itemWidth : currentScroll + itemWidth;
        container.scrollTo({ left: targetScroll, behavior: 'smooth' });
      }
    }
  };

  const getCourseStyle = (id: string) => {
    switch (id) {
      case 'marketing-offline': return 'bg-indigo-50 border-indigo-100 hover:border-indigo-300 text-indigo-600';
      case 'marketing-online': return 'bg-blue-50 border-blue-100 hover:border-blue-300 text-blue-600';
      case 'photography-offline': return 'bg-orange-50 border-orange-100 hover:border-orange-300 text-orange-600';
      case 'canva-marketing': return 'bg-cyan-50 border-cyan-100 hover:border-cyan-300 text-cyan-600';
      default: return 'bg-slate-50 border-slate-100 text-slate-600';
    }
  };

  const getIconBg = (id: string) => {
    switch (id) {
      case 'marketing-offline': return 'bg-indigo-600';
      case 'marketing-online': return 'bg-blue-600';
      case 'photography-offline': return 'bg-orange-600';
      case 'canva-marketing': return 'bg-cyan-600';
      default: return 'bg-slate-900';
    }
  };

  const setSlideLoaded = (index: number) => {
    setSlidesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <div className="space-y-12 md:space-y-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] bg-gradient-hudesign flex items-center pt-8 md:pt-12 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10 py-8 md:py-12">
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="text-yellow-400">✨</span>
              <span className="text-white font-heading font-black text-xs uppercase tracking-widest">Sáng tạo không giới hạn</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1]">
              Làm chủ công cụ, <br/><span className="text-indigo-400">sáng tạo dễ dàng.</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-lg mx-auto md:mx-0 leading-relaxed font-thin">
              Hudesign cung cấp các tài nguyên thiết kế chuyên nghiệp và khóa học 1 kèm 1 giúp bạn biến ý tưởng thành những ấn phẩm marketing chuyên nghiệp.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 md:gap-4 flex-wrap">
              <Link to="/register" className="bg-white text-slate-900 font-black px-6 md:px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 hover:bg-slate-100 transition-all shadow-xl text-sm md:text-base">
                <Send size={18} className="rotate-12" />
                <span>Đăng ký tư vấn ngay</span>
              </Link>
              <Link to="/courses" className="bg-indigo-600 text-white font-black px-6 md:px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 hover:bg-indigo-700 transition-all shadow-xl text-sm md:text-base">
                <BookOpen size={18} />
                <span>Khám phá khóa học</span>
              </Link>
              <Link to="/shop" className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-black px-6 md:px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 hover:bg-white/20 transition-all shadow-xl text-sm md:text-base">
                <ShoppingBag size={18} className="text-indigo-400" />
                <span>Kho tài nguyên</span>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative w-full max-w-md ml-auto">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3rem] shadow-2xl border-4 border-white/10 rotate-3 hover:rotate-0 transition-all duration-500 bg-slate-800">
                {slides.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img} 
                    onLoad={() => setSlideLoaded(idx)}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentSlide && slidesLoaded[idx] ? 'opacity-100' : 'opacity-0'}`} 
                    alt="Hero Slide" 
                  />
                ))}
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 md:p-5 rounded-3xl shadow-2xl animate-bounce flex items-center space-x-3 border border-slate-100 z-50">
                <div className="bg-indigo-100 p-2 md:p-3 rounded-2xl">
                  <Sparkles className="text-indigo-600 w-5 h-5 md:w-6 md:h-6" />
                </div>
                <p className="text-slate-900 font-heading font-black text-xs md:text-sm leading-tight">Cam kết kèm<br/>1-1 tận tâm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 gap-3">
          <div className="space-y-1">
            <h2 className="text-indigo-600 font-black text-[10px] uppercase tracking-widest">Store nổi bật</h2>
            <p className="text-xl md:text-3xl font-black text-slate-900">Tài nguyên bán chạy</p>
          </div>
          <Link to="/shop" className="text-indigo-600 font-black text-xs hover:underline flex items-center space-x-1">
            <span>Tất cả sản phẩm</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="relative group/slider">
          <button 
            onClick={() => handleScroll('left')}
            className="absolute left-0 md:-left-6 top-[35%] -translate-y-1/2 z-30 p-3 rounded-full bg-white border border-slate-100 text-slate-900 hover:bg-indigo-600 hover:text-white shadow-xl transition-all active:scale-90 opacity-0 group-hover/slider:opacity-100 hidden md:flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={() => handleScroll('right')}
            className="absolute right-0 md:-right-6 top-[35%] -translate-y-1/2 z-30 p-3 rounded-full bg-white border border-slate-100 text-slate-900 hover:bg-indigo-600 hover:text-white shadow-xl transition-all active:scale-90 opacity-0 group-hover/slider:opacity-100 hidden md:flex items-center justify-center cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto no-scrollbar pb-6 pt-1 snap-x snap-mandatory scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch', scrollSnapStop: 'always' }}
          >
            {PRODUCTS.slice(0, 10).map((product) => (
              <div 
                key={product.id} 
                className="min-w-[180px] md:min-w-[240px] snap-start group bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-500"
              >
                <div 
                  className="aspect-[4/3] relative overflow-hidden cursor-pointer bg-slate-100"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img 
                    src={product.image} 
                    loading="lazy"
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-wider shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-4 md:p-5 space-y-3">
                  <h3 
                    className="text-xs md:text-sm font-black text-slate-900 leading-snug h-[2.4rem] md:h-[2.8rem] line-clamp-2 group-hover:text-indigo-600 transition-colors cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center pt-1">
                    <p className="text-sm md:text-lg font-black text-indigo-600">
                      {product.price.toLocaleString('vi-VN')} đ
                    </p>
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="bg-slate-900 text-white p-2 rounded-lg hover:bg-indigo-600 transition-all shadow-md active:scale-90"
                    >
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16 space-y-3">
          <h2 className="text-indigo-600 font-black text-[10px] md:text-xs uppercase tracking-widest">Học viện Hudesign</h2>
          <p className="text-2xl md:text-5xl font-black text-slate-900">Khám phá các khoá học</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.map((course) => {
            const cardColorClass = getCourseStyle(course.id);
            const iconBgClass = getIconBg(course.id);
            const isCustom = course.id === 'custom-path';
            
            return (
              <div key={course.id} className={`${cardColorClass} rounded-[2.5rem] p-8 border transition-all group flex flex-col justify-between h-full shadow-sm hover:shadow-xl relative overflow-hidden`}>
                {course.isHot && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-red-500 text-white text-[10px] font-black py-1 px-8 rotate-45 translate-x-[25px] translate-y-[10px] shadow-sm flex items-center justify-center space-x-1">
                      <Flame size={10} fill="currentColor" />
                      <span>HOT</span>
                    </div>
                  </div>
                )}
                <div className="space-y-6">
                  <div className={`${iconBgClass} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg text-white transition-transform group-hover:scale-110`}>
                    <BookOpen size={28} />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">{course.title}</h3>
                  {/* CHỈNH font-thin Ở ĐÂY */}
                  <p className="text-slate-500 text-sm font-thin leading-relaxed line-clamp-3">{course.description}</p>
                  
                  {!isCustom && (
                    <div className="pt-2 space-y-0">
                      <p className="text-[11px] font-black text-slate-400 line-through decoration-red-500/50">{course.originalPrice}</p>
                      <p className="text-2xl font-black text-slate-900">{course.discountPrice}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {course.suitableFor.slice(0, 1).map((s, i) => (
                      <span key={i} className="bg-white/60 text-[9px] font-thin px-2.5 py-1 rounded-full uppercase border border-white/50">{s}</span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link 
                    to={isCustom ? "/custom-path" : `/courses/${course.id}`} 
                    className="inline-flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg hover:bg-indigo-700 transition-all duration-300 w-full active:scale-95"
                  >
                    <span>{isCustom ? 'Xây lộ trình AI' : 'Chi tiết khóa học'}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 py-16 md:py-20 text-white overflow-hidden relative border-y border-white/5">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Học viên', value: '1,200+' },
            { label: 'Dự án hoàn thành', value: '500+' },
            { label: 'Tài nguyên', value: '2,000+' },
            { label: 'Đánh giá 5 sao', value: '98%' },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <p className="text-3xl md:text-6xl font-black text-indigo-400">{stat.value}</p>
              <p className="text-slate-400 font-black text-[10px] md:text-sm uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-indigo-600 rounded-[3rem] p-10 md:p-20 text-white text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase">Nhận quà tặng miễn phí</h2>
            <p className="text-indigo-100 text-lg max-w-xl mx-auto font-heading font-black">Đăng ký nhận bộ Template Canva và Ebook thiết kế miễn phí qua email của bạn.</p>
          </div>
          
          {isSuccess ? (
            <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 animate-in zoom-in max-w-md mx-auto">
               <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-white" />
               </div>
               <p className="font-black text-white">Xác nhận thành công!</p>
               <p className="text-indigo-100 text-sm mt-1">Hủ sẽ gửi quà vào email của bạn sớm thôi nhé.</p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="relative z-10 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Email của bạn..." 
                className="flex-grow px-6 py-4 rounded-2xl text-slate-900 font-black font-medium focus:ring-4 focus:ring-white/20 transition-all outline-none" 
                required 
              />
              <button 
                disabled={isSending}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center space-x-2 hover:bg-slate-800 transition-all uppercase text-sm tracking-widest shadow-xl disabled:opacity-50"
              >
                {isSending ? <Loader2 className="animate-spin" /> : (
                  <>
                    <span>Nhận ngay</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section id="register" className="scroll-mt-32 pb-24">
        <Link 
          to="/register"
          className="block max-w-md mx-auto bg-slate-900 text-white text-center py-6 rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-indigo-600 transition-all active:scale-95 uppercase tracking-widest"
        >
          ĐĂNG KÝ NGAY TẠI ĐÂY
        </Link>
      </section>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default HomePage;
