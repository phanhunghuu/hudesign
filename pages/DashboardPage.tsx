
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Download, GraduationCap, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkUser();
  }, [navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-indigo-600 p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-[2rem] flex items-center justify-center text-4xl font-black shadow-inner">
              {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-black">Chào {user?.user_metadata?.full_name || 'Học viên'}!</h1>
              <p className="text-indigo-100 font-medium">Bắt đầu hành trình sáng tạo của bạn ngay hôm nay.</p>
            </div>
          </div>
          <div className="flex bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 items-center space-x-4">
             <GraduationCap className="text-indigo-200" size={32} />
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 leading-none mb-1">Cấp độ học viên</p>
               <p className="font-black text-lg">Học viên mới</p>
             </div>
          </div>
        </div>

        <div className="p-8 md:p-12 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black flex items-center space-x-2 text-slate-900">
                  <Package className="text-indigo-600" />
                  <span>Tài nguyên đã mua</span>
                </h2>
                <span className="text-xs font-bold text-slate-400">0 sản phẩm</span>
              </div>
              
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                   <Download size={32} />
                </div>
                <div className="space-y-1">
                  <p className="text-slate-600 font-black">Bạn chưa mua tài nguyên nào</p>
                  <p className="text-slate-400 text-sm">Ghé thăm cửa hàng để nâng cấp bộ công cụ thiết kế của bạn.</p>
                </div>
                <button onClick={() => navigate('/shop')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-700 transition-all">Ghé thăm Store</button>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100 space-y-6">
              <h2 className="text-xl font-black text-indigo-900">Lịch học sắp tới</h2>
              <div className="flex items-start space-x-4">
                 <div className="bg-white p-3 rounded-xl shadow-sm"><AlertCircle className="text-indigo-600" /></div>
                 <div className="space-y-1">
                   <p className="text-sm font-bold text-indigo-900 leading-tight">Chưa có lịch học đăng ký</p>
                   <p className="text-xs text-indigo-700 font-medium">Bạn có thể đăng ký khóa học 1 kèm 1 bất cứ lúc nào.</p>
                 </div>
              </div>
              <button onClick={() => navigate('/courses')} className="w-full bg-white text-indigo-600 py-4 rounded-xl font-black text-sm shadow-sm hover:shadow-md transition-all">Xem khóa học</button>
            </section>
            
            <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
               <h3 className="font-black text-lg mb-4">Hỗ trợ 24/7</h3>
               <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">Bạn gặp vấn đề về bài học hoặc tài nguyên? Nhắn tin ngay cho Huy để được hỗ trợ nhé!</p>
               <a href="https://m.me/hudesign" target="_blank" rel="noreferrer" className="block w-full text-center bg-indigo-600 py-4 rounded-xl font-black text-sm hover:bg-indigo-700 transition-all">Nhắn tin qua Zalo/FB</a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
