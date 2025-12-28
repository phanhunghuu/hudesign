
import React from 'react';
import { COURSES, SPECIAL_FEATURES } from '../constants';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';

const CourseOverview: React.FC = () => {
  const scrollToDetail = (courseId: string) => {
    const element = document.getElementById(`detail-${courseId}`);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const getCardStyle = (id: string) => {
    switch (id) {
      case 'marketing-offline': return 'bg-indigo-600 shadow-indigo-100';
      case 'marketing-online': return 'bg-blue-600 shadow-blue-100';
      case 'photography-offline': return 'bg-orange-600 shadow-orange-100';
      case 'canva-marketing': return 'bg-cyan-600 shadow-cyan-100';
      default: return 'bg-slate-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 md:mb-16 space-y-3">
        <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-[10px] md:text-sm">Chương trình đào tạo</h2>
        <p className="text-2xl md:text-5xl font-black text-slate-900">Danh sách khóa học</p>
        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto px-4">Lộ trình được thiết kế riêng giúp bạn thành thạo công cụ nhanh nhất.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24">
        {COURSES.map((course) => (
          <div 
            key={course.id} 
            className={`${getCardStyle(course.id)} rounded-[2rem] p-6 md:p-8 transition-all hover:scale-[1.02] group flex flex-col h-full text-white relative overflow-hidden shadow-xl`}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="bg-white/20 backdrop-blur-md w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 border border-white/30 font-black text-xs md:text-lg">
                {course.id === 'marketing-offline' && "PsAi"}
                {course.id === 'marketing-online' && "Zoom"}
                {course.id === 'photography-offline' && "Photo"}
                {course.id === 'canva-marketing' && "Cv"}
              </div>
              
              <h3 className="text-lg md:text-xl font-black mb-3 md:mb-4 leading-tight min-h-[auto] md:min-h-[3rem]">{course.title}</h3>
              
              <div className="space-y-3 flex-grow">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-white/70 mt-0.5 flex-shrink-0" />
                  <p className="text-xs md:text-sm text-white/90 leading-relaxed font-medium line-clamp-2 md:line-clamp-none">{course.description}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-white/50 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-white/80 font-bold">{course.duration}</span>
                </div>
              </div>

              <button 
                onClick={() => scrollToDetail(course.id)}
                className="mt-6 flex items-center justify-center space-x-2 w-full py-3 md:py-4 bg-white text-slate-900 rounded-xl md:rounded-2xl text-xs md:text-sm font-black hover:bg-opacity-90 transition-all shadow-lg active:scale-95"
              >
                <span>Xem chi tiết học phí</span>
                <ArrowRight size={14} className="md:size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
        
        <div className="relative z-10 grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-2xl md:text-3xl font-black">Tại sao chọn Hudesign?</h3>
            <p className="text-slate-400 text-sm md:text-lg">Chúng tôi tập trung vào kết quả thực tế và tư duy sáng tạo của từng học viên.</p>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {SPECIAL_FEATURES.map((feature, i) => (
              <div key={i} className="space-y-2 md:space-y-4">
                <div className="bg-indigo-600/20 p-3 md:p-4 rounded-xl md:rounded-2xl inline-block border border-white/5 backdrop-blur-md">
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { className: 'w-6 h-6 md:w-8 md:h-8 text-indigo-400' })}
                </div>
                <h4 className="text-base md:text-lg font-bold">{feature.title}</h4>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
