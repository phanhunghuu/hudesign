
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, BookOpen, Send, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { COURSES, PRODUCTS } from '../constants';
import RegistrationForm from '../components/RegistrationForm';
import ProductModal from '../components/ProductModal';
import { Product } from '../types';

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const slides = [
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const firstItem = container.querySelector('.snap-start') as HTMLElement;
      if (firstItem) {
        // Chiều rộng thẻ + gap (24px là gap-6)
        const itemWidth = firstItem.offsetWidth + 24; 
        const currentScroll = container.scrollLeft;
        
        // Tính toán vị trí đích chính xác để tránh bị lệch snap
        let targetScroll = direction === 'left' 
          ? currentScroll - itemWidth 
          : currentScroll + itemWidth;

        // Cuộn mượt đến vị trí đích
        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollToRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] bg-gradient-hudesign flex items-center pt-8 md:pt-12 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10 py-8 md:py-12">
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="text-yellow-400">✨</span>
              <span className="text-white font-bold text-xs uppercase tracking-widest">Sáng tạo không giới hạn</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-black text-white leading-tight">
              Làm chủ công cụ, <br/><span className="text-indigo-400">sáng tạo dễ dàng.</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Hudesign cung cấp các tài nguyên thiết kế chuyên nghiệp và khóa học 1 kèm 1 giúp bạn biến ý tưởng thành những ấn phẩm marketing chuyên nghiệp.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button onClick={scrollToRegister} className="bg-white text-slate-900 font-black px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 hover:bg-slate-100 transition-all shadow-xl">
                <Send size={20} className="rotate-12" />
                <span>Đăng ký tư vấn ngay</span>
              </button>
              <Link to="/courses" className="bg-indigo-600 text-white font-black px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 hover:bg-indigo-700 transition-all shadow-xl">
                <BookOpen size={20} />
                <span>Khám phá khóa học</span>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative w-full max-w-md ml-auto">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3rem] shadow-2xl border-4 border-white/10 rotate-3 hover:rotate-0 transition-all duration-500">
                {slides.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`} 
                    alt="Hero Slide" 
                  />
                ))}
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 md:p-5 rounded-3xl shadow-2xl animate-bounce flex items-center space-x-3 border border-slate-100 z-50">
                <div className="bg-indigo-100 p-2 md:p-3 rounded-2xl">
                  <Sparkles className="text-indigo-600 w-5 h-5 md:w-6 md:h-6" />
                </div>
                <p className="text-slate-900 font-black text-xs md:text-sm leading-tight">Cam kết kèm<br/>1-1 tận tâm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
          <div className="space-y-1">
            <h2 className="text-indigo-600 font-black text-xs uppercase tracking-widest">Store nổi bật</h2>
            <p className="text-2xl md:text-4xl font-black text-slate-900">Tài nguyên bán chạy</p>
          </div>
          <Link to="/shop" className="text-indigo-600 font-black text-sm hover:underline flex items-center space-x-2">
            <span>Tất cả sản phẩm</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative group/slider">
          <button 
            onClick={() => handleScroll('left')}
            className="absolute left-0 md:-left-8 top-[40%] -translate-y-1/2 z-30 p-4 rounded-full bg-white border border-slate-100 text-slate-900 hover:bg-indigo-600 hover:text-white shadow-2xl transition-all active:scale-90 opacity-0 group-hover/slider:opacity-100 hidden md:flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={() => handleScroll('right')}
            className="absolute right-0 md:-right-8 top-[40%] -translate-y-1/2 z-30 p-4 rounded-full bg-white border border-slate-100 text-slate-900 hover:bg-indigo-600 hover:text-white shadow-2xl transition-all active:scale-90 opacity-0 group-hover/slider:opacity-100 hidden md:flex items-center justify-center cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex space-x-4 md:space-x-6 overflow-x-auto no-scrollbar pb-10 pt-2 snap-x snap-mandatory scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch', scrollSnapStop: 'always', scrollPaddingLeft: '1rem' }}
          >
            {PRODUCTS.slice(0, 10).map((product) => (
              <div 
                key={product.id} 
                className="min-w-[280px] md:min-w-[320px] snap-start group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500"
              >
                <div 
                  className="aspect-square relative overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-6 md:p-8 space-y-4">
                  <h3 
                    className="text-base md:text-lg font-black text-slate-900 leading-snug h-[3.2rem] md:h-[3.6rem] line-clamp-2 group-hover:text-indigo-600 transition-colors cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center pt-2">
                    <p className="text-xl md:text-2xl font-black text-indigo-600">
                      {product.price.toLocaleString('vi-VN')} đ
                    </p>
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="bg-slate-900 text-white p-3 rounded-xl hover:bg-indigo-600 transition-all shadow-lg active:scale-90"
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center md:hidden space-x-8 -mt-4 mb-4">
            <button onClick={() => handleScroll('left')} className="p-4 bg-white border border-slate-100 rounded-full shadow-lg active:scale-90"><ChevronLeft size={24}/></button>
            <button onClick={() => handleScroll('right')} className="p-4 bg-white border border-slate-100 rounded-full shadow-lg active:scale-90"><ChevronRight size={24}/></button>
          </div>
        </div>
      </section>

      {/* Top Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-indigo-600 font-black text-sm uppercase tracking-widest">Học viện Hudesign</h2>
          <p className="text-3xl md:text-5xl font-black text-slate-900 uppercase">Khám phá các khoá học tại Hudesign</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.map((course) => {
            const cardColorClass = getCourseStyle(course.id);
            const iconBgClass = getIconBg(course.id);
            
            return (
              <div key={course.id} className={`${cardColorClass} rounded-[2.5rem] p-8 border transition-all group flex flex-col justify-between h-full shadow-sm hover:shadow-xl`}>
                <div className="space-y-6">
                  <div className={`${iconBgClass} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg text-white transition-transform group-hover:scale-110`}>
                    <BookOpen size={28} />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">{course.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-3">{course.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {course.suitableFor.slice(0, 1).map((s, i) => (
                      <span key={i} className="bg-white/60 text-[9px] font-black px-2.5 py-1 rounded-full uppercase border border-white/50">{s}</span>
                    ))}
                  </div>
                </div>
                <Link to="/courses" className="mt-8 flex items-center space-x-2 font-black text-xs uppercase tracking-wider hover:translate-x-1 transition-transform">
                  <span>Xem lộ trình</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-slate-900 py-20 text-white overflow-hidden relative border-y border-white/5">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Học viên', value: '1,200+' },
            { label: 'Dự án hoàn thành', value: '500+' },
            { label: 'Tài nguyên', value: '2,000+' },
            { label: 'Đánh giá 5 sao', value: '98%' },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <p className="text-4xl md:text-6xl font-black text-indigo-400">{stat.value}</p>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-indigo-600 rounded-[3rem] p-10 md:p-20 text-white text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase">Nhận quà tặng miễn phí</h2>
            <p className="text-indigo-100 text-lg max-w-xl mx-auto font-medium">Đăng ký nhận bộ Template Canva và Ebook thiết kế miễn phí qua email của bạn.</p>
          </div>
          <form className="relative z-10 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="Email của bạn..." className="flex-grow px-6 py-4 rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-white/20 transition-all outline-none" required />
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center space-x-2 hover:bg-slate-800 transition-all">
              <span>Nhận ngay</span>
              <Send size={18} />
            </button>
          </form>
        </div>
      </section>

      <section id="register" className="scroll-mt-32 pb-24">
        <RegistrationForm />
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
