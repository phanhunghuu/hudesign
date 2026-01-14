
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Package, Download, GraduationCap, Clock, AlertCircle, 
  User, Mail, Lock, CheckCircle2, ChevronRight, Settings2, 
  ExternalLink, FileText, Loader2, Save, RefreshCw, LogOut,
  ShieldCheck, Smartphone, BadgeCheck, ShieldAlert, Info
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import { PRODUCTS } from '../products';

const DashboardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'resources' | 'profile'>('resources');
  const [purchases, setPurchases] = useState<any[]>([]);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'resources' || tab === 'profile') {
      setActiveTab(tab as 'resources' | 'profile');
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/');
        return;
      }
      setUser(session.user);
      setNewName(session.user.user_metadata?.full_name || '');
      
      const { data: purchaseData, error } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (purchaseData) {
        const enriched = purchaseData.map(p => {
          const product = PRODUCTS.find(prod => prod.id === p.product_id);
          return { ...p, product };
        });
        setPurchases(enriched);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  const handleUpdateProfile = async () => {
    setUpdatingProfile(true);
    const { error } = await supabase.auth.updateUser({
      data: { full_name: newName }
    });
    if (error) alert("Có lỗi xảy ra: " + error.message);
    else {
      alert("Cập nhật tên thành công!");
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user);
    }
    setUpdatingProfile(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="text-slate-400 font-black text-xs uppercase tracking-widest">Đang tải dữ liệu...</p>
      </div>
    </div>
  );

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0];
  const isEmailVerified = user?.email_confirmed_at != null;

  const ResourceUsageNote = ({ category }: { category: string }) => {
    if (category === 'Canva') {
      return (
        <div className="bg-blue-50/50 p-3 rounded-xl flex gap-2 text-[10px] text-blue-700 mb-3 border border-blue-100/50">
          <Info size={14} className="shrink-0 text-blue-600" />
          <p>
            <strong className="font-black">Mẫu Canva:</strong> Vui lòng chọn <strong className="font-black">Tệp -&gt; Tạo bản sao</strong> để lưu file về tài khoản Canva của mình và chỉnh sửa. <em className="italic opacity-80">Một số mẫu có thể yêu cầu tài khoản Canva Pro để xuất file.</em>
          </p>
        </div>
      );
    }
    if (category === 'Photoshop' || category === 'Illustrator') {
      return (
        <div className="bg-amber-50/50 p-3 rounded-xl flex gap-2 text-[10px] text-amber-700 mb-3 border border-amber-100/50">
          <AlertCircle size={14} className="shrink-0 text-amber-600" />
          <p>
            <strong className="font-black">Lưu ý:</strong> Bạn cần có phần mềm Adobe chuyên dụng để mở và chỉnh sửa tài nguyên này.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-10">
          <div className="bg-indigo-600 p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center text-4xl font-black shadow-inner border border-white/20">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="text-center md:text-left space-y-2">
                <h1 className="text-3xl md:text-4xl font-black leading-tight">Chào {displayName}!</h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                   <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                      <ShieldCheck size={14} className="text-indigo-200" />
                      <p className="text-indigo-100 font-medium text-xs">VIP Member</p>
                   </div>
                   {isEmailVerified ? (
                     <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30">
                        <BadgeCheck size={14} className="text-green-300" />
                        <p className="text-green-100 font-medium text-xs uppercase tracking-widest">Đã xác minh</p>
                     </div>
                   ) : (
                     <div className="flex items-center gap-2 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
                        <ShieldAlert size={14} className="text-amber-300" />
                        <p className="text-amber-100 font-medium text-xs uppercase tracking-widest">Chưa xác minh</p>
                     </div>
                   )}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 relative z-10">
               <button onClick={handleLogout} className="bg-red-500/20 hover:bg-red-500 text-white px-6 py-4 rounded-3xl transition-all border border-white/10 flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest group">
                 <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                 <span>Đăng xuất</span>
               </button>
            </div>
          </div>

          <div className="flex border-b border-slate-100 px-8">
            <button 
              onClick={() => setActiveTab('resources')}
              className={`px-8 py-6 text-xs font-black uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 ${activeTab === 'resources' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              <Package size={16} />
              <span>Tài nguyên đã mua</span>
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`px-8 py-6 text-xs font-black uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 ${activeTab === 'profile' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              <Settings2 size={16} />
              <span>Cài đặt hồ sơ</span>
            </button>
          </div>

          <div className="p-8 md:p-12">
            {activeTab === 'resources' ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between mb-4">
                   <h2 className="text-xl font-black text-slate-900">Kho tài nguyên cá nhân</h2>
                   <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">Tổng: {purchases.length} sản phẩm</span>
                </div>
                {purchases.length === 0 ? (
                  <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] p-16 text-center space-y-6">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                       <Download size={40} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl font-black text-slate-900">Bạn chưa sở hữu tài nguyên nào</p>
                      <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium">Nâng cấp bộ công cụ thiết kế của bạn với kho template chất lượng cao từ Hủ.</p>
                    </div>
                    <button onClick={() => navigate('/shop')} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-indigo-700 transition-all active:scale-95">Ghé thăm Store ngay</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {purchases.map((item) => (
                      <div key={item.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-6 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-all group">
                         <div className="w-full sm:w-36 h-36 rounded-3xl overflow-hidden bg-slate-100 shrink-0 shadow-sm">
                            <img src={item.product?.image || 'https://via.placeholder.com/300'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                         </div>
                         <div className="flex-grow flex flex-col justify-between py-1">
                            <div>
                               <div className="flex items-center gap-2 mb-2">
                                  <span className="bg-indigo-600 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest">{item.product_code}</span>
                                  <span className="text-slate-300 text-[9px]">•</span>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Clock size={10} /> {new Date(item.created_at).toLocaleDateString('vi-VN')}</span>
                               </div>
                               <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors mb-2">{item.product?.name || 'Sản phẩm đã gỡ hoặc không tồn tại'}</h3>
                               
                               {item.status === 'completed' && item.product && (
                                 <ResourceUsageNote category={item.product.category} />
                               )}
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-slate-50">
                               {item.status === 'completed' ? (
                                  <a 
                                    href={item.product?.downloadUrl} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-3 bg-indigo-600 text-white hover:bg-slate-900 px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all w-full shadow-lg shadow-indigo-100"
                                  >
                                    <Download size={14} />
                                    <span>Tải lại tài nguyên</span>
                                  </a>
                               ) : (
                                  <div className="flex items-center gap-2 bg-amber-50 text-amber-600 px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest w-full justify-center border border-amber-100/50">
                                    <Clock size={14} className="animate-pulse" />
                                    <span>Đang chờ Hủ xác nhận thanh toán</span>
                                  </div>
                               )}
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-2xl space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <section className="space-y-6">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <User className="text-indigo-600" size={24} />
                    <span>Hồ sơ cá nhân</span>
                  </h3>
                  <div className="grid gap-6 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email đăng ký (Read-only)</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input readOnly value={user?.email} className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-400 font-bold text-sm outline-none cursor-not-allowed" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên hiển thị</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                          type="text" 
                          value={newName} 
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="Nguyễn Văn A" 
                          className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all outline-none" 
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleUpdateProfile}
                      disabled={updatingProfile || newName === user?.user_metadata?.full_name}
                      className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-900 transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2 w-fit"
                    >
                      {updatingProfile ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                      <span>Cập nhật thông tin</span>
                    </button>
                  </div>
                </section>

                <div className="h-[1px] bg-slate-100"></div>

                <section className="space-y-6">
                   <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <Lock className="text-indigo-600" size={24} />
                    <span>Bảo mật & Mật khẩu</span>
                  </h3>
                  <div className="p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] space-y-6">
                    <div className="space-y-2">
                       <p className="text-sm text-slate-600 font-medium leading-relaxed">Để đảm bảo an toàn, Hudesign sử dụng hệ thống reset mật khẩu qua Email. Vui lòng kiểm tra hộp thư (cả mục thư rác) sau khi yêu cầu.</p>
                    </div>
                    <button 
                      onClick={async () => {
                        const { error } = await supabase.auth.resetPasswordForEmail(user.email);
                        if (error) alert(error.message);
                        else alert("Hệ thống đã gửi link đặt lại mật khẩu vào email: " + user.email);
                      }}
                      className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95"
                    >
                      <RefreshCw size={14} />
                      <span>Gửi yêu cầu đổi mật khẩu</span>
                    </button>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
           <div className="md:col-span-2 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8 md:p-10 flex flex-col sm:flex-row items-center gap-8">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0 border border-indigo-100">
                 <Smartphone size={32} />
              </div>
              <div className="text-center sm:text-left">
                 <h4 className="text-xl font-black text-indigo-900 mb-1">Cần hỗ trợ kỹ thuật?</h4>
                 <p className="text-indigo-700 text-sm font-medium">Nhắn tin cho Hủ qua Zalo (0912.412.132) nếu bạn gặp vấn đề khi tải file hoặc xác thực tài khoản nhé!</p>
              </div>
              <button onClick={() => window.open('https://zalo.me/0912412132', '_blank')} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-slate-900 transition-all shrink-0">Chat Zalo</button>
           </div>
           <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-center">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/20 blur-3xl rounded-full"></div>
              <div className="relative z-10 space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Đặc quyền học viên</p>
                 <h4 className="text-xl font-black leading-tight">Mở khóa giáo trình độc quyền</h4>
                 <p className="text-slate-400 text-xs font-medium leading-relaxed">Bạn sẽ nhận được thông báo khi Hủ cập nhật tài nguyên mới hàng tháng.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
