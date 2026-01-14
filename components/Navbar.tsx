
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UserCircle, LogOut, ChevronDown, Mail, LayoutDashboard, PenTool, ShoppingCart, Settings } from 'lucide-react';
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

  const isHome = location.pathname === '/';
  
  const navbarClasses = scrolled || !isHome 
    ? 'bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg py-3' 
    : 'bg-transparent py-5';

  const linkClasses = scrolled || !isHome 
    ? 'text-slate-900 hover:text-indigo-600' 
    : 'text-white hover:text-indigo-200';

  const navLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Khóa học', href: '/courses' },
    { name: 'Dự án', href: '/portfolio' },
    { name: 'Tài nguyên', href: '/shop' },
    { name: 'Về tôi', href: '/about' },
  ];

  return (
    <>
      {/* Mobile Menu Backdrop - Click to close */}
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
                className={`h-8 md:h-11 w-auto transition-all duration-300 ${!scrolled && isHome && !isOpen ? 'brightness-0 invert' : ''}`} 
              />
            </Link>
            
            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className={`text-sm font-bold tracking-tight transition-all duration-300 ${linkClasses}`}
                >
                  {link.name}
                </Link>
              ))}
              
              <Link 
                to="/design-brief" 
                className={`flex items-center space-x-2 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full transition-all ${scrolled || !isHome ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/20 text-white border border-white/30 backdrop-blur-md'}`}
              >
                <PenTool size={14} />
                <span>Book Thiết kế</span>
              </Link>

              <div className={`h-4 w-[1px] ${scrolled || !isHome ? 'bg-slate-300' : 'bg-white/30'}`}></div>

              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)} 
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border transition-all ${scrolled || !isHome ? 'text-slate-900 border-slate-200 bg-white/50 hover:bg-white' : 'text-white border-white/20 hover:bg-white/10'}`}
                  >
                    <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black uppercase shadow-sm">{user.name.charAt(0)}</div>
                    <span className="text-sm font-black">{user.name}</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white p-2 animate-in fade-in zoom-in slide-in-from-top-2 duration-300">
                      <Link 
                        to="/dashboard?tab=resources" 
                        className="w-full text-left px-5 py-4 text-sm font-black text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl flex items-center space-x-4 transition-all" 
                        onClick={() => setShowUserMenu(false)}
                      >
                        <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600"><LayoutDashboard size={18} /></div>
                        <span>Tài nguyên của tôi</span>
                      </Link>
                      <Link 
                        to="/dashboard?tab=profile" 
                        className="w-full text-left px-5 py-4 text-sm font-black text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl flex items-center space-x-4 transition-all" 
                        onClick={() => setShowUserMenu(false)}
                      >
                        <div className="bg-slate-100 p-2 rounded-xl text-slate-500"><Settings size={18} /></div>
                        <span>Cài đặt hồ sơ</span>
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left px-5 py-4 text-sm font-black text-red-500 hover:bg-red-50 rounded-2xl flex items-center space-x-4 transition-all border-t border-slate-100 mt-2">
                        <div className="bg-red-100 p-2 rounded-xl text-red-600"><LogOut size={18} /></div>
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setIsAuthOpen(true)} 
                  className={`text-sm font-black px-5 py-2 rounded-xl transition-all ${scrolled || !isHome ? 'bg-slate-900 text-white hover:bg-indigo-600 shadow-md' : 'text-white hover:bg-white/10'}`}
                >
                  Đăng nhập
                </button>
              )}
            </div>
            
            {/* MOBILE MENU TOGGLE */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`md:hidden p-2 rounded-xl transition-colors ${scrolled || !isHome || isOpen ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* MOBILE MENU CONTENT - Compact Version */}
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
            
            <div className="grid grid-cols-2 gap-2 pt-2">
               <Link 
                 to="/design-brief" 
                 className="bg-indigo-600 text-white font-bold p-3 rounded-xl flex flex-col items-center justify-center gap-1 text-xs text-center hover:bg-indigo-700 active:scale-95 transition-all" 
                 onClick={() => setIsOpen(false)}
               >
                 <PenTool size={16} />
                 <span>Book Thiết kế</span>
               </Link>
               
               {user ? (
                 <Link 
                   to="/dashboard?tab=resources" 
                   className="bg-slate-100 text-slate-700 font-bold p-3 rounded-xl flex flex-col items-center justify-center gap-1 text-xs text-center hover:bg-slate-200 active:scale-95 transition-all" 
                   onClick={() => setIsOpen(false)}
                 >
                   <LayoutDashboard size={16} />
                   <span>Tài khoản</span>
                 </Link>
               ) : (
                 <button 
                   onClick={() => { setIsAuthOpen(true); setIsOpen(false); }} 
                   className="bg-slate-900 text-white font-bold p-3 rounded-xl flex flex-col items-center justify-center gap-1 text-xs text-center hover:bg-slate-800 active:scale-95 transition-all"
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
