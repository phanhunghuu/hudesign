
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UserCircle, LogOut, ChevronDown, Mail, LayoutDashboard } from 'lucide-react';
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
  const navLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Khóa học', href: '/courses' },
    { name: 'Tài nguyên', href: '/shop' },
    { name: 'Blog', href: '/blog' },
    { name: 'Về tôi', href: '/about' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled || !isHome ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center outline-none">
              <img src="https://i.postimg.cc/prJR9FbQ/15.png" alt="Logo" className={`h-8 md:h-12 w-auto transition-all ${!scrolled && isHome && !isOpen ? 'brightness-0 invert' : ''}`} />
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.href} className={`text-sm font-bold transition-colors hover:text-indigo-500 ${scrolled || !isHome ? 'text-slate-700' : 'text-white'}`}>
                  {link.name}
                </Link>
              ))}
              
              <div className="h-6 w-[1px] bg-slate-200"></div>

              {user ? (
                <div className="relative">
                  <button onClick={() => setShowUserMenu(!showUserMenu)} className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border ${scrolled || !isHome ? 'text-slate-900 border-slate-100 hover:bg-slate-50' : 'text-white border-white/20 hover:bg-white/10'}`}>
                    <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-[10px] font-black uppercase">{user.name.charAt(0)}</div>
                    <span className="text-sm font-black">{user.name}</span>
                    <ChevronDown size={14} className={showUserMenu ? 'rotate-180' : ''} />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border py-2 animate-in fade-in zoom-in">
                      <Link to="/dashboard" className="w-full text-left px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center space-x-3" onClick={() => setShowUserMenu(false)}>
                        <LayoutDashboard size={16} className="text-indigo-500" />
                        <span>Bàn làm việc</span>
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 flex items-center space-x-3">
                        <LogOut size={16} />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => setIsAuthOpen(true)} className={`text-sm font-black ${scrolled || !isHome ? 'text-slate-900' : 'text-white'}`}>Đăng nhập</button>
              )}
            </div>
            
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
              {isOpen ? <X size={24} className={scrolled || !isHome ? 'text-slate-900' : 'text-white'} /> : <Menu size={24} className={scrolled || !isHome ? 'text-slate-900' : 'text-white'} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-b absolute top-full left-0 w-full p-6 flex flex-col space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="text-slate-800 font-bold text-lg" onClick={() => setIsOpen(false)}>{link.name}</Link>
            ))}
            {user ? (
               <Link to="/dashboard" className="bg-indigo-50 text-indigo-600 font-bold p-4 rounded-xl flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                <LayoutDashboard size={20} />
                <span>Vào Dashboard</span>
               </Link>
            ) : (
              <button onClick={() => { setIsAuthOpen(true); setIsOpen(false); }} className="bg-indigo-600 text-white font-bold p-4 rounded-xl">Đăng nhập ngay</button>
            )}
          </div>
        )}
      </nav>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={(u) => setUser(u)} />
    </>
  );
};

export default Navbar;
