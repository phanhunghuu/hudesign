
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShoppingBag, BookOpen, Send, Sparkles, ChevronLeft, ChevronRight, 
  Flame, Loader2, CheckCircle, PenTool, Layout, FileText, MousePointer2, 
  User, Phone, Mail, HelpCircle, MessageSquare, Download 
} from 'lucide-react';
import { COURSES } from '../constants';
import { PRODUCTS } from '../products';
import ProductModal from '../components/ProductModal';
import { Product } from '../types';

// === THÔNG TIN TELEGRAM ===
const TELEGRAM_BOT_TOKEN = "7496763782:AAFOYZzRsBNgCLpdDlJWXMUBwmKwtzCXQBI"; 
const TELEGRAM_CHAT_ID = "308222651"; 
// ===================================================

const DESIGN_SERVICES = [
  { id: 'logo', title: 'Thiết kế Logo', icon: <PenTool />, desc: 'Tạo bộ nhận diện cốt lõi.' },
  { id: 'branding', title: 'Branding Kit', icon: <Layout />, desc: 'Bộ nhận diện chuyên nghiệp.' },
  { id: 'social', title: 'Social Media', icon: <Sparkles />, desc: 'Banner FB, Ads, TikTok.' },
  { id: 'print', title: 'Ấn phẩm in ấn', icon: <FileText />, desc: 'Menu, Flyer, Standee.' }
];

// Component tạo hiệu ứng Fade-in khi cuộn tới
const FadeInSection: React.FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Refs cho slider
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const courseScrollRef = useRef<HTMLDivElement>(null);
  
  // Newsletter & Form state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [consultName, setConsultName] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultEmail, setConsultEmail] = useState('');
  const [consultType, setConsultType] = useState('Tư vấn Khóa học');
  const [isConsultSending, setIsConsultSending] = useState(false);
  const [isConsultSuccess, setIsConsultSuccess] = useState(false);

  // Banner Slides (Nên dùng ảnh khổ ngang 2000x574px)
  const slides = [
    "https://images.unsplash.com/photo-1626785774573-4b799314348d?auto=format&fit=crop&q=80&w=2000&h=574", // Abstract Gradient
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2000&h=574", // Creative Workspace
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000&h=574", // Minimal Desk
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSending(true);
    const message = `🎁 *KHÁCH ĐĂNG KÝ NHẬN QUÀ*\n📧: ${newsletterEmail}`;
    try {
      await sendTelegramMessage(message);
      setIsSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) { console.error(error); } finally { setIsSending(false); }
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName || !consultPhone) return;
    setIsConsultSending(true);
    const message = `🙋 *TƯ VẤN MỚI*\n👤: ${consultName}\n📞: ${consultPhone}\n📧: ${consultEmail}\n🔖: ${consultType}`;
    try {
      await sendTelegramMessage(message);
      setIsConsultSuccess(true);
      setConsultName(''); setConsultPhone(''); setConsultEmail('');
      setTimeout(() => setIsConsultSuccess(false), 5000);
    } catch (error) { console.error(error); } finally { setIsConsultSending(false); }
  };

  const sendTelegramMessage = async (text: string) => {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: text, parse_mode: 'Markdown' })
    });
  };

  const handleScroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    const container = ref.current;
    if (container) {
      const scrollAmount = container.offsetWidth * 0.8;
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 1. TOP NAVIGATION BLOCKS & BANNER */}
      <div className="pt-20 md:pt-24 pb-12 bg-white">
        
        {/* Wide Banner Slider (FULL WIDTH - KHÔNG BO GÓC) */}
        {/* Đã di chuyển ra khỏi container max-w-7xl để tràn màn hình */}
        <FadeInSection>
          <div className="relative w-full aspect-[2000/574] md:aspect-[3.5/1] overflow-hidden bg-slate-100 mb-8">
            {slides.map((img, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={img} alt="Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none"></div>
              </div>
            ))}
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white'}`}
                />
              ))}
            </div>
          </div>
        </FadeInSection>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* 4 Nút Tối Giản (CHỈNH SỬA: NỀN ICON ĐẬM, ICON TRẮNG, GỌN HƠN) */}
          <FadeInSection delay={100}>
            <div className="grid grid-cols-4 gap-2 md:gap-6">
              {[
                { label: 'KHÓA HỌC', link: '/courses', icon: <BookOpen /> },
                { label: 'BOOK THIẾT KẾ', link: '/design-brief', icon: <PenTool /> },
                { label: 'AI STUDIO', link: '/ai-studio', icon: <Sparkles /> },
                { label: 'TÀI NGUYÊN', link: '/shop', icon: <ShoppingBag /> },
              ].map((item, idx) => (
                <Link 
                  key={idx} 
                  to={item.link}
                  className="flex flex-col md:flex-row items-center justify-center py-3 md:py-4 bg-white border border-slate-200 rounded-xl md:rounded-2xl hover:border-indigo-600 hover:shadow-lg transition-all group gap-1.5 md:gap-3"
                >
                  {/* ICON: Nền đậm, icon trắng */}
                  <div className="p-2 md:p-2.5 bg-slate-900 rounded-xl text-white group-hover:bg-indigo-600 transition-colors shrink-0 shadow-sm">
                    {React.cloneElement(item.icon as React.ReactElement<any>, { size: window.innerWidth < 768 ? 18 : 20 })}
                  </div>
                  {/* TEXT */}
                  <span className="font-black text-[10px] sm:text-[11px] md:text-sm tracking-wide uppercase text-slate-800 group-hover:text-indigo-600 text-center md:text-left leading-tight">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </FadeInSection>

          {/* Hero Text */}
          <FadeInSection delay={200}>
            <div className="text-center max-w-3xl mx-auto space-y-6 pt-4">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
                Làm chủ công cụ, <br/>
                <span className="text-indigo-600">sáng tạo dễ dàng.</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Hudesign cung cấp các tài nguyên thiết kế chuyên nghiệp và khóa học 1 kèm 1 giúp bạn biến ý tưởng thành những ấn phẩm marketing thu hút.
              </p>
              <div className="pt-2">
                 <Link to="/register" className="inline-flex items-center space-x-2 text-indigo-600 font-black text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                    <span>Nhận tư vấn lộ trình</span>
                    <ArrowRight size={16} />
                 </Link>
              </div>
            </div>
          </FadeInSection>

        </div>
      </div>

      <div className="space-y-24 pb-24">
        
        {/* Featured Services Section - GIẢM BO GÓC */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <FadeInSection>
            <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-8 md:p-16 border border-slate-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                <div className="w-full lg:w-1/3 space-y-6 text-center md:text-left">
                  <div className="inline-flex items-center space-x-2 bg-slate-100 text-slate-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mx-auto md:mx-0">
                     <MousePointer2 size={12} />
                     <span>Design Services</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">Bạn bận rộn?<br/><span className="text-indigo-600">Hủ Thiết Kế Giúp Bạn!</span></h2>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">Thuê Hủ thực hiện các ấn phẩm chuyên nghiệp cho dự án của mình nhanh chóng.</p>
                  <Link to="/design-brief" className="inline-flex bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95 items-center gap-2">
                     <span>Yêu cầu ngay</span>
                     <ArrowRight size={16} />
                  </Link>
                </div>
                
                <div className="w-full lg:w-2/3 grid grid-cols-2 gap-4">
                  {DESIGN_SERVICES.map((service) => (
                    <Link 
                      key={service.id}
                      to={`/design-brief?service=${service.id}`}
                      className="bg-slate-50 border border-slate-100 rounded-2xl p-6 transition-all hover:bg-white hover:shadow-xl hover:border-indigo-100 group flex flex-col items-center md:items-start text-center md:text-left"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        {React.cloneElement(service.icon as React.ReactElement<any>, { size: 24 })}
                      </div>
                      <h3 className="text-sm md:text-lg font-black text-slate-900 mb-1">{service.title}</h3>
                      <p className="text-slate-500 text-[10px] md:text-xs font-medium">{service.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Featured Products Section (Slider) - GIẢM BO GÓC */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
              <div className="space-y-2">
                <h2 className="text-indigo-600 font-black text-xs uppercase tracking-widest">Store nổi bật</h2>
                <p className="text-3xl font-black text-slate-900">Tài nguyên bán chạy</p>
              </div>
              <Link to="/shop" className="text-slate-500 hover:text-indigo-600 font-bold text-xs flex items-center space-x-1">
                <span>Xem tất cả</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="relative group/slider">
              {/* Nav Buttons */}
              <button onClick={() => handleScroll(scrollContainerRef, 'left')} className="absolute -left-4 top-[40%] z-20 p-3 rounded-full bg-white border border-slate-100 shadow-xl hover:text-indigo-600 hidden md:flex items-center justify-center">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => handleScroll(scrollContainerRef, 'right')} className="absolute -right-4 top-[40%] z-20 p-3 rounded-full bg-white border border-slate-100 shadow-xl hover:text-indigo-600 hidden md:flex items-center justify-center">
                <ChevronRight size={20} />
              </button>

              <div 
                ref={scrollContainerRef}
                className="flex space-x-6 overflow-x-auto no-scrollbar pb-8 pt-2 snap-x snap-mandatory scroll-smooth"
              >
                {PRODUCTS.slice(0, 10).map((product) => (
                  <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group/card">
                    <div className="aspect-[4/3] relative overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                      <img src={product.image} loading="lazy" alt={product.name} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                        {product.category}
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-black text-slate-900 line-clamp-2 h-10 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => setSelectedProduct(product)}>
                        {product.name}
                      </h3>
                      <div className="flex justify-between items-center pt-2">
                        <p className="text-lg font-black text-indigo-600">{product.price.toLocaleString('vi-VN')} đ</p>
                        <button onClick={() => setSelectedProduct(product)} className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-indigo-600 transition-all shadow-md active:scale-95">
                          <ShoppingBag size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Courses Section - GIẢM BO GÓC */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12 space-y-3">
              <h2 className="text-indigo-600 font-black text-xs uppercase tracking-widest">Học viện Hudesign</h2>
              <p className="text-3xl md:text-5xl font-black text-slate-900">Khám phá các khoá học</p>
            </div>

            <div className="relative group/course-slider">
               <button onClick={() => handleScroll(courseScrollRef, 'left')} className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white border border-slate-100 shadow-xl hover:text-indigo-600 hidden md:flex">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => handleScroll(courseScrollRef, 'right')} className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white border border-slate-100 shadow-xl hover:text-indigo-600 hidden md:flex">
                <ChevronRight size={20} />
              </button>

              <div 
                ref={courseScrollRef}
                className="flex space-x-6 overflow-x-auto no-scrollbar pb-10 pt-4 snap-x snap-mandatory scroll-smooth"
              >
                {COURSES.map((course) => (
                  <div key={course.id} className="min-w-[320px] md:min-w-[360px] snap-start flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 group h-full">
                    <Link to={course.id === 'custom-path' ? "/custom-path" : `/courses/${course.id}`} className="relative aspect-[2/1] overflow-hidden bg-slate-100 block cursor-pointer">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                      <div className="absolute top-3 right-3"><span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shadow-sm ${course.type === 'ONLINE' ? 'bg-green-500 text-white' : 'bg-white text-indigo-700'}`}>{course.type}</span></div>
                      {course.isHot && <div className="absolute top-3 left-0"><span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-r-md uppercase tracking-widest shadow-md flex items-center gap-1"><Flame size={10} fill="currentColor" /> HOT</span></div>}
                    </Link>

                    <div className="p-6 flex-grow flex flex-col">
                      <Link to={course.id === 'custom-path' ? "/custom-path" : `/courses/${course.id}`} className="block mb-2">
                        <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[3.5rem]">{course.title}</h3>
                      </Link>
                      <p className="text-slate-500 text-xs font-medium line-clamp-2 leading-relaxed mb-4">{course.description}</p>
                      
                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex flex-col">
                              {course.id !== 'custom-path' && <span className="text-xs text-slate-400 line-through decoration-slate-300 font-medium mb-0.5">{course.originalPrice}</span>}
                              <span className="text-xl font-black text-indigo-600 tracking-tight leading-none">{course.discountPrice}</span>
                          </div>
                          <Link to={course.id === 'custom-path' ? "/custom-path" : `/courses/${course.id}`} className={`p-3 rounded-xl text-white shadow-lg transition-transform active:scale-90 ${course.id === 'custom-path' ? 'bg-purple-600' : 'bg-slate-900'}`}>
                             <ArrowRight size={18} />
                          </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Stats Section */}
        <FadeInSection>
          <section className="bg-white border-y border-slate-100 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: 'Học viên', value: '1,200+' },
                { label: 'Dự án', value: '500+' },
                { label: 'Tài nguyên', value: '2,000+' },
                { label: 'Hài lòng', value: '98%' },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-3xl md:text-5xl font-black text-slate-900">{stat.value}</p>
                  <p className="text-slate-400 font-black text-[10px] md:text-xs uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeInSection>

        {/* Newsletter Section - GIẢM BO GÓC */}
        <section className="max-w-5xl mx-auto px-4">
          <FadeInSection>
            <div className="bg-indigo-600 rounded-3xl md:rounded-[2.5rem] p-10 md:p-20 text-white text-center space-y-8 relative overflow-hidden shadow-2xl shadow-indigo-200">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="relative z-10 space-y-4">
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase">Nhận quà tặng miễn phí</h2>
                <p className="text-indigo-100 text-lg max-w-xl mx-auto font-medium">Đăng ký nhận bộ Template Canva và Ebook thiết kế miễn phí qua email.</p>
              </div>
              
              {isSuccess ? (
                <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 animate-in zoom-in max-w-md mx-auto">
                   <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} className="text-white" /></div>
                   <p className="font-black text-white">Đã đăng ký thành công!</p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="relative z-10 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                  <input type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="Email của bạn..." className="flex-grow px-6 py-4 rounded-2xl text-slate-900 font-bold outline-none" required />
                  <button disabled={isSending} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center space-x-2 hover:bg-slate-800 transition-all uppercase text-sm tracking-widest shadow-xl disabled:opacity-50">
                    {isSending ? <Loader2 className="animate-spin" /> : <><span className="whitespace-nowrap">Nhận ngay</span><Send size={18} /></>}
                  </button>
                </form>
              )}
            </div>
          </FadeInSection>
        </section>

        {/* Consultation Form - GIẢM BO GÓC */}
        <section id="consultation" className="max-w-3xl mx-auto px-4 pb-12 scroll-mt-32">
          <FadeInSection>
            <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-center mb-10 space-y-2">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900">Bạn cần tư vấn?</h2>
                  <p className="text-slate-500 font-medium">Để lại thông tin, Hủ sẽ liên hệ hỗ trợ bạn sớm nhất.</p>
                </div>

                {isConsultSuccess ? (
                  <div className="text-center py-12 space-y-6 animate-in zoom-in">
                     <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner"><CheckCircle size={40} className="text-green-600" /></div>
                     <h3 className="text-2xl font-black text-slate-900">Đã gửi yêu cầu!</h3>
                  </div>
                ) : (
                  <form onSubmit={handleConsultationSubmit} className="space-y-5">
                     <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Họ tên</label>
                           <input required type="text" value={consultName} onChange={(e) => setConsultName(e.target.value)} placeholder="Nguyễn Văn A" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm outline-none transition-all" />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số điện thoại</label>
                           <input required type="tel" value={consultPhone} onChange={(e) => setConsultPhone(e.target.value)} placeholder="09xxx..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm outline-none transition-all" />
                        </div>
                     </div>
                     <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email (Không bắt buộc)</label>
                         <input type="email" value={consultEmail} onChange={(e) => setConsultEmail(e.target.value)} placeholder="example@gmail.com" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm outline-none transition-all" />
                     </div>
                     <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vấn đề cần tư vấn</label>
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {['Tư vấn Khóa học', 'Mua tài nguyên', 'Book thiết kế'].map((type) => (
                               <button key={type} type="button" onClick={() => setConsultType(type)} className={`px-4 py-3 rounded-xl text-xs font-black transition-all border-2 ${consultType === type ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}>{type}</button>
                            ))}
                         </div>
                     </div>
                     <button disabled={isConsultSending} type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-2">
                       {isConsultSending ? <Loader2 className="animate-spin" size={18} /> : <MessageSquare size={18} />}
                       <span>{isConsultSending ? 'Đang gửi...' : 'Gửi yêu cầu ngay'}</span>
                     </button>
                  </form>
                )}
              </div>
            </div>
          </FadeInSection>
        </section>

      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default HomePage;
