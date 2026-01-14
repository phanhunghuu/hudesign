
import { Link } from 'react-router-dom';
import { COURSES, SPECIAL_FEATURES } from '../constants';
import { ArrowRight, Flame } from 'lucide-react';
import React from 'react';

const CourseOverview: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 md:mb-12 space-y-3">
        <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-[10px]">Chương trình đào tạo</h2>
        <p className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Danh sách khóa học</p>
        <p className="text-slate-500 text-sm max-w-xl mx-auto font-thin">Lộ trình 1 kèm 1 thực chiến, học đúng thứ bạn cần.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
        {COURSES.map((course) => (
          <div 
            key={course.id} 
            className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 group h-full"
          >
            {/* 1. IMAGE SECTION - Tỉ lệ 2:1 Dẹp hơn - Clickable */}
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

            {/* 2. BODY SECTION - Compact padding */}
            <div className="p-5 flex-grow flex flex-col">
              
              {/* Tên Khóa Học - Clickable */}
              <Link to={course.id === 'custom-path' ? "/custom-path" : `/courses/${course.id}`} className="block mb-1">
                <h3 className="text-xl md:text-3xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[3.5rem] md:min-h-[4.5rem]">
                  {course.title}
                </h3>
              </Link>

              {/* Giới thiệu ngắn */}
              <p className="text-slate-500 text-xs font-medium line-clamp-2 leading-relaxed mb-4">
                {course.description}
              </p>

              {/* Info Wrapper - Chỉ hiển thị Tag, BỎ icon công cụ */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {course.suitableFor.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-600">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Đường kẻ & Giá - Đẩy xuống đáy */}
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                   <div className="flex flex-col">
                      {course.id !== 'custom-path' && (
                        <span className="text-xs text-slate-400 line-through decoration-slate-300 font-medium mb-0.5">{course.originalPrice}</span>
                      )}
                      <span className="text-2xl font-black text-indigo-600 tracking-tight leading-none">{course.discountPrice}</span>
                   </div>
              </div>

            </div>

            {/* 3. FOOTER ACTION BUTTON - Compact height */}
            <Link 
              to={course.id === 'custom-path' ? "/custom-path" : `/courses/${course.id}`}
              className={`py-3.5 px-6 text-center text-white font-bold text-xs transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden ${course.id === 'custom-path' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-slate-900 hover:bg-indigo-600'}`}
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

      {/* CORE VALUES SECTION */}
      <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
        
        <div className="relative z-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-4 space-y-6">
            <div className="inline-block bg-indigo-600/20 px-4 py-1.5 rounded-full border border-indigo-500/30">
               <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">Core Values</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black leading-tight">Tại sao chọn <br/><span className="text-indigo-500 text-6xl">HU</span>DESIGN?</h3>
            <p className="text-slate-400 text-base leading-relaxed font-thin">Chúng tôi không chỉ dạy công cụ, chúng tôi dạy tư duy thẩm mỹ thực chiến để bạn tự tin sáng tạo.</p>
          </div>
          
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {SPECIAL_FEATURES.map((feature, i) => (
              <div key={i} className="space-y-4 group">
                <div className="bg-white/5 p-5 rounded-2xl inline-block border border-white/10 backdrop-blur-md group-hover:bg-indigo-600/20 group-hover:border-indigo-500/50 transition-all duration-300">
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { className: 'w-8 h-8 text-indigo-400' })}
                </div>
                <h4 className="text-lg font-black tracking-tight">{feature.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-thin">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
