
import React from 'react';
import { Crown, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-zinc-900 w-full max-w-md rounded-3xl border border-amber-500/30 shadow-2xl shadow-amber-500/10 overflow-hidden animate-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl rounded-full"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner ring-1 ring-white/30">
              <Crown className="text-white w-8 h-8" fill="currentColor" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Nâng cấp HuAI Pro</h2>
            <p className="text-amber-100 text-sm font-medium mt-1">Mở khóa sức mạnh sáng tạo không giới hạn</p>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"><X size={20} /></button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <ul className="space-y-3">
            {[
              "Sử dụng Model Gemini 3.0 Pro (Thông minh hơn)",
              "Xuất ảnh độ phân giải cao 2K, 4K",
              "Ưu tiên tốc độ xử lý",
              "Không giới hạn lượt tạo mỗi ngày",
              "Hỗ trợ thương mại hóa hình ảnh"
            ].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-zinc-300 text-sm">
                <div className="mt-0.5 bg-amber-500/20 p-1 rounded-full text-amber-500 shrink-0">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <Link 
              to="/pricing" 
              className="block w-full bg-amber-500 hover:bg-amber-400 text-zinc-900 font-black text-center py-4 rounded-xl uppercase tracking-widest transition-all shadow-lg hover:shadow-amber-500/20 active:scale-95"
            >
              Nâng cấp ngay - 99k/tháng
            </Link>
            <button 
              onClick={onClose} 
              className="block w-full text-zinc-500 text-xs font-bold text-center mt-4 hover:text-zinc-300 transition-colors"
            >
              Tôi sẽ dùng bản miễn phí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
