
import React from 'react';
import { ShieldCheck, Scale, FileText, AlertCircle, RefreshCcw } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full border border-indigo-100 shadow-sm">
            <Scale size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Pháp lý & Quy định</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase leading-tight tracking-tight">Điều khoản <br/><span className="text-indigo-600">Dịch vụ</span></h1>
          <p className="text-slate-500 font-medium">Cập nhật lần cuối: 15/05/2024</p>
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-slate-100 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white"><FileText size={20}/></div>
              1. Chấp nhận điều khoản
            </h2>
            <p className="text-slate-600 font-thin leading-relaxed">
              Bằng việc truy cập và sử dụng dịch vụ tại Hudesign (bao gồm đăng ký khóa học và mua tài nguyên), bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu tại đây. Nếu bạn không đồng ý với bất kỳ phần nào, vui lòng ngừng sử dụng dịch vụ của chúng tôi.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white"><ShieldCheck size={20}/></div>
              2. Quyền sở hữu trí tuệ
            </h2>
            <div className="space-y-4 text-slate-600 font-thin leading-relaxed">
              <p>Tất cả nội dung khóa học, tài liệu giảng dạy, và các tài nguyên thiết kế được bán trên website đều thuộc quyền sở hữu trí tuệ của <strong>Hudesign</strong>.</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Đối với tài nguyên (Templates, Fonts, Effects): Bạn được quyền sử dụng cho mục đích cá nhân hoặc dự án thương mại của khách hàng. Không được phép bán lại hoặc phân phối công khai file gốc.</li>
                <li>Đối với nội dung khóa học: Nghiêm cấm mọi hình thức quay phim, ghi âm hoặc chia sẻ tài liệu học tập cho bên thứ ba khi chưa có sự đồng ý bằng văn bản.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white"><AlertCircle size={20}/></div>
              3. Chính sách thanh toán & Hoàn tiền
            </h2>
            <div className="space-y-4 text-slate-600 font-thin leading-relaxed">
              <p>Hudesign áp dụng hình thức chuyển khoản trực tiếp qua ngân hàng hoặc ví điện tử.</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Tài nguyên số:</strong> Do đặc thù là sản phẩm nội dung số, chúng tôi không hỗ trợ hoàn tiền sau khi link tải đã được gửi/mở khóa. Vui lòng xem kỹ thông tin sản phẩm trước khi mua.</li>
                <li><strong>Khóa học:</strong> Học viên có thể bảo lưu hoặc đổi lịch học (báo trước 24h). Phí đặt cọc khóa học không được hoàn lại nếu học viên tự ý hủy lớp.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white"><RefreshCcw size={20}/></div>
              4. Thay đổi dịch vụ
            </h2>
            <p className="text-slate-600 font-thin leading-relaxed">
              Hudesign có quyền thay đổi mức phí, nội dung tài nguyên hoặc giáo trình khóa học vào bất kỳ lúc nào để phù hợp với xu hướng thị trường mà không cần báo trước, tuy nhiên chúng tôi cam kết đảm bảo quyền lợi cho những khách hàng/học viên đã thanh toán trước thời điểm thay đổi.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ Zalo: 0912.412.132</p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
