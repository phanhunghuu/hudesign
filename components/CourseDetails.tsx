
import React, { useState } from 'react';
import { COURSES } from '../constants';
import { Check, Tag, Palette, Laptop, Camera, Sparkles, Zap, List } from 'lucide-react';
import { Course } from '../types';
import CurriculumModal from './CurriculumModal';

const CourseDetails: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCurriculum = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  // Hàm bổ trợ để lấy icon và màu sắc riêng cho từng khóa
  const getCourseStyle = (id: string) => {
    switch (id) {
      case 'marketing-offline':
        return {
          icon: <Palette className="w-10 h-10 text-white" />,
          accent: 'indigo',
          bgDark: 'bg-indigo-600',
          bgMedium: 'bg-indigo-500',
          bgLight: 'bg-indigo-50',
          textAccent: 'text-indigo-600',
          gradient: 'from-indigo-600 to-purple-600',
          label: 'DESIGN PRO'
        };
      case 'marketing-online':
        return {
          icon: <Laptop className="w-10 h-10 text-white" />,
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
          icon: <Camera className="w-10 h-10 text-white" />,
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
          icon: <Sparkles className="w-10 h-10 text-white" />,
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
          icon: <Zap className="w-10 h-10 text-white" />,
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
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-sm">Ưu đãi học phí</h2>
        <p className="text-3xl md:text-5xl font-black text-slate-900">Đầu tư cho kiến thức, bứt phá sự nghiệp</p>
        <p className="text-slate-500 max-w-2xl mx-auto">Giảm ngay 500.000 VNĐ khi hoàn thành học phí trước ngày khai giảng.</p>
      </div>

      <div className="space-y-16">
        {COURSES.map((course, idx) => {
          const style = getCourseStyle(course.id);
          
          return (
            <div 
              key={course.id} 
              id={`detail-${course.id}`}
              className={`flex flex-col lg:flex-row bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 transition-transform hover:scale-[1.01] duration-500 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Left Side - Dark Background with White Text */}
              <div className={`lg:w-1/3 ${style.bgDark} relative flex flex-col justify-center items-center p-12 overflow-hidden min-h-[400px]`}>
                {/* Type Badge */}
                <div className="absolute top-0 left-0 p-6">
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm bg-white/20 backdrop-blur-md text-white border border-white/30">
                    {course.type}
                  </span>
                </div>
                
                {/* Decorative background effects */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

                {/* Main Centered Content */}
                <div className="relative z-10 flex flex-col items-center text-center w-full space-y-8">
                  {/* Icon Container */}
                  <div className="bg-white/20 backdrop-blur-md w-24 h-24 rounded-[2.5rem] flex items-center justify-center shadow-xl border border-white/30 animate-pulse">
                    {style.icon}
                  </div>
                  
                  {/* Label with Box */}
                  <div className="bg-white/10 backdrop-blur-sm py-3 px-10 rounded-2xl border border-white/20 flex items-center justify-center">
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-widest uppercase leading-none">
                      {style.label}
                    </h3>
                  </div>

                  {/* Pricing Section */}
                  <div className="space-y-1">
                    <p className="text-white/60 line-through text-sm font-bold tracking-wider">{course.originalPrice}</p>
                    <p className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">{course.discountPrice}</p>
                  </div>
                  
                  <p className="text-[10px] font-black text-white/50 uppercase tracking-widest pt-2">* ĐĂNG KÝ SỚM ĐỂ GIỮ CHỖ</p>
                </div>
              </div>

              {/* Right/Content Side */}
              <div className="lg:w-2/3 p-8 md:p-14 flex flex-col justify-center relative bg-white">
                <span className="absolute top-4 right-10 text-9xl font-black text-slate-50 opacity-[0.05] select-none">
                  0{idx + 1}
                </span>

                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-4">
                    {course.title}
                  </h3>

                  <p className="text-slate-600 mb-10 text-lg leading-relaxed font-medium">
                    {course.content}
                  </p>

                  <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
                    {course.perks.map((perk, i) => (
                      <div key={i} className="flex items-start space-x-3 group/item">
                        <div className={`mt-1 flex-shrink-0 w-6 h-6 ${style.bgLight} rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform`}>
                          <Check className={`w-3.5 h-3.5 ${style.textAccent}`} strokeWidth={4} />
                        </div>
                        <span className="text-sm text-slate-600 font-bold leading-snug">{perk}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 flex flex-wrap items-center gap-4 md:gap-6">
                    <a 
                      href="#register" 
                      className={`${style.bgDark} text-white px-8 md:px-10 py-4 rounded-2xl font-black hover:opacity-90 transition-all shadow-xl shadow-${style.accent}-500/20 active:scale-95 text-center flex-grow md:flex-grow-0`}
                    >
                      Đăng ký ngay
                    </a>
                    
                    <button 
                      onClick={() => openCurriculum(course)}
                      className={`border-2 ${style.textAccent} ${style.accent === 'indigo' ? 'border-indigo-600 hover:bg-indigo-50' : style.accent === 'blue' ? 'border-blue-600 hover:bg-blue-50' : style.accent === 'orange' ? 'border-orange-600 hover:bg-orange-50' : 'border-cyan-600 hover:bg-cyan-50'} px-8 md:px-10 py-4 rounded-2xl font-black transition-all active:scale-95 text-center flex items-center justify-center space-x-2 flex-grow md:flex-grow-0`}
                    >
                      <List size={20} />
                      <span>Xem lộ trình học</span>
                    </button>

                    <div className={`flex items-center space-x-2 ${style.textAccent} w-full md:w-auto justify-center md:justify-start pt-4 md:pt-0`}>
                      <Tag className="w-5 h-5" />
                      <span className="font-black text-xs uppercase tracking-wider">Ưu đãi giới hạn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup Lộ trình */}
      <CurriculumModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        course={selectedCourse} 
        accentColor={selectedCourse ? getCourseStyle(selectedCourse.id).bgDark : 'bg-indigo-600'}
      />
    </div>
  );
};

export default CourseDetails;
