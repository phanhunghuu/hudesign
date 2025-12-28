
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Trang chủ', href: '#home' },
    { name: 'Khóa học', href: '#courses' },
    { name: 'Học phí', href: '#pricing' },
    { name: 'Đăng ký', href: '#register' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={(e) => scrollToSection(e, '#home')} className="flex items-center">
              <img 
                src="https://i.postimg.cc/prJR9FbQ/15.png" 
                alt="Hudesign Logo" 
                className={`h-10 md:h-14 w-auto object-contain transition-all duration-500 ${!scrolled ? 'brightness-0 invert' : ''}`}
                style={{ imageRendering: 'auto' }}
              />
            </button>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-sm font-bold transition-colors hover:text-indigo-500 ${scrolled ? 'text-slate-700' : 'text-white'}`}
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={(e) => scrollToSection(e, '#register')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full text-sm font-black hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30"
              >
                Nhận tư vấn
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled ? 'text-slate-900' : 'text-white'} p-2 transition-colors`}
            >
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-slate-800 text-lg font-bold py-2 border-b border-gray-50 flex justify-between items-center w-full text-left"
            >
              {link.name}
              <span className="text-indigo-500 text-xl">→</span>
            </button>
          ))}
          <button
            onClick={(e) => scrollToSection(e, '#register')}
            className="bg-indigo-600 text-white py-4 rounded-2xl text-center font-black shadow-md mt-2 w-full"
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
