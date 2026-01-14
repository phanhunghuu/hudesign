
import React, { useState, useEffect } from 'react';
import { X, Check, Copy, AlertCircle, Send, Loader2, Mail, Image as ImageIcon, User, LogIn, ZoomIn, Info } from 'lucide-react';
import { Product } from '../types';
import { supabase } from '../supabaseClient';
import AuthModal from './AuthModal';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const bankInfo = {
    bank: 'VIETCOMBANK',
    accountNumber: '1015064592',
    accountName: 'PHAN HUNG HUU',
    content: `HUDESIGN ${product.code}`
  };

  const qrUrl = `https://img.vietqr.io/image/${bankInfo.bank}-${bankInfo.accountNumber}-compact2.png?amount=${product.price}&addInfo=${encodeURIComponent(bankInfo.content)}&accountName=${encodeURIComponent(bankInfo.accountName)}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowAuth(true);
      return;
    }

    setStatus('submitting');
    
    try {
      const { error: dbError } = await supabase
        .from('purchases')
        .insert([
          { 
            user_id: user.id, 
            product_id: product.id, 
            product_code: product.code,
            amount: product.price,
            status: 'pending' 
          }
        ]);

      if (dbError) throw dbError;

      const TELEGRAM_BOT_TOKEN = "7496763782:AAFOYZzRsBNgCLpdDlJWXMUBwmKwtzCXQBI";
      const TELEGRAM_CHAT_ID = "308222651";
      const message = `
🔔 *YÊU CẦU MUA TÀI NGUYÊN*
📧 *Khách hàng:* ${user.email}
💰 *Số tiền:* ${product.price.toLocaleString()} đ
🆔 *Mã SP:* ${product.code}
📝 *Tên SP:* ${product.name}
---
Admin vui lòng vào Supabase để XÁC NHẬN đơn hàng này nhé!
      `;

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      setStatus('success');
    } catch (err) {
      console.error("Payment Confirmation Error:", err);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
      setStatus('idle');
    }
  };

  if (showAuth) {
    return <AuthModal isOpen={true} onClose={() => setShowAuth(false)} onLoginSuccess={(u) => { setUser(u); setShowAuth(false); }} />;
  }

  const CategoryNote = () => {
    if (product.category === 'Canva') {
      return (
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3 text-blue-700 text-[11px] leading-relaxed mb-6">
          <Info size={16} className="shrink-0 text-blue-600" />
          <p>
            <strong className="font-black">Mẫu Canva:</strong> Vui lòng chọn <strong className="font-black">Tệp -&gt; Tạo bản sao</strong> để lưu file về tài khoản Canva của mình và chỉnh sửa. <em className="italic opacity-80">Một số mẫu có thể yêu cầu tài khoản Canva Pro để xuất file.</em>
          </p>
        </div>
      );
    }
    if (product.category === 'Photoshop' || product.category === 'Illustrator') {
      return (
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3 text-amber-700 text-[11px] leading-relaxed mb-6">
          <AlertCircle size={16} className="shrink-0 text-amber-600" />
          <p>
            <strong className="font-black">Lưu ý:</strong> Tài nguyên Photoshop, Illustrator cần các phần mềm chuyên dụng để mở, hãy lưu ý khi mua file.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
          <X size={20} />
        </button>

        <div className="md:w-3/5 p-6 md:p-10 bg-slate-50 overflow-y-auto no-scrollbar">
          <div className="aspect-video rounded-3xl overflow-hidden mb-8 shadow-lg bg-white relative group cursor-zoom-in" onClick={() => setSelectedPreview(product.image)}>
            {!mainImageLoaded && <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>}
            <img 
              src={product.image} 
              onLoad={() => setMainImageLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${mainImageLoaded ? 'opacity-100' : 'opacity-0'}`} 
              alt={product.name} 
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <ZoomIn className="text-white" size={32} />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
             <span className="bg-indigo-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{product.code}</span>
             <span className="bg-white text-slate-400 text-[9px] font-bold px-3 py-1 rounded-full border border-slate-100 uppercase tracking-widest">{product.category}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">{product.name}</h2>
          
          <CategoryNote />
          
          <p className="text-slate-500 mb-8 text-sm md:text-base leading-relaxed">{product.description}</p>
          
          {/* HIỂN THỊ ẢNH REVIEW TẠI ĐÂY */}
          {product.reviewImages && product.reviewImages.length > 0 && (
            <div className="space-y-4 mb-10">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Ảnh Review chi tiết</h4>
              <div className="grid grid-cols-2 gap-4">
                {product.reviewImages.map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white shadow-sm cursor-zoom-in group relative" onClick={() => setSelectedPreview(img)}>
                    <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={`Review ${i+1}`} />
                    <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Đặc điểm nổi bật</h4>
            {product.features.map((f, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="mt-1 bg-indigo-100 p-0.5 rounded-full flex-shrink-0">
                  <Check size={12} className="text-indigo-600" />
                </div>
                <span className="text-sm font-bold text-slate-700">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-2/5 p-8 md:p-12 overflow-y-auto border-l border-slate-100 bg-white no-scrollbar">
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 py-10">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
                <Check size={48} className="text-green-600" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 uppercase">Thông báo đã gửi!</h3>
                <div className="text-slate-600 font-medium leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-3 text-sm text-left">
                  <p>Hủ đã nhận được thông báo của bạn cho mã <strong className="text-indigo-600">[{product.code}]</strong>.</p>
                  <p>Mình sẽ xác nhận trong vòng <strong className="text-slate-900">15 - 30 phút</strong>.</p>
                  <p>Link tải sẽ xuất hiện tại mục <strong className="text-indigo-600">"Tài nguyên đã mua"</strong> trong tài khoản của bạn.</p>
                </div>
              </div>
              <button onClick={onClose} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all uppercase tracking-widest w-full">Đã hiểu</button>
            </div>
          ) : (
            <div className="space-y-8">
              {!user ? (
                <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100 text-center space-y-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm text-indigo-600">
                    <User size={24} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-indigo-900 text-sm">Vui lòng đăng nhập</h3>
                    <p className="text-xs text-indigo-700">Bạn cần có tài khoản để quản lý tài nguyên đã mua.</p>
                  </div>
                  <button onClick={() => setShowAuth(true)} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                    <LogIn size={14} />
                    <span>Đăng nhập ngay</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-3">Quét mã QR để mua hàng</p>
                    <div className="inline-block p-4 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-sm relative group">
                       <img src={qrUrl} alt="QR Thanh toán" className="w-48 h-48 md:w-full" loading="lazy" />
                    </div>
                    <p className="mt-4 text-3xl font-black text-slate-900 tracking-tight">{product.price.toLocaleString('vi-VN')} đ</p>
                  </div>

                  <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-bold">Nội dung CK:</span>
                      <button onClick={() => copyToClipboard(bankInfo.content)} className="flex items-center space-x-2 text-indigo-600 font-black hover:opacity-70 bg-white px-3 py-1.5 rounded-lg border border-indigo-100 shadow-sm transition-all active:scale-95">
                        <span>{bankInfo.content}</span>
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <div className="flex items-start space-x-3 text-[10px] text-amber-600 bg-amber-50 p-3 rounded-xl border border-amber-100">
                      <AlertCircle size={16} className="shrink-0" />
                      <p className="font-bold leading-tight uppercase text-left">Nhập chính xác nội dung để link tải được mở khóa nhanh nhất.</p>
                    </div>
                  </div>

                  <button 
                    onClick={handleConfirmPayment}
                    disabled={status === 'submitting'}
                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-sm flex items-center justify-center space-x-3 shadow-xl hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest"
                  >
                    {status === 'submitting' ? <Loader2 className="animate-spin" /> : <Check size={18} />}
                    <span>Tôi đã chuyển khoản</span>
                  </button>
                  <p className="text-center text-[10px] text-slate-400 font-medium italic">Sau khi bấm, Hủ sẽ nhận được thông báo để xác nhận.</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedPreview && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl animate-in fade-in" onClick={() => setSelectedPreview(null)}>
           <button className="absolute top-8 right-8 text-white hover:scale-110 transition-transform">
              <X size={40} />
           </button>
           <img src={selectedPreview} className="max-w-full max-h-[90vh] rounded-3xl shadow-2xl object-contain animate-in zoom-in duration-300" alt="Full Preview" />
        </div>
      )}
    </div>
  );
};

export default ProductModal;
