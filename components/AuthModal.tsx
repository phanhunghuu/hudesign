
import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Loader2, Github, Chrome, CheckCircle2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: {name: string, email: string}) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // ĐĂNG NHẬP THẬT VỚI SUPABASE
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) throw signInError;

        if (data?.user) {
          const displayName = data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || "Học viên";
          onLoginSuccess({ name: displayName, email: data.user.email || "" });
          onClose();
        }
      } else {
        // ĐĂNG KÝ THẬT VỚI SUPABASE
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
            }
          }
        });

        if (signUpError) throw signUpError;

        if (data?.user) {
          setSuccess(true);
          setTimeout(() => {
            onLoginSuccess({ 
              name: formData.name || formData.email.split('@')[0], 
              email: formData.email 
            });
            setSuccess(false);
            onClose();
          }, 1500);
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      // Chuyển đổi thông báo lỗi sang tiếng Việt cho thân thiện
      let msg = err.message;
      if (msg.includes('Invalid login credentials')) msg = 'Email hoặc mật khẩu không chính xác!';
      if (msg.includes('User already registered')) msg = 'Email này đã được đăng ký!';
      if (msg.includes('Password should be')) msg = 'Mật khẩu cần tối thiểu 6 ký tự!';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10">
          <X size={18} />
        </button>

        <div className="p-8 md:p-10">
          {success ? (
            <div className="text-center py-10 space-y-6 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">Đăng ký thành công!</h2>
                <p className="text-slate-500 mt-2">Đang đưa bạn vào hệ thống học tập...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-4">
                  <User className="text-indigo-600 w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  {isLogin ? 'Chào mừng quay lại!' : 'Tham gia Hudesign'}
                </h2>
                <p className="text-slate-500 text-sm mt-2">
                  {isLogin ? 'Đăng nhập để quản lý tài nguyên của bạn' : 'Tạo tài khoản để bắt đầu học thiết kế ngay'}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold text-center animate-shake">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Họ và tên</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Nguyễn Văn A" 
                        className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all" 
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="example@gmail.com" 
                      className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mật khẩu</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required 
                      type="password" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••" 
                      className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition-all" 
                    />
                  </div>
                </div>

                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : (
                    <>
                      <span>{isLogin ? 'Đăng nhập' : 'Đăng ký ngay'}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-slate-500 font-medium">
                {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-indigo-600 font-black hover:underline"
                >
                  {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
