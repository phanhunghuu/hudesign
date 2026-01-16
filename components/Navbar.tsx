
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UserCircle, LogOut, ChevronDown, Mail, LayoutDashboard, PenTool, ShoppingCart, Settings, Sparkles } from 'lucide-react';
import AuthModal from './AuthModal';
import { supabase } from '../supabaseClient';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) setUser({
        name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || "Học viên",
        email: session.user.email || ""
      });
    };
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setUser({
        name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || "Học viên",
        email: session.user.email || ""
      });
      else setUser(null);
    });
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowUserMenu(false);
  };

  // Nếu đang ở trang AI Studio, ẩn Navbar đi hoặc đổi style
  const isAiStudio = location.pathname === '/ai-studio';
  if (isAiStudio) return null; // Ẩn Navbar khi ở trang AI Studio

  const navbarClasses = scrolled 
    ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm py-3' 
    : 'bg-transparent py-5';

  const linkClasses = 'text-slate-900 hover:text-indigo-600 font-bold';

  const navLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Khóa học', href: '/courses' },
    { name: 'Dự án', href: '/portfolio' },
    { name: 'Tài nguyên', href: '/shop' },
    { name: 'Book Thiết kế', href: '/design-brief' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[90] md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <nav className={`fixed w-full z-[100] transition-all duration-500 ease-in-out ${navbarClasses}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center outline-none">
              <img 
                src="https://res.cloudinary.com/dcwgy4tnb/image/upload/f_auto/v1767743711/15_k80j2r.png" 
                alt="Logo" 
                className="h-8 md:h-11 w-auto transition-all duration-300" 
              />
            </Link>
            
            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className={`text-sm tracking-tight transition-all duration-300 ${linkClasses}`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="h-4 w-[1px] bg-slate-200"></div>

              {/* AI STUDIO BUTTON MOVED HERE */}
              <Link 
                to="/ai-studio" 
                className="flex items-center space-x-1.5 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full transition-all bg-zinc-900 text-white hover:bg-zinc-800 shadow-md hover:shadow-lg active:scale-95 border border-zinc-700"
              >
                <Sparkles size={14} className="text-violet-400" />
                <span>AI Studio</span>
              </Link>

              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)} 
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border transition-all text-slate-900 border-slate-200 bg-white/50 hover:bg-white hover:shadow-sm"
                  >
                    <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black uppercase shadow-sm">{user.name.charAt(0)}</div>
                    <span className="text-sm font-black">{user.name}</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-[1.5rem] shadow-xl border border-slate-100 p-2 animate-in fade-in zoom-in slide-in-from-top-2 duration-300">
                      <Link 
                        to="/dashboard?tab=resources" 
                        className="w-full text-left px-5 py-4 text-sm font-black text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl flex items-center space-x-4 transition-all" 
                        onClick={() => setShowUserMenu(false)}
                      >
                        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><LayoutDashboard size={18} /></div>
                        <span>Tài nguyên của tôi</span>
                      </Link>
                      <Link 
                        to="/dashboard?tab=profile" 
                        className="w-full text-left px-5 py-4 text-sm font-black text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl flex items-center space-x-4 transition-all" 
                        onClick={() => setShowUserMenu(false)}
                      >
                        <div className="bg-slate-100 p-2 rounded-lg text-slate-500"><Settings size={18} /></div>
                        <span>Cài đặt hồ sơ</span>
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left px-5 py-4 text-sm font-black text-red-500 hover:bg-red-50 rounded-xl flex items-center space-x-4 transition-all border-t border-slate-50 mt-2">
                        <div className="bg-red-100 p-2 rounded-lg text-red-600"><LogOut size={18} /></div>
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setIsAuthOpen(true)} 
                  className="text-sm font-black px-5 py-2 rounded-xl transition-all bg-slate-100 text-slate-900 border border-slate-200 hover:bg-white hover:shadow-md active:scale-95"
                >
                  Đăng nhập
                </button>
              )}
            </div>
            
            {/* MOBILE MENU TOGGLE */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 rounded-xl transition-colors text-slate-900 hover:bg-slate-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* MOBILE MENU CONTENT */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-100 absolute top-full left-0 w-full p-4 flex flex-col space-y-2 shadow-2xl animate-in slide-in-from-top duration-300 origin-top">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className="text-slate-800 font-bold text-sm hover:text-indigo-600 transition-colors py-2.5 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between group" 
                onClick={() => setIsOpen(false)}
              >
                <span>{link.name}</span>
                <span className="text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">→</span>
              </Link>
            ))}

            <div className="h-[1px] bg-slate-100 my-1"></div>

            <Link 
              to="/ai-studio"
              onClick={() => setIsOpen(false)}
              className="text-white font-bold text-sm bg-zinc-900 hover:bg-zinc-800 transition-colors py-3 px-4 rounded-xl flex items-center justify-between group shadow-lg"
            >
               <span className="flex items-center gap-2"><Sparkles size={16} className="text-violet-400" /> AI Studio</span>
               <span className="text-zinc-500 group-hover:text-white transition-colors">→</span>
            </Link>
            
            <div className="pt-2">
               {user ? (
                 <Link 
                   to="/dashboard?tab=resources" 
                   className="bg-slate-100 text-slate-700 font-bold p-3 rounded-xl flex flex-col items-center justify-center gap-1 text-xs text-center hover:bg-slate-200 active:scale-95 transition-all w-full" 
                   onClick={() => setIsOpen(false)}
                 >
                   <LayoutDashboard size={16} />
                   <span>Tài khoản</span>
                 </Link>
               ) : (
                 <button 
                   onClick={() => { setIsAuthOpen(true); setIsOpen(false); }} 
                   className="bg-white border border-slate-200 text-slate-900 font-bold p-3 rounded-xl flex flex-col items-center justify-center gap-1 text-xs text-center hover:bg-slate-50 active:scale-95 transition-all w-full"
                 >
                   <UserCircle size={16} />
                   <span>Đăng nhập</span>
                 </button>
               )}
            </div>
          </div>
        )}
      </nav>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={(u) => setUser(u)} />
    </>
  );
};

export default Navbar;
