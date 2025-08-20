import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import tikiLogo from '../../assets/icons/tiki-logo.png';
import shieldIcon from '../../assets/icons/icon-0.png'
import addIcon from '../../assets/icons/icons-add.svg';
import subIcon from '../../assets/icons/icons-sub.svg';
import { AppContext } from '../../context/AppProvider';
import type { Book } from '../../../type/Book';

interface BookPurchaseProps {
  book: Book; 
}

const BookPurchase: React.FC<BookPurchaseProps> = ({ book }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { user, setCheckoutBooks } = useContext(AppContext);
  const navigate = useNavigate();


  const price = book.current_seller?.price || 0;
  const total = price * quantity;

  const handleIncrease = () => setQuantity(q => q + 1);
  const handleDecrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để thực hiện thao tác này!');
      return;
    }
    setIsAddingToCart(true);
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = currentCart.findIndex(
      (item: any) => item.current_seller?.product_id === book.current_seller?.product_id
    );
    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      currentCart.push({
        ...book,
        quantity: quantity,
        isSelected: true
      });
    }
    localStorage.setItem('cart', JSON.stringify(currentCart));
    setTimeout(() => {
      setIsAddingToCart(false);
      alert('Đã thêm sản phẩm vào giỏ hàng!');
    }, 500);
  };

  const handleBuyNow = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để thực hiện thao tác này!');
      return;
    }
    if (setCheckoutBooks) {
      setCheckoutBooks([{ book, quantity }]); 
    }
    setTimeout(() => {
      navigate('/checkout');
    }, 600);
  };

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
          className={`cursor-pointer flex items-center justify-center w-8 h-8 border border-gray-300 rounded bg-white text-2xl ${quantity === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={quantity === 1}
        >
            <img src={subIcon} alt="" />
        </button>
        <span className="flex items-center justify-center mx-2 w-10 h-8 border border-gray-300 rounded min-w-[24px] text-center">{quantity}</span>
        <button onClick={handleIncrease} className="cursor-pointer flex items-center justify-center w-8 h-8 border border-gray-300 rounded bg-white">
            <img src={addIcon} alt="" />
        </button>
      </div>
      <div className="mb-2 font-bold">Tạm tính</div>
      <div className="text-2xl font-bold mb-4">{total.toLocaleString('vi-VN')}<sup>₫</sup></div>
      
      <button 
        onClick={handleBuyNow}
        className="flex items-center justify-center h-10 w-full bg-[#ff424e] text-white border-none cursor-pointer rounded py-3 font-normal text-base mb-2 hover:bg-red-600 transition-colors"
      >
        Mua ngay
      </button>
      
      <button 
        onClick={handleAddToCart}
        disabled={isAddingToCart}
        className={`flex items-center justify-center h-10 w-full bg-white text-blue-500 border border-blue-500 cursor-pointer rounded py-2.5 font-normal text-base mb-2 hover:bg-blue-50 transition-colors ${
          isAddingToCart ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isAddingToCart ? 'Đang thêm...' : 'Thêm vào giỏ'}
      </button>
      
      <button className="flex items-center justify-center h-10 w-full bg-white text-blue-500 border border-blue-500 cursor-pointer rounded py-2.5 font-normal text-base hover:bg-blue-50 transition-colors">
        Mua trước trả sau
      </button>
    </div>
  );
};

export default BookPurchase;