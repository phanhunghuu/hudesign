
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
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
    <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={(e) => scrollToSection(e, '#home')} className="flex items-center">
              <img 
                src="https://i.postimg.cc/prJR9FbQ/15.png" 
                alt="Hudesign Logo" 
                className={`h-8 md:h-12 w-auto object-contain transition-all duration-300 ${!scrolled && !isOpen ? 'brightness-0 invert' : ''}`}
              />
            </button>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
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
                className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-black hover:bg-indigo-700 transition-all shadow-lg"
              >
                Nhận tư vấn
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled || isOpen ? 'text-slate-900' : 'text-white'} p-2 transition-colors`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-0 left-0 w-full bg-white shadow-2xl transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} z-[-1]`}>
        <div className="pt-20 pb-10 px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-slate-800 text-base font-bold py-3 border-b border-gray-100 flex justify-between items-center w-full text-left"
            >
              {link.name}
              <span className="text-indigo-500">→</span>
            </button>
          ))}
          <button
            onClick={(e) => scrollToSection(e, '#register')}
            className="bg-indigo-600 text-white py-4 rounded-xl text-center font-black shadow-md mt-4 w-full"
          >
            Đăng ký tư vấn ngay
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
