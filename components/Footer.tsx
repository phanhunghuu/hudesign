
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Music2, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Làm sạch URL nếu cần
    if (window.location.hash === '#/') {
       window.history.pushState(null, '', window.location.pathname);
    }
  };

  return (
    <footer className="bg-slate-50 py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <Link to="/" onClick={scrollToTop} className="inline-block hover:opacity-80 transition-opacity outline-none">
              <img 
                src="https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767743711/15_k80j2r.png" 
                alt="Hudesign Logo" 
                className="h-12 md:h-16 w-auto object-contain mx-auto md:mx-0"
              />
            </Link>
            <p className="mt-4 text-slate-500 max-w-xs mx-auto md:mx-0">Nơi khơi nguồn đam mê thiết kế và giúp bạn làm chủ các công cụ sáng tạo chuyên nghiệp nhất.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://facebook.com/phanhung.huu" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm" title="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://www.tiktok.com/@hudesign" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm" title="TikTok">
              <Music2 size={20} />
            </a>
            <a href="https://zalo.me/0912412132" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm" title="Zalo">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm font-medium">
          <p>© 2024 Hudesign Academy. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-indigo-600 transition-colors">Chính sách bảo mật</Link>
            <Link to="/terms" className="hover:text-indigo-600 transition-colors">Điều khoản dịch vụ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
