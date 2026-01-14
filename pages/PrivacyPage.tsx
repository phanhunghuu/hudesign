
import React from 'react';
import { Lock, Eye, Database, ShieldCheck, Mail } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full border border-indigo-100 shadow-sm">
            <Lock size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Quyền riêng tư</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase leading-tight tracking-tight">Chính sách <br/><span className="text-indigo-600">Bảo mật</span></h1>
          <p className="text-slate-500 font-medium">Cập nhật lần cuối: 15/05/2024</p>
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-slate-100 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white"><Eye size={20}/></div>
              1. Thông tin chúng tôi thu thập
            </h2>
            <div className="space-y-4 text-slate-600 font-thin leading-relaxed">
              <p>Khi bạn sử dụng website Hudesign, chúng tôi thu thập một số thông tin cần thiết để phục vụ dịch vụ:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Thông tin định danh: Họ tên, Email, Số điện thoại (để xác nhận đơn hàng và đăng ký học).</li>
                <li>Dữ liệu thanh toán: Minh chứng chuyển khoản (ảnh chụp) được bạn cung cấp tự nguyện để xác nhận mua hàng.</li>
                <li>Dữ liệu đăng nhập: Chúng tôi sử dụng dịch vụ Supabase Auth để bảo mật tài khoản của bạn.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white"><Database size={20}/></div>
              2. Cách chúng tôi sử dụng thông tin
            </h2>
            <div className="space-y-4 text-slate-600 font-thin leading-relaxed">
              <p>Thông tin của bạn được sử dụng cho các mục đích sau:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Xử lý giao dịch mua tài nguyên số.</li>
                <li>Liên hệ tư vấn và xếp lịch học cho các khóa học 1 kèm 1.</li>
                <li>Gửi thông báo về cập nhật tài nguyên mới hoặc ưu đãi đặc quyền cho học viên qua Email/Zalo.</li>
                <li>Cải thiện trải nghiệm người dùng trên website.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white"><ShieldCheck size={20}/></div>
              3. Bảo mật dữ liệu
            </h2>
            <p className="text-slate-600 font-thin leading-relaxed">
              Hudesign cam kết bảo mật thông tin cá nhân của bạn tuyệt đối. Chúng tôi sử dụng các tiêu chuẩn mã hóa của Supabase và Google Cloud để lưu trữ dữ liệu. Chúng tôi không bao giờ bán, cho thuê hoặc chia sẻ thông tin của bạn cho bên thứ ba vì mục đích thương mại.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white"><Mail size={20}/></div>
              4. Liên hệ & Yêu cầu xóa dữ liệu
            </h2>
            <p className="text-slate-600 font-thin leading-relaxed">
              Bạn có quyền yêu cầu truy xuất, chỉnh sửa hoặc xóa vĩnh viễn dữ liệu cá nhân của mình khỏi hệ thống của Hudesign bất kỳ lúc nào bằng cách liên hệ trực tiếp với chúng tôi qua email: <strong className="text-slate-900">hello@hudesign.site</strong> hoặc Zalo hỗ trợ.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
