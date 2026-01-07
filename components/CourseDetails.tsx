
import React from 'react';
import { Link } from 'react-router-dom';
import { COURSES } from '../constants';
import { Check, Palette, Laptop, Camera, Sparkles, Zap, Video, ArrowRight, LayoutGrid } from 'lucide-react';

const CourseDetails: React.FC = () => {
  const getCourseStyle = (id: string) => {
    switch (id) {
      case 'marketing-offline':
        return {
          icon: <Palette className="w-8 h-8 md:w-10 md:h-10 text-white" />,
          accent: 'indigo',
          bgDark: 'bg-indigo-600',
          bgMedium: 'bg-indigo-500',
          bgLight: 'bg-indigo-50',
          textAccent: 'text-indigo-600',
          gradient: 'from-indigo-600 to-purple-600',
          label: 'DESIGN PRO'
        };
      case 'capcut-pro':
        return {
          icon: <Video className="w-8 h-8 md:w-10 md:h-10 text-white" />,
          accent: 'purple',
          bgDark: 'bg-gradient-to-br from-purple-600 to-pink-600',
          bgMedium: 'bg-purple-600',
          bgLight: 'bg-purple-50',
          textAccent: 'text-purple-600',
          gradient: 'from-purple-600 to-pink-600',
          label: 'VIDEO MASTER'
        };
      case 'marketing-online':
        return {
          icon: <Laptop className="w-8 h-8 md:w-10 md:h-10 text-white" />,
          accent: 'blue',
          bgDark: 'bg-blue-600',
          bgMedium: 'bg-blue-500',
          bgLight: 'bg-blue-50',
          textAccent: 'text-blue-600',
          gradient: 'from-blue-600 to-cyan-600',
          label: 'DIGITAL NOMAD'
        };
      case 'photography-offline':
        return {
          icon: <Camera className="w-8 h-8 md:w-10 md:h-10 text-white" />,
          accent: 'orange',
          bgDark: 'bg-orange-600',
          bgMedium: 'bg-orange-500',
          bgLight: 'bg-orange-50',
          textAccent: 'text-orange-600',
          gradient: 'from-orange-500 to-red-500',
          label: 'PHOTO MASTER'
        };
      case 'canva-marketing':
        return {
          icon: <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />,
          accent: 'cyan',
          bgDark: 'bg-cyan-600',
          bgMedium: 'bg-cyan-500',
          bgLight: 'bg-cyan-50',
          textAccent: 'text-cyan-600',
          gradient: 'from-cyan-500 to-teal-500',
          label: 'FAST TRACK'
        };
      default:
        return {
          icon: <Zap className="w-8 h-8 md:w-10 md:h-10 text-white" />,
          accent: 'slate',
          bgDark: 'bg-slate-800',
          bgMedium: 'bg-slate-700',
          bgLight: 'bg-slate-50',
          textAccent: 'text-slate-600',
          gradient: 'from-slate-600 to-slate-800',
          label: 'COURSE'
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 md:mb-16 space-y-3">
        <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-[10px] md:text-sm">Ưu đãi học phí</h2>
        <p className="text-2xl md:text-5xl font-black text-slate-900 leading-tight">Đầu tư xứng đáng</p>
        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto font-thin">Giảm thêm 500k cho học viên đăng ký nhóm từ 2 người trở lên.</p>
      </div>

      <div className="space-y-8 md:space-y-16">
        {COURSES.map((course, idx) => {
          const style = getCourseStyle(course.id);
          
          return (
            <div 
              key={course.id} 
              id={`detail-${course.id}`}
              className={`flex flex-col lg:flex-row bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl shadow-slate-100 border border-slate-100 transition-all duration-300 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={`lg:w-1/3 ${style.bgDark} relative flex flex-col justify-center items-center p-8 md:p-12 overflow-hidden min-h-[auto] md:min-h-[400px]`}>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase bg-white/20 backdrop-blur-md text-white border border-white/30">
                    {course.type}
                  </span>
                </div>
                
                <div className="relative z-10 flex flex-col items-center text-center w-full space-y-4 md:space-y-8 py-4 md:py-0">
                  <div className="bg-white/20 backdrop-blur-md w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2.5rem] flex items-center justify-center shadow-xl border border-white/30">
                    {style.icon}
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm py-2 md:py-3 px-6 md:px-10 rounded-xl md:rounded-2xl border border-white/20">
                    <h3 className="text-base md:text-2xl font-black text-white tracking-widest uppercase leading-none">
                      {style.label}
                    </h3>
                  </div>

                  <div className="space-y-0.5 md:space-y-1">
                    <p className="text-white/50 line-through text-[12px] md:text-lg font-bold decoration-white/30">{course.originalPrice}</p>
                    <p className="text-3xl md:text-5xl font-black text-white">{course.discountPrice}</p>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3 p-6 md:p-14 flex flex-col justify-center relative bg-white">
                <div className="relative z-10">
                  <h3 className="text-xl md:text-3xl font-black text-slate-900 leading-tight mb-3 md:mb-4">
                    {course.title}
                  </h3>

                  {/* CHỈNH font-thin Ở ĐÂY */}
                  <p className="text-slate-600 mb-6 md:mb-10 text-sm md:text-lg leading-relaxed font-thin">
                    {course.content}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-3 md:gap-y-5">
                    {course.perks.map((perk, i) => (
                      <div key={i} className="flex items-start space-x-2 md:space-x-3 group/item">
                        <div className={`mt-0.5 flex-shrink-0 w-5 h-5 md:w-6 md:h-6 ${style.bgLight} rounded-md md:rounded-lg flex items-center justify-center`}>
                          <Check className={`w-3 h-3 md:w-3.5 md:h-3.5 ${style.textAccent}`} strokeWidth={4} />
                        </div>
                        {/* CHỈNH font-thin Ở ĐÂY */}
                        <span className="text-xs md:text-sm text-slate-600 font-thin leading-tight md:leading-snug">{perk}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 md:mt-12 flex flex-col sm:flex-row flex-wrap items-center gap-3 md:gap-6">
                    {course.id === 'custom-path' ? (
                      <Link 
                        to="/custom-path" 
                        className={`${style.bgDark} text-white w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-lg hover:opacity-90 transition-all shadow-xl active:scale-95 text-center flex items-center justify-center space-x-3 group`}
                      >
                        <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                        <span>Tự xây lộ trình ngay</span>
                        <ArrowRight size={20} />
                      </Link>
                    ) : (
                      <>
                        <Link 
                          to={`/register?course=${course.id}`} 
                          className={`${style.bgDark} text-white w-full sm:w-auto px-8 md:px-10 py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-base hover:opacity-90 transition-all shadow-xl active:scale-95 text-center`}
                        >
                          Đăng ký giữ chỗ
                        </Link>
                        
                        <Link 
                          to={`/courses/${course.id}`}
                          className={`w-full sm:w-auto border-2 ${style.textAccent} ${course.id === 'marketing-offline' ? 'border-indigo-600 hover:bg-indigo-50' : course.id === 'capcut-pro' ? 'border-purple-600 hover:bg-purple-50' : course.id === 'marketing-online' ? 'border-blue-600 hover:bg-blue-50' : course.id === 'photography-offline' ? 'border-orange-600 hover:bg-orange-50' : 'border-cyan-600 hover:bg-cyan-50'} px-8 md:px-10 py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-base transition-all active:scale-95 flex items-center justify-center space-x-2`}
                        >
                          <LayoutGrid size={18} />
                          <span>Xem chi tiết & Lộ trình</span>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseDetails;
