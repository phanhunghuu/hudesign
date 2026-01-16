
import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, Loader2, Github, Chrome, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
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
  const [resending, setResending] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('error_code=otp_expired') || hash.includes('error_description=Email+link+is+invalid')) {
      setError('Link xác nhận đã hết hạn hoặc không hợp lệ. Vui lòng đăng ký lại hoặc gửi lại email xác nhận!');
      setIsLogin(false);
    } else if (hash.includes('error_code=')) {
      setError('Có lỗi xảy ra trong quá trình xác thực. Vui lòng thử lại!');
    }
  }, []);

  if (!isOpen) return null;

  const handleResendConfirmation = async () => {
    if (!formData.email) {
      setError('Vui lòng nhập email trước khi yêu cầu gửi lại!');
      return;
    }
    setResending(true);
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: formData.email,
    });
    if (resendError) setError(resendError.message);
    else {
      alert("Đã gửi lại email xác nhận! Vui lòng kiểm tra hộp thư (cả mục thư rác) của bạn.");
      setError('');
    }
    setResending(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // ĐĂNG NHẬP
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
        // ĐĂNG KÝ
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

        // TẠO PROFILE MỚI VỚI 5 CREDITS
        if (data?.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              { 
                id: data.user.id, 
                email: formData.email,
                full_name: formData.name,
                credits: 5, // Tặng 5 lượt
                is_vip: false
              }
            ]);
            
          if (profileError) {
             console.error("Lỗi tạo profile:", profileError);
             // Không throw lỗi chặn dòng chảy, chỉ log lại
          }
        }

        if (data?.user && !data.session) {
          setSuccess(true);
        } else if (data?.session) {
          setSuccess(true);
          setTimeout(() => {
            onLoginSuccess({ 
              name: formData.name || formData.email.split('@')[0], 
              email: formData.email 
            });
            onClose();
          }, 1500);
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      let msg = err.message;
      if (msg.includes('Invalid login credentials')) msg = 'Email hoặc mật khẩu không chính xác!';
      else if (msg.includes('User already registered')) msg = 'Email này đã được đăng ký!';
      else if (msg.includes('Password should be')) msg = 'Mật khẩu cần tối thiểu 6 ký tự!';
      else if (msg.includes('Email not confirmed')) msg = 'Tài khoản chưa được xác minh! Vui lòng kiểm tra email của bạn để kích hoạt.';
      
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10 outline-none">
          <X size={18} />
        </button>

        <div className="p-8 md:p-10">
          {success && !isLogin ? (
            <div className="text-center py-6 space-y-6 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Mail size={40} className="text-indigo-600 animate-bounce" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-black text-slate-900">Kiểm tra Email!</h2>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  Hủ đã gửi một liên kết kích hoạt đến <br/>
                  <strong className="text-indigo-600">{formData.email}</strong>.
                </p>
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-start gap-3 text-left">
                   <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                   <p className="text-[11px] text-amber-700 font-bold leading-tight uppercase tracking-tight">
                     Lưu ý: Sau khi bấm vào link trong mail, nếu trình duyệt báo lỗi "localhost", bạn chỉ cần quay lại trang web này và đăng nhập là được!
                   </p>
                </div>
              </div>
              <div className="pt-4 space-y-3">
                <button 
                  onClick={handleResendConfirmation} 
                  disabled={resending}
                  className="w-full text-indigo-600 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:underline disabled:opacity-50"
                >
                  {resending ? <Loader2 className="animate-spin" size={14} /> : <RefreshCw size={14} />}
                  <span>Chưa nhận được? Gửi lại mail</span>
                </button>
                <button 
                  onClick={() => { setSuccess(false); setIsLogin(true); }} 
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest"
                >
                  Đã xác nhận? Đăng nhập ngay
                </button>
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
                <p className="text-slate-500 text-sm mt-2 font-medium">
                  {isLogin ? 'Đăng nhập để quản lý tài nguyên của bạn' : 'Tạo tài khoản để bắt đầu học thiết kế ngay'}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[11px] font-black text-center animate-shake flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                  </div>
                  {error.includes('chưa được xác minh') && (
                    <button onClick={handleResendConfirmation} className="text-indigo-600 underline">Gửi lại email xác thực</button>
                  )}
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
                        className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" 
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
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" 
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
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" 
                    />
                  </div>
                </div>

                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-sm flex items-center justify-center space-x-2 shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : (
                    <>
                      <span>{isLogin ? 'Đăng nhập' : 'Đăng ký ngay'}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-xs text-slate-400 font-bold uppercase tracking-tight">
                {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                <button 
                  onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(false); }}
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
