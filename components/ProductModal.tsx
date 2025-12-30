
import React, { useState } from 'react';
import { X, Check, Copy, AlertCircle, Send, Loader2, Mail, Image as ImageIcon } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Thông tin ngân hàng
  const bankInfo = {
    bank: 'MBBANK',
    accountNumber: '0912412132',
    accountName: 'HUYNH NGOC HUY',
    content: `HUDESIGN ${product.id}`
  };

  const qrUrl = `https://img.vietqr.io/image/${bankInfo.bank}-${bankInfo.accountNumber}-compact2.png?amount=${product.price}&addInfo=${encodeURIComponent(bankInfo.content)}&accountName=${encodeURIComponent(bankInfo.accountName)}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Giả lập gửi thông báo về hệ thống
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
          <X size={20} />
        </button>

        {/* Product Info Side */}
        <div className="md:w-1/2 p-6 md:p-10 bg-slate-50 overflow-y-auto custom-scrollbar">
          <div className="aspect-square rounded-3xl overflow-hidden mb-6 shadow-lg bg-white">
            <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
          </div>
          
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">{product.name}</h2>
          
          <p className="text-slate-500 mb-6 text-sm leading-relaxed">{product.description}</p>
          
          <div className="space-y-3 mb-8">
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

          {/* Review Images Section */}
          {product.reviewImages && product.reviewImages.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-center space-x-2 text-indigo-600">
                <ImageIcon size={16} />
                <h4 className="text-sm font-black uppercase tracking-wider">Ảnh Review Thực Tế</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {product.reviewImages.slice(0, 4).map((img, i) => (
                  <div 
                    key={i} 
                    className="aspect-square rounded-2xl overflow-hidden shadow-sm border border-white cursor-pointer group relative"
                    onClick={() => setPreviewImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`Review ${i + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/20 transition-colors flex items-center justify-center">
                      <div className="bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                        <ImageIcon size={14} className="text-indigo-600" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Payment Side */}
        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto border-l border-slate-100 bg-white custom-scrollbar">
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
                <Check size={48} className="text-green-600" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900">Gửi thông báo thành công!</h3>
                <div className="text-slate-600 font-medium leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-2 text-sm">
                  <p>Cảm ơn bạn đã tin tưởng Hudesign.</p>
                  <p>Xin vui lòng kiểm tra hộp thư (mail) trong vòng 24h.</p>
                  <p>Nếu không có vui lòng liên hệ hotline: <br/><span className="text-indigo-600 font-black text-base">0912.412.132</span></p>
                </div>
              </div>
              <button onClick={onClose} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all">
                Quay lại cửa hàng
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-3">Quét mã để thanh toán</p>
                <div className="inline-block p-4 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-sm relative group">
                   <img src={qrUrl} alt="QR Thanh toán" className="w-48 h-48 md:w-60 md:h-60" />
                   <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-[2.5rem]"></div>
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
                  <p className="font-bold leading-tight uppercase">Vui lòng nhập đúng nội dung để chúng tôi gửi file qua Email nhanh nhất.</p>
                </div>
              </div>

              <form onSubmit={handleConfirm} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email nhận tài nguyên *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required type="email" placeholder="Nhập email của bạn để nhận file" className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-sm transition-all" />
                  </div>
                </div>
                <button 
                  disabled={status === 'submitting'}
                  className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-sm flex items-center justify-center space-x-3 shadow-xl hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
                >
                  {status === 'submitting' ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                  <span>Tôi đã chuyển khoản</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Image Preview */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[200] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setPreviewImage(null)}
        >
          <button className="absolute top-10 right-10 text-white hover:rotate-90 transition-transform p-2 bg-white/10 rounded-full">
            <X size={32} />
          </button>
          <img 
            src={previewImage} 
            className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain animate-in zoom-in duration-300" 
            alt="Enlarged Review" 
          />
        </div>
      )}
    </div>
  );
};

export default ProductModal;
