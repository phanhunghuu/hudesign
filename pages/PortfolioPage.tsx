
import React, { useRef } from 'react';
import { PORTFOLIO_PROJECTS } from '../constants';
import { ChevronLeft, ChevronRight, Image as ImageIcon, ExternalLink, Calendar } from 'lucide-react';

const PortfolioPage: React.FC = () => {
  const scrollContainerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleScroll = (id: string, direction: 'left' | 'right') => {
    const container = scrollContainerRefs.current[id];
    if (container) {
      const scrollAmount = container.offsetWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full border border-indigo-100">
            <ImageIcon size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Dự án đã thực hiện</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-none tracking-tighter">
            Social Media <br/><span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Design</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Tổng hợp các ấn phẩm Marketing, bộ nhận diện thương hiệu được thiết kế bởi Hudesign cho khách hàng thực tế.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-24 md:space-y-32">
          {PORTFOLIO_PROJECTS.map((project) => (
            <div key={project.id} className="group/section">
              {/* Project Title Bar */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-100 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="bg-slate-900 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      {project.year}
                    </span>
                    <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900">
                    {project.brandName}
                  </h2>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 font-bold text-sm">
                  <Calendar size={16} />
                  <span>Dự án hoàn thành</span>
                </div>
              </div>

              {/* Slider Container */}
              <div className="relative group">
                {/* Navigation Buttons */}
                <button 
                  onClick={() => handleScroll(project.id, 'left')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white shadow-2xl border border-slate-100 text-slate-900 opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-600 hover:text-white active:scale-90 hidden md:block"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => handleScroll(project.id, 'right')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white shadow-2xl border border-slate-100 text-slate-900 opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-600 hover:text-white active:scale-90 hidden md:block"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Horizontal Scroll Area */}
                <div 
                  ref={el => { scrollContainerRefs.current[project.id] = el; }}
                  className="flex space-x-4 md:space-x-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4"
                >
                  {project.images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="min-w-[280px] md:min-w-[400px] aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden snap-start relative group/img cursor-zoom-in bg-slate-100 border border-slate-100"
                    >
                      <img 
                        src={img} 
                        alt={`${project.brandName} ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-indigo-600/0 group-hover/img:bg-indigo-600/10 transition-colors pointer-events-none"></div>
                    </div>
                  ))}
                </div>
                
                {/* Mobile Scroll Indicator */}
                <div className="mt-4 flex md:hidden items-center justify-center space-x-1">
                   <div className="w-8 h-1 bg-indigo-600 rounded-full"></div>
                   <div className="w-2 h-1 bg-slate-200 rounded-full"></div>
                   <div className="w-2 h-1 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="mt-32 bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full"></div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-6xl font-black leading-tight">Bạn muốn có những <br/><span className="text-indigo-400">thiết kế như này?</span></h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl mx-auto">
              Tham gia ngay các khóa học của Hudesign để tự tay thiết kế những ấn phẩm chuyên nghiệp cho thương hiệu của bạn.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#/courses" className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl active:scale-95">
                Xem khóa học
              </a>
              <a href="#/register" className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl active:scale-95">
                Nhận tư vấn ngay
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioPage;
