import React, { useState } from 'react';
import tikiLogo from '../../assets/icons/tiki-logo.png';
import shieldIcon from '../../assets/icons/icon-0.png'
import addIcon from '../../assets/icons/icons-add.svg';
import removeIcon from '../../assets/icons/icons-remove.svg';

interface BookPurchaseProps {
  price: number;
}

const BookPurchase: React.FC<BookPurchaseProps> = ({ price }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(q => q + 1);
  const handleDecrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const total = price * quantity;

  return (
    <div className="bg-white rounded-lg p-5 w-90">
      <div className="flex items-center mb-2.5">
        <img src={tikiLogo} alt="Tiki Trading" className="w-10 mr-2" />
        <div>
          <div className="font-semibold">Tiki Trading</div>
          <div className="flex items-center text-xs text-blue-500 font-medium bg-blue-50 rounded px-1.5 py-0.5">
            <img src={shieldIcon} alt="" />
            OFFICIAL
          </div>
        </div>
      </div>
      <hr className="my-3 text-gray-200" />
      <div className="mb-2 font-bold">Số Lượng</div>
      <div className="flex items-center mb-4">
        <button 
          onClick={handleDecrease} 
          className={`flex items-center justify-center w-8 h-8 border border-gray-300 rounded bg-white text-2xl ${quantity === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={quantity === 1}
        >
            <img src={removeIcon} alt="" />
        </button>
        <span className="flex items-center justify-center mx-2 w-10 h-8 border border-gray-300 rounded min-w-[24px] text-center">{quantity}</span>
        <button onClick={handleIncrease} className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded bg-white">
            <img src={addIcon} alt="" />
        </button>
      </div>
      <div className="mb-2 font-bold">Tạm tính</div>
      <div className="text-2xl font-bold mb-4">{total.toLocaleString('vi-VN')}<sup>₫</sup></div>
      <button className="flex items-center justify-center h-10 w-full bg-[#ff424e] text-white border-none cursor-pointer rounded py-3 font-normal text-base mb-2">Mua ngay</button>
      <button className="flex items-center justify-center h-10 w-full bg-white text-blue-500 border border-blue-500 cursor-pointer rounded py-2.5 font-normal text-base mb-2">Thêm vào giỏ</button>
      <button className="flex items-center justify-center h-10 w-full bg-white text-blue-500 border border-blue-500 cursor-pointer rounded py-2.5 font-normal text-base">Mua trước trả sau</button>
    </div>
  );
};

export default BookPurchase;
