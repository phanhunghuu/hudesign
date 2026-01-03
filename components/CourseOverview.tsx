
import { Link } from 'react-router-dom';
import { COURSES, SPECIAL_FEATURES } from '../constants';
import { CheckCircle2, Clock, ArrowRight, Sparkles, Flame } from 'lucide-react';
import React from 'react';

const CourseOverview: React.FC = () => {
  const getCardStyle = (id: string) => {
    switch (id) {
      case 'custom-path': return 'bg-slate-900 border-indigo-500/30 ring-4 ring-indigo-500/10';
      case 'marketing-offline': return 'bg-indigo-600 shadow-indigo-200/50';
      case 'capcut-pro': return 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-purple-200/50';
      case 'marketing-online': return 'bg-blue-600 shadow-blue-200/50';
      case 'photography-offline': return 'bg-orange-600 shadow-orange-200/50';
      case 'canva-marketing': return 'bg-cyan-600 shadow-cyan-200/50';
      default: return 'bg-slate-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 md:mb-12 space-y-3">
        <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-[10px]">Chương trình đào tạo</h2>
        <p className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">DANH SÁCH KHÓA HỌC</p>
        <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">Lộ trình 1 kèm 1 thực chiến, học đúng thứ bạn cần.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
        {COURSES.map((course) => (
          <div 
            key={course.id} 
            className={`${getCardStyle(course.id)} rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 group flex flex-col h-full text-white relative overflow-hidden shadow-2xl`}
          >
            {course.isHot && (
              <div className="absolute top-0 right-0 z-20">
                <div className="bg-red-500 text-white text-[10px] font-black py-1 px-8 rotate-45 translate-x-[25px] translate-y-[10px] shadow-sm flex items-center justify-center space-x-1">
                  <Flame size={10} fill="currentColor" />
                  <span>HOT</span>
                </div>
              </div>
            )}
            
            {course.id === 'custom-path' && (
              <div className="absolute top-6 right-6 animate-pulse">
                <Sparkles className="text-indigo-400 w-6 h-6" />
              </div>
            )}
            
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="bg-white/20 backdrop-blur-md w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 border border-white/30 font-black text-sm md:text-xl shadow-inner">
                {course.id === 'custom-path' && "AI"}
                {course.id === 'marketing-offline' && "PsAi"}
                {course.id === 'capcut-pro' && "CC"}
                {course.id === 'marketing-online' && "Zoom"}
                {course.id === 'photography-offline' && "Photo"}
                {course.id === 'canva-marketing' && "Cv"}
              </div>
              
              <h3 className="text-xl md:text-2xl font-black mb-2 leading-tight">{course.title}</h3>
              
              {course.id !== 'custom-path' && (
                <div className="mb-4">
                  <p className="text-[10px] font-bold text-white/50 line-through decoration-white/30">{course.originalPrice}</p>
                  <p className="text-2xl md:text-3xl font-black text-white">{course.discountPrice}</p>
                </div>
              )}

              <div className="space-y-4 flex-grow">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${course.id === 'custom-path' ? 'text-indigo-400' : 'text-white/60'}`} />
                  <p className="text-sm text-white/90 leading-relaxed font-medium line-clamp-2">{course.description}</p>
                </div>
                
                <div className="flex items-center space-x-3 bg-black/10 w-fit px-4 py-2 rounded-full border border-white/5">
                  <Clock className="w-4 h-4 text-white/50" />
                  <span className="text-xs text-white/80 font-black uppercase tracking-wider">{course.duration}</span>
                </div>
              </div>

              <div className="mt-10">
                <Link 
                  to={course.id === 'custom-path' ? "/custom-path" : `/courses/${course.id}`}
                  className={`flex items-center justify-center space-x-3 w-full py-4 rounded-2xl text-sm font-black transition-all shadow-xl active:scale-95 group/btn ${course.id === 'custom-path' ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-white text-slate-900 hover:bg-indigo-50'}`}
                >
                  {course.id === 'custom-path' && <Sparkles size={18} />}
                  <span>{course.id === 'custom-path' ? 'XÂY LỘ TRÌNH NGAY' : 'CHI TIẾT KHÓA HỌC'}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
        
        <div className="relative z-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-4 space-y-6">
            <div className="inline-block bg-indigo-600/20 px-4 py-1.5 rounded-full border border-indigo-500/30">
               <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">Core Values</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black leading-tight uppercase">Tại sao chọn <br/><span className="text-indigo-500 text-6xl">HU</span>DESIGN?</h3>
            <p className="text-slate-400 text-base leading-relaxed font-medium">Chúng tôi không chỉ dạy công cụ, chúng tôi dạy tư duy thẩm mỹ thực chiến để bạn tự tin sáng tạo.</p>
          </div>
          
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {SPECIAL_FEATURES.map((feature, i) => (
              <div key={i} className="space-y-4 group">
                <div className="bg-white/5 p-5 rounded-2xl inline-block border border-white/10 backdrop-blur-md group-hover:bg-indigo-600/20 group-hover:border-indigo-500/50 transition-all duration-300">
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { className: 'w-8 h-8 text-indigo-400' })}
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight">{feature.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
