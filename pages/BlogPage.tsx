
import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "10 Lỗi bố cục khiến thiết kế của bạn trông kém chuyên nghiệp",
    desc: "Cùng điểm qua những sai lầm kinh điển mà các Marketers thường mắc phải khi tự tay thiết kế banner...",
    date: "12/10/2024",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Xu hướng màu sắc cho ngành đồ họa năm 2025",
    desc: "Năm nay sẽ là sự lên ngôi của các dải màu Gradient kết hợp với phong cách Retro tối giản...",
    date: "05/10/2024",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Cách cài đặt Font chữ tiếng Việt chuẩn cho Illustrator",
    desc: "Hướng dẫn chi tiết cách tìm nguồn font và cài đặt để không bị lỗi gõ tiếng Việt trong Ai...",
    date: "28/09/2024",
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800"
  }
];

const BlogPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900">Chia sẻ & Kinh nghiệm</h1>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">Hành trình trở thành Designer chuyên nghiệp thông qua những bài viết thực tế.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {BLOG_POSTS.map((post) => (
          <article key={post.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all">
            <div className="aspect-[16/10] overflow-hidden">
              <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-8 space-y-4">
              <div className="flex items-center space-x-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span className="flex items-center space-x-1"><Calendar size={14} /> <span>{post.date}</span></span>
                <span className="flex items-center space-x-1"><User size={14} /> <span>Admin</span></span>
              </div>
              <h2 className="text-xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{post.title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{post.desc}</p>
              <button className="flex items-center space-x-2 text-indigo-600 font-black text-sm uppercase tracking-widest hover:translate-x-2 transition-transform">
                <span>Đọc thêm</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
