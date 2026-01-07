
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UserCircle, LogOut, ChevronDown, Mail, LayoutDashboard, PenTool } from 'lucide-react';
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
  
  // Logic class cho Navbar
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
                <span>Brief Thiết kế</span>
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
                    <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white py-2 animate-in fade-in zoom-in slide-in-from-top-2 duration-300">
                      <Link to="/dashboard" className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center space-x-3 transition-colors" onClick={() => setShowUserMenu(false)}>
                        <LayoutDashboard size={16} className="text-indigo-500" />
                        <span>Bàn làm việc</span>
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 flex items-center space-x-3 transition-colors">
                        <LogOut size={16} />
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
            
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`md:hidden p-2 rounded-xl transition-colors ${scrolled || !isHome ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-100 absolute top-full left-0 w-full p-6 flex flex-col space-y-4 shadow-2xl animate-in slide-in-from-top duration-500">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className="text-slate-800 font-black text-xl hover:text-indigo-600 transition-colors py-2" 
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/design-brief" className="bg-indigo-600 text-white font-black p-4 rounded-2xl flex items-center justify-center space-x-2" onClick={() => setIsOpen(false)}>
              <PenTool size={20} />
              <span>Gửi Brief Thiết kế</span>
            </Link>
            <div className="h-[1px] bg-slate-100 my-2"></div>
            {user ? (
               <Link 
                 to="/dashboard" 
                 className="bg-indigo-50 text-indigo-600 font-black p-4 rounded-2xl flex items-center justify-center space-x-2 active:scale-95 transition-transform" 
                 onClick={() => setIsOpen(false)}
               >
                <LayoutDashboard size={20} />
                <span>Vào Dashboard</span>
               </Link>
            ) : (
              <button 
                onClick={() => { setIsAuthOpen(true); setIsOpen(false); }} 
                className="bg-slate-900 text-white font-black p-4 rounded-2xl active:scale-95 transition-transform shadow-lg"
              >
                Đăng nhập ngay
              </button>
            )}
          </div>
        )}
      </nav>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={(u) => setUser(u)} />
    </>
  );
};

export default Navbar;
