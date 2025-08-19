import React from 'react';
import type { Book } from '../../../type/Book';


interface ProductInfoProps {
  book: Book;
  shippingFee?: number;
  shippingLabel?: string;
  quantity: number; // Optional, if you want to display quantity
}

const ProductInfo: React.FC<ProductInfoProps> = ({ book, shippingFee = 0, shippingLabel = '', quantity }) => {
  const unitPrice = book.current_seller?.price || book.list_price || 0;
  const totalListPrice = (book.list_price || 0) * quantity;
  const totalPrice = unitPrice * quantity;
  return (
    <div className="border rounded-xl p-4 bg-white flex flex-col gap-2 relative">
      <div className="text-green-600 font-medium mb-2 flex items-center gap-2">
        <span className="inline-block">📅</span>
        <span>Gói: {shippingLabel || 'Giao siêu tốc 2h, trước 13h hôm nay'}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1 min-w-[60px]">
          <img src={book.images?.[0]?.thumbnail_url || ''} alt={book.name} className="w-16 h-20 object-cover rounded" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-red-500 text-xs">NEW</span>
            <span className="font-semibold">GIAO SIÊU TỐC 2H</span>
            <span className="ml-auto text-gray-400 line-through text-sm">{shippingFee > 0 ? shippingFee.toLocaleString('vi-VN') + '₫' : '25.000₫'}</span>
            <span className="text-green-600 font-semibold text-sm">MIỄN PHÍ</span>
          </div>
          <div className="font-medium text-gray-800 mb-1">{book.name}</div>
          <div className="text-gray-500 text-sm mb-1">SL: x{quantity ?? 1}</div>
          <div className="flex items-center gap-2">
            <span className="line-through text-gray-400 text-sm">{totalListPrice.toLocaleString('vi-VN')}₫</span>
            <span className="text-red-500 font-bold text-lg">{totalPrice.toLocaleString('vi-VN')}₫</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
