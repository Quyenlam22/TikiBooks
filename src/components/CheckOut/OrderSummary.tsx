import React from 'react';

interface OrderSummaryProps {
  totalPrice: number;
  shippingFee: number;
  directDiscount: number;
  shippingDiscount: number;
  finalPrice: number;
  quantity: number;
  savedAmount: number;
  onOrderSubmit: () => void;
  //  onOrderSubmit: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalPrice,
  shippingFee,
  directDiscount,
  shippingDiscount,
  finalPrice,
  savedAmount,
  onOrderSubmit
}) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm w-full max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 font-medium">Đơn hàng</span>
        <span className="text-blue-500 text-sm font-medium cursor-pointer">Xem thông tin</span>
      </div>
      <div className="space-y-1 mb-2">
        <div className="flex justify-between text-gray-700">
          <span>Tổng tiền hàng</span>
          <span>{totalPrice.toLocaleString('vi-VN')}đ</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Phí vận chuyển</span>
          <span>{shippingFee.toLocaleString('vi-VN')}đ</span>
        </div>
        <div className="flex justify-between text-green-600">
          <span>Giảm giá trực tiếp</span>
          <span>-{directDiscount.toLocaleString('vi-VN')}đ</span>
        </div>
        <div className="flex justify-between text-green-600">
          <span>Giảm giá vận chuyển <span className="text-gray-400 text-xs">ⓘ</span></span>
          <span>-{shippingDiscount.toLocaleString('vi-VN')}đ</span>
        </div>
      </div>
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold text-lg text-gray-700">Tổng tiền thanh toán</span>
        <span className="font-bold text-lg text-red-500">{finalPrice.toLocaleString('vi-VN')}đ</span>
      </div>
      <div className="text-green-600 font-medium mb-2">Tiết kiệm {savedAmount.toLocaleString('vi-VN')}đ</div>
      <div className="text-gray-400 text-xs mb-3">(Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)</div>
      <button
        onClick={onOrderSubmit}
        className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg text-base hover:bg-red-600 transition-colors">Đặt hàng</button>
    </div>
  );
};

export default OrderSummary;
