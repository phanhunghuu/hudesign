
import React from 'react';
import { COURSES, SPECIAL_FEATURES } from '../constants';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';

const CourseOverview: React.FC = () => {
  const scrollToDetail = (courseId: string) => {
    const element = document.getElementById(`detail-${courseId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hàm lấy màu sắc cho từng card dựa trên ID hoặc Index
  const getCardStyle = (id: string) => {
    switch (id) {
      case 'marketing-offline':
        return 'bg-indigo-600 shadow-indigo-200';
      case 'marketing-online':
        return 'bg-blue-600 shadow-blue-200';
      case 'photography-offline':
        return 'bg-orange-600 shadow-orange-200';
      case 'canva-marketing':
        return 'bg-cyan-600 shadow-cyan-200';
      default:
        return 'bg-slate-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-sm">Chương trình đào tạo</h2>
        <p className="text-3xl md:text-5xl font-black text-slate-900">Khám phá các khóa học tại Hudesign</p>
        <p className="text-slate-500 max-w-2xl mx-auto">Chọn lộ trình phù hợp với nhu cầu và trình độ của bạn. Chúng tôi cam kết chất lượng đào tạo tốt nhất.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {COURSES.map((course) => (
          <div 
            key={course.id} 
            className={`${getCardStyle(course.id)} rounded-[2.5rem] p-8 transition-all hover:scale-[1.03] hover:shadow-2xl group flex flex-col h-full text-white relative overflow-hidden`}
          >
            {/* Trang trí background nhẹ */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="bg-white/20 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/30 font-black text-lg shadow-lg">
                {course.id === 'marketing-offline' && "PsAi"}
                {course.id === 'marketing-online' && "Zoom"}
                {course.id === 'photography-offline' && "Photo"}
                {course.id === 'canva-marketing' && "Cv"}
              </div>
              
              <h3 className="text-xl font-black mb-4 leading-tight min-h-[3rem]">{course.title}</h3>
              
              <div className="space-y-4 flex-grow">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-white/70 mt-1 flex-shrink-0" />
                  <p className="text-sm text-white/90 leading-relaxed font-medium">{course.description}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-white/50 flex-shrink-0" />
                  <span className="text-sm text-white/80 font-bold">{course.duration}</span>
                </div>
                
                <div className="pt-4">
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Dành cho:</p>
                  <div className="flex flex-wrap gap-2">
                    {course.suitableFor.map((tag) => (
                      <span key={tag} className="text-[9px] bg-white/10 px-2 py-1 rounded-md font-bold text-white/90 border border-white/10 whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => scrollToDetail(course.id)}
                className="mt-8 flex items-center justify-center space-x-2 w-full py-4 bg-white text-slate-900 rounded-2xl text-sm font-black hover:bg-opacity-90 transition-all shadow-xl group/btn active:scale-95"
              >
                <span>Chi tiết học phí</span>
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Phần tính năng đặc biệt (Giữ nguyên hoặc tinh chỉnh nhẹ) */}
      <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
        
        <div className="relative z-10 grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1 space-y-6">
            <h3 className="text-3xl font-black">Điểm đặc biệt chỉ có tại Hudesign</h3>
            <p className="text-slate-400 text-lg">Chúng tôi không chỉ dạy công cụ, chúng tôi dạy tư duy thiết kế để bạn ứng dụng được ngay vào công việc.</p>
          </div>
          
          <div className="md:col-span-2 grid sm:grid-cols-3 gap-8">
            {SPECIAL_FEATURES.map((feature, i) => (
              <div key={i} className="space-y-4">
                <div className="bg-indigo-600/20 p-4 rounded-2xl inline-block border border-white/5 backdrop-blur-md">
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { className: 'w-8 h-8 text-indigo-400' })}
                </div>
                <h4 className="text-lg font-bold">{feature.title}</h4>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
