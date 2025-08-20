import React from 'react';
import type { Book } from '../../../type/Book';

interface ProductInfoProps {
  books: { book: Book; quantity: number }[];
  shippingFee?: number;
  shippingLabel?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ books, shippingFee = 0, shippingLabel = '' }) => {
  return (
    <div className="border border-gray-300 rounded-lg m-4 relative">
      <div className="absolute -top-3 left-4 bg-white px-2 text-green-600 font-medium text-sm">
        Gói: {shippingLabel === "express" ? <>Giao siêu tốc 2h, trước 13h hôm nay</> : <>Giao tiết kiệm, trước 15h ngày mai</>}
      </div>

      <div className="flex items-center gap-2 my-4 ml-4">
        <span className="font-bold text-red-500 text-xs">NEW</span>
        <span className="font-semibold">{shippingLabel === "express" ? <>GIAO SIÊU TỐC 2H</> : <>GIAO TIẾT KIỆM</>}</span>
        <span className="ml-36 text-gray-400 line-through text-sm">
          {shippingFee > 0 ? shippingFee.toLocaleString('vi-VN') + '₫' : '25.000₫'}
        </span>
        <span className="text-green-600 font-semibold text-sm">MIỄN PHÍ</span>
      </div>

      {books.map(({ book, quantity }, idx) => {
        const unitPrice = book.current_seller?.price || book.list_price || 0;
        const totalListPrice = (book.list_price || 0) * quantity;
        const totalPrice = unitPrice * quantity;

        return (
          <div key={idx} className="px-4 mb-4 flex items-center gap-4">
            <img
              src={book.images?.[0]?.thumbnail_url || ''}
              alt={book.name}
              className="w-16 h-20 object-cover rounded"
            />

            <div className="flex-1 flex items-center gap-24">
              <div>
                <h3 className="text-gray-500 w-[200px] mb-1">{book.name}</h3>
                <div className="text-gray-500 text-sm mb-1">SL: x{quantity}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="line-through text-gray-400 text-sm">
                  {totalListPrice.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-red-500 font-bold text-lg">
                  {totalPrice.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductInfo;