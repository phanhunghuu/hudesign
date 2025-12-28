
import React, { useEffect } from 'react';
import { X, Calendar, BookOpen, ChevronRight } from 'lucide-react';
import { Course } from '../types';

interface CurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  accentColor: string;
}

const CurriculumModal: React.FC<CurriculumModalProps> = ({ isOpen, onClose, course, accentColor }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className={`${accentColor} p-6 md:p-8 text-white relative`}>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <BookOpen size={20} className="text-white/70" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Lộ trình chi tiết</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black leading-tight pr-10">
            {course.title}
          </h2>
        </div>

        {/* Curriculum List */}
        <div className="flex-grow overflow-y-auto p-6 md:p-10">
          <div className="space-y-8 relative">
            {/* Timeline line decoration */}
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-100 hidden md:block"></div>

            {course.curriculum?.map((item, index) => (
              <div key={index} className="relative md:pl-12 group">
                {/* Timeline dot */}
                <div className={`absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full border-4 border-white shadow-md transition-all duration-500 group-hover:scale-150 hidden md:block ${accentColor.replace('bg-', 'bg-')}`}></div>
                
                <div className="bg-slate-50 rounded-2xl p-5 md:p-6 border border-slate-100 group-hover:border-indigo-100 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-indigo-500/5 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} className="text-slate-400" />
                      <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">{item.session}</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
                  </div>
                  
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
                    {item.topics.map((topic, i) => (
                      <div key={i} className="flex items-center space-x-2 text-slate-600">
                        <ChevronRight size={14} className="text-indigo-400 flex-shrink-0" />
                        <span className="text-sm font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
          <a 
            href="#register" 
            onClick={onClose}
            className={`${accentColor} text-white px-8 py-4 rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-lg active:scale-95`}
          >
            Đăng ký nhận tư vấn ngay
          </a>
        </div>
      </div>
    </div>
  );
};

export default CurriculumModal;
