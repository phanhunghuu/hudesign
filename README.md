
# Hudesign Landing Page

Website giới thiệu khóa học thiết kế đồ họa Hudesign.

## 🚀 Cách triển khai lên Vercel:

1. **Tải mã nguồn:** Lưu tất cả các file trong project này về máy tính của bạn.
2. **GitHub:** 
   - Tạo một Repository mới trên GitHub.
   - Upload toàn bộ file lên đó.
3. **Vercel:**
   - Truy cập [vercel.com](https://vercel.com).
   - Chọn **"Continue with GitHub"**.
   - Chọn Repository bạn vừa tạo.
   - Nhấn **Deploy**.

## 🖼️ Quản lý Hình ảnh (Quan trọng cho Tốc độ)

Để website load nhanh nhất, bạn nên sử dụng các dịch vụ hosting ảnh sau:

1. **Cloudinary (Khuyên dùng):** 
   - Tạo tài khoản miễn phí tại [cloudinary.com](https://cloudinary.com).
   - Up ảnh lên và lấy link. 
   - Thêm `f_auto,q_auto` vào URL để ảnh tự động nhẹ đi mà vẫn nét.
2. **Vercel/GitHub Storage:** 
   - Để ảnh vào thư mục `public/assets/`.
   - Gọi ảnh bằng đường dẫn: `/assets/ten-anh.jpg`.
3. **ImgBB:** 
   - Dùng cho các ảnh "mì ăn liền" tại [imgbb.com](https://imgbb.com).

**Mẹo tối ưu:** Luôn đảm bảo ảnh không quá 2000px và dung lượng dưới 300KB trước khi upload để khách hàng dùng 4G vẫn load mượt mà.

## 📝 Lưu ý về Google Sheets:
- Đảm bảo bạn đã thay link Google Apps Script vào biến `SCRIPT_URL` trong file `components/RegistrationForm.tsx`.
- Khi Deploy Script, hãy chọn quyền truy cập là **"Anyone"**.
