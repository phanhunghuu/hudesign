
import React from 'react';
import { ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyNewProject: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Nút quay lại web chính */}
        <Link to="/" className="inline-flex items-center space-x-2 text-indigo-600 font-black text-sm mb-8 hover:translate-x-[-5px] transition-transform">
          <ArrowLeft size={18} />
          <span>QUAY LẠI HUDESIGN</span>
        </Link>

        {/* Nội dung cái web riêng bạn muốn chèn vào */}
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="p-12 md:p-20 text-center space-y-8">
            <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto text-white shadow-xl animate-bounce">
              <Sparkles size={40} />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              ĐÂY LÀ TRANG WEB <br/> <span className="text-indigo-600">RIÊNG CỦA BẠN</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Bạn có thể copy toàn bộ nội dung cái web khác của bạn và dán vào file này. 
              Nó sẽ nằm trong hệ thống của Hudesign nhưng có giao diện hoàn toàn độc lập.
            </p>
            
            {/* Nếu bạn muốn dùng Iframe để nhúng web có sẵn */}
            <div className="mt-12 rounded-[2rem] overflow-hidden border-4 border-slate-100 aspect-video shadow-inner bg-slate-100 flex items-center justify-center">
              <div className="text-center space-y-4">
                 <ExternalLink size={48} className="mx-auto text-slate-300" />
                 <p className="text-slate-400 font-bold">Khu vực nhúng Iframe hoặc dán code dự án riêng</p>
              </div>
              {/* Ví dụ nhúng thực tế: 
              <iframe src="https://google.com" className="w-full h-full border-none"></iframe> 
              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNewProject;
