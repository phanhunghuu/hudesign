
import React, { useState } from 'react';
import { PRODUCTS } from '../products';
import { ShoppingCart, Mail } from 'lucide-react';
import { Product } from '../types';
import ProductModal from './ProductModal';

const Shop: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
        <div className="space-y-3">
          <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-[10px] md:text-sm">Store tài nguyên</h2>
          <p className="text-2xl md:text-5xl font-black text-slate-900">Nâng cấp thiết kế</p>
          <div className="flex items-center space-x-2 text-slate-500">
            <Mail size={16} className="text-indigo-400" />
            <p className="text-sm md:text-base font-medium">Tài nguyên được gửi trực tiếp qua Email của bạn trong vòng 24h.</p>
          </div>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-2xl md:rounded-[1.5rem] overflow-x-auto whitespace-nowrap scrollbar-hide">
          {['All', 'Canva', 'Photoshop', 'Illustrator'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl text-[10px] md:text-sm font-black transition-all ${filter === cat ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:border-indigo-100 shadow-lg hover:shadow-2xl transition-all duration-500">
            <div 
              className="aspect-[4/3] relative overflow-hidden cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-black px-3 py-1.5 rounded-full shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-8 space-y-4">
              <div className="space-y-2">
                <h3 
                  className="text-lg md:text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight line-clamp-2 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.name}
                </h3>
                <p className="text-slate-500 text-xs md:text-sm line-clamp-2">{product.description}</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-lg md:text-2xl font-black text-slate-900">
                  {product.price.toLocaleString('vi-VN')} đ
                </div>
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="bg-slate-900 text-white p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-indigo-600 transition-all active:scale-90 shadow-lg shadow-slate-200"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default Shop;
