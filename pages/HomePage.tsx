
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, BookOpen, Send, Sparkles, ChevronLeft, ChevronRight, Flame, LayoutGrid, Loader2, CheckCircle, PenTool, Layout, FileText, MousePointer2, User, Phone, Mail, HelpCircle, MessageSquare } from 'lucide-react';
import { COURSES } from '../constants';
import { PRODUCTS } from '../products';
import ProductModal from '../components/ProductModal';
import { Product } from '../types';

// === THÔNG TIN TELEGRAM CỦA BẠN ===
const TELEGRAM_BOT_TOKEN = "7496763782:AAFOYZzRsBNgCLpdDlJWXMUBwmKwtzCXQBI"; 
const TELEGRAM_CHAT_ID = "308222651"; 
// ===================================================

const DESIGN_SERVICES = [
  { id: 'logo', title: 'Thiết kế Logo', icon: <PenTool />, desc: 'Tạo bộ nhận diện cốt lõi.' },
  { id: 'branding', title: 'Branding Kit', icon: <Layout />, desc: 'Bộ nhận diện chuyên nghiệp.' },
  { id: 'social', title: 'Social Media', icon: <Sparkles />, desc: 'Banner FB, Ads, TikTok.' },
  { id: 'print', title: 'Ấn phẩm in ấn', icon: <FileText />, desc: 'Menu, Flyer, Standee.' }
];

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Refs cho slider
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Slider Tài nguyên
  const courseScrollRef = useRef<HTMLDivElement>(null);    // Slider Khóa học
  
  const [slidesLoaded, setSlidesLoaded] = useState<boolean[]>(new Array(4).fill(false));
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Consultation Form State
  const [consultName, setConsultName] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultEmail, setConsultEmail] = useState('');
  const [consultType, setConsultType] = useState('Tư vấn Khóa học');
  const [isConsultSending, setIsConsultSending] = useState(false);
  const [isConsultSuccess, setIsConsultSuccess] = useState(false);

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

  // Xử lý đăng ký nhận quà (Newsletter)
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSending(true);
    const message = `🎁 *KHÁCH ĐĂNG KÝ NHẬN QUÀ TẶNG*\n\n📧 *Email:* ${newsletterEmail}\n📅 *Thời gian:* ${new Date().toLocaleString('vi-VN')}\n📍 *Nguồn:* Website Newsletter Section`;

    try {
      await sendTelegramMessage(message);
      setIsSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Newsletter error:", error);
    } finally {
      setIsSending(false);
    }
  };

  // Xử lý form tư vấn
  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName || !consultPhone) return;

    setIsConsultSending(true);
    const message = `🙋 *YÊU CẦU TƯ VẤN MỚI*\n\n👤 *Tên:* ${consultName}\n📞 *SĐT:* ${consultPhone}\n📧 *Email:* ${consultEmail || 'Không nhập'}\n🔖 *Loại tư vấn:* ${consultType}\n📅 *Thời gian:* ${new Date().toLocaleString('vi-VN')}`;

    try {
      await sendTelegramMessage(message);
      setIsConsultSuccess(true);
      setConsultName('');
      setConsultPhone('');
      setConsultEmail('');
      setConsultType('Tư vấn Khóa học');
      setTimeout(() => setIsConsultSuccess(false), 5000);
    } catch (error) {
      console.error("Consultation error:", error);
    } finally {
      setIsConsultSending(false);
    }
  };

  const sendTelegramMessage = async (text: string) => {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'Markdown'
      })
    });
  };

  // Hàm xử lý cuộn chung
  const handleScroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    const container = ref.current;
    if (container) {
      const firstItem = container.querySelector('.snap-start') as HTMLElement;
      if (firstItem) {
        const itemWidth = firstItem.offsetWidth + 24; // 24 is gap-6
        const currentScroll = container.scrollLeft;
        let targetScroll = direction === 'left' ? currentScroll - itemWidth : currentScroll + itemWidth;
        container.scrollTo({ left: targetScroll, behavior: 'smooth' });
      }
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
      <section className="relative min-h-[85vh] bg-gradient-hudesign flex items-center pt-8 md:pt-12 overflow-hidden text-white">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10 py-8 md:py-12">
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="text-yellow-400">✨</span>
              <span className="text-white font-heading font-black text-xs uppercase tracking-widest">Sáng tạo không giới hạn</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">
              Làm chủ công cụ, <br/><span className="text-indigo-400">sáng tạo dễ dàng.</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-lg mx-auto md:mx-0 leading-relaxed font-thin">
              Hudesign cung cấp các tài nguyên thiết kế chuyên nghiệp và khóa học 1 kèm 1 giúp bạn biến ý tưởng thành những ấn phẩm marketing chuyên nghiệp.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 md:gap-4 flex-wrap">
              <Link to="/register" className="bg-white text-slate-900 font-black px-6 md:px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 hover:bg-slate-100 transition-all shadow-xl text-sm md:text-base">
                <Send size={18} className="rotate-12" />
                <span>Tư vấn khóa học</span>
              </Link>
              <Link to="/design-brief" className="bg-purple-600 text-white font-black px-6 md:px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 hover:bg-purple-700 transition-all shadow-xl text-sm md:text-base">
                <PenTool size={18} />
                <span>Book thiết kế</span>
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
                <p className="text-slate-900 font-heading font-black text-xs md:text-sm leading-tight uppercase">Cam kết kèm<br/>1-1 tận tâm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 border border-slate-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
            <div className="w-full lg:w-1/3 space-y-4 md:space-y-6 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mx-auto md:mx-0">
                 <MousePointer2 size={10} />
                 <span>Design Services</span>
              </div>
              <h2 className="text-2xl md:text-5xl font-black text-slate-900 leading-tight">Bạn bận rộn?<br/><span className="text-indigo-600">Hủ Thiết Kế Giúp Bạn!</span></h2>
              <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed max-w-sm mx-auto md:mx-0">Thuê Hủ thực hiện các ấn phẩm chuyên nghiệp cho dự án của mình nhanh chóng.</p>
              <div className="pt-2 md:pt-4">
                <Link to="/design-brief" className="group inline-flex items-center space-x-3 text-indigo-600 font-black uppercase tracking-widest text-[10px] md:text-sm">
                   <span>Yêu cầu ngay</span>
                   <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="w-full lg:w-2/3 grid grid-cols-2 gap-3 md:gap-6">
              {DESIGN_SERVICES.map((service) => (
                <Link 
                  key={service.id}
                  to={`/design-brief?service=${service.id}`}
                  className="bg-slate-50 border border-slate-100 rounded-3xl p-4 md:p-8 transition-all hover:bg-white hover:shadow-2xl hover:border-indigo-100 hover:-translate-y-1 group flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100 mb-3 md:mb-6 transition-all group-hover:bg-indigo-600 group-hover:text-white">
                    {React.cloneElement(service.icon as React.ReactElement<any>, { size: 20 })}
                  </div>
                  <h3 className="text-[11px] md:text-xl font-black text-slate-900 md:mb-2">{service.title}</h3>
                  <p className="hidden md:block text-slate-500 text-xs font-medium leading-relaxed">{service.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section (Slider) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 gap-3">
          <div className="space-y-1">
            <h2 className="text-indigo-600 font-black text-[10px] uppercase tracking-widest">Store nổi bật</h2>
            <p className="text-xl md:text-3xl font-black text-slate-900 font-heading">Tài nguyên bán chạy</p>
          </div>
          <Link to="/shop" className="text-indigo-600 font-black text-xs hover:underline flex items-center space-x-1">
            <span>Tất cả sản phẩm</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="relative group/slider">
          <button 
            onClick={() => handleScroll(scrollContainerRef, 'left')}
            className="absolute left-0 md:-left-6 top-[35%] -translate-y-1/2 z-30 p-3 rounded-full bg-white border border-slate-100 text-slate-900 hover:bg-indigo-600 hover:text-white shadow-xl transition-all active:scale-90 opacity-0 group-hover/slider:opacity-100 hidden md:flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={() => handleScroll(scrollContainerRef, 'right')}
            className="absolute right-0 md:-right-6 top-[35%] -translate-y-1/2 z-30 p-3 rounded-full bg-white border border-slate-100 text-slate-900 hover:bg-indigo-600 hover:text-white shadow-xl transition-all active:scale-90 opacity-0 group-hover/slider:opacity-100 hidden md:flex items-center justify-center cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto no-scrollbar pb-8 pt-2 snap-x snap-mandatory scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch', scrollSnapStop: 'always' }}
          >
            {PRODUCTS.slice(0, 10).map((product) => (
              <div 
                key={product.id} 
                className="min-w-[260px] md:min-w-[340px] snap-start group bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-500"
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
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-5 md:p-6 space-y-4">
                  <h3 
                    className="text-sm md:text-lg font-black text-slate-900 leading-tight h-[2.8rem] md:h-[3.5rem] line-clamp-2 group-hover:text-indigo-600 transition-colors cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center pt-1">
                    <p className="text-base md:text-xl font-black text-indigo-600">
                      {product.price.toLocaleString('vi-VN')} đ
                    </p>
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="bg-slate-900 text-white p-3 rounded-xl hover:bg-indigo-600 transition-all shadow-md active:scale-90"
                    >
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section (SLIDER MODE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10 md:mb-16 space-y-3">
          <h2 className="text-indigo-600 font-black text-[10px] md:text-xs uppercase tracking-widest">Học viện Hudesign</h2>
          <p className="text-2xl md:text-5xl font-black text-slate-900 font-heading">Khám phá các khoá học</p>
        </div>

        <div className="relative group/course-slider">
           <button 
            onClick={() => handleScroll(courseScrollRef, 'left')}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white border border-slate-100 text-slate-900 hover:bg-indigo-600 hover:text-white shadow-xl transition-all active:scale-90 opacity-0 group-hover/course-slider:opacity-100 hidden md:flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={() => handleScroll(courseScrollRef, 'right')}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white border border-slate-100 text-slate-900 hover:bg-indigo-600 hover:text-white shadow-xl transition-all active:scale-90 opacity-0 group-hover/course-slider:opacity-100 hidden md:flex items-center justify-center cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>

          <div 
            ref={courseScrollRef}
            className="flex space-x-6 overflow-x-auto no-scrollbar pb-10 pt-4 snap-x snap-mandatory scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch', scrollSnapStop: 'always' }}
          >
            {COURSES.map((course) => (
              <div 
                key={course.id} 
                className="min-w-[300px] md:min-w-[350px] snap-start flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 group h-full"
              >
                {/* 1. IMAGE SECTION - Tỉ lệ 2:1 - Clickable */}
                <Link 
                  to={course.id === 'custom-path' ? "/custom-path" : `/courses/${course.id}`}
                  className="relative aspect-[2/1] overflow-hidden bg-slate-100 block cursor-pointer"
                >
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60"></div>
                  
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shadow-sm ${course.type === 'ONLINE' ? 'bg-green-500 text-white' : 'bg-white text-indigo-700'}`}>
                      {course.type}
                    </span>
                  </div>

                  {course.isHot && (
                    <div className="absolute top-3 left-0">
                      <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-r-md uppercase tracking-widest shadow-md flex items-center gap-1">
                        <Flame size={10} fill="currentColor" /> HOT
                      </span>
                    </div>
                  )}
                </Link>

                {/* 2. BODY SECTION */}
                <div className="p-6 flex-grow flex flex-col">
                  
                  {/* Tên Khóa Học - Clickable */}
                  <Link to={course.id === 'custom-path' ? "/custom-path" : `/courses/${course.id}`} className="block mb-2">
                    <h3 className="text-lg md:text-2xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[3rem] md:min-h-[3.5rem]">
                      {course.title}
                    </h3>
                  </Link>

                  {/* Giới thiệu ngắn */}
                  <p className="text-slate-500 text-xs font-medium line-clamp-2 leading-relaxed mb-4">
                    {course.description}
                  </p>

                  {/* Info Wrapper - Chỉ hiển thị Tag */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {course.suitableFor.slice(0, 3).map((item, idx) => (
                        <span key={idx} className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-600">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Đường kẻ & Giá */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex flex-col">
                          {course.id !== 'custom-path' && (
                            <span className="text-xs text-slate-400 line-through decoration-slate-300 font-medium mb-0.5">{course.originalPrice}</span>
                          )}
                          <span className="text-2xl font-black text-indigo-600 tracking-tight leading-none">{course.discountPrice}</span>
                      </div>
                  </div>

                </div>

                {/* 3. FOOTER ACTION BUTTON */}
                <Link 
                  to={course.id === 'custom-path' ? "/custom-path" : `/courses/${course.id}`}
                  className={`py-4 px-6 text-center text-white font-bold text-xs transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden ${course.id === 'custom-path' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-slate-900 hover:bg-indigo-600'}`}
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                  
                  <span className="relative z-10 uppercase tracking-widest">
                    {course.id === 'custom-path' ? 'Thiết kế lộ trình' : 'Đăng ký ngay'}
                  </span>
                  <ArrowRight size={14} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
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
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase font-heading">Nhận quà tặng miễn phí</h2>
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

      {/* Consultation Form Section (NEW) */}
      <section id="consultation" className="max-w-3xl mx-auto px-4 pb-24 scroll-mt-32">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-10 space-y-2">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">Bạn cần tư vấn?</h2>
              <p className="text-slate-500 font-medium">Để lại thông tin, Hủ sẽ liên hệ hỗ trợ bạn sớm nhất.</p>
            </div>

            {isConsultSuccess ? (
              <div className="text-center py-12 space-y-6 animate-in zoom-in">
                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle size={40} className="text-green-600" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-slate-900">Đã gửi yêu cầu!</h3>
                    <p className="text-slate-500 mt-2 font-medium text-sm">Cảm ơn bạn, Hủ sẽ gọi lại ngay.</p>
                 </div>
              </div>
            ) : (
              <form onSubmit={handleConsultationSubmit} className="space-y-5">
                 <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1"><User size={12} /> Họ tên</label>
                       <input 
                         required 
                         type="text" 
                         value={consultName}
                         onChange={(e) => setConsultName(e.target.value)}
                         placeholder="Nguyễn Văn A" 
                         className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm outline-none transition-all" 
                       />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1"><Phone size={12} /> Số điện thoại</label>
                       <input 
                         required 
                         type="tel" 
                         value={consultPhone}
                         onChange={(e) => setConsultPhone(e.target.value)}
                         placeholder="09xxx..." 
                         className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm outline-none transition-all" 
                       />
                    </div>
                 </div>

                 <div className="space-y-1.5">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1"><Mail size={12} /> Email (Không bắt buộc)</label>
                     <input 
                       type="email" 
                       value={consultEmail}
                       onChange={(e) => setConsultEmail(e.target.value)}
                       placeholder="example@gmail.com" 
                       className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm outline-none transition-all" 
                     />
                 </div>

                 <div className="space-y-1.5">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1"><HelpCircle size={12} /> Vấn đề cần tư vấn</label>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['Tư vấn Khóa học', 'Mua tài nguyên', 'Book thiết kế'].map((type) => (
                           <button
                             key={type}
                             type="button"
                             onClick={() => setConsultType(type)}
                             className={`px-4 py-3 rounded-xl text-xs font-black transition-all border-2 ${consultType === type ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                           >
                             {type}
                           </button>
                        ))}
                     </div>
                 </div>

                 <button 
                   disabled={isConsultSending}
                   type="submit" 
                   className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                 >
                   {isConsultSending ? <Loader2 className="animate-spin" size={18} /> : <MessageSquare size={18} />}
                   <span>{isConsultSending ? 'Đang gửi...' : 'Gửi yêu cầu ngay'}</span>
                 </button>
              </form>
            )}
          </div>
        </div>
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
