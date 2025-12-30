
import React from 'react';
import Shop from '../components/Shop';

const ShopPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900">Cửa hàng Tài nguyên</h1>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">Mọi thứ bạn cần để đẩy nhanh quy trình thiết kế chuyên nghiệp.</p>
      </div>
      <Shop />
    </div>
  );
};

export default ShopPage;
