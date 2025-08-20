import React from 'react';
import freeshipIcon from '../../assets/icons/p13.jpg';

interface ShippingPromoProps {
  selected: boolean;
  onChange: (selected: boolean) => void;
}

const ShippingPromo: React.FC<ShippingPromoProps> = ({ selected, onChange }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm w-full max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 font-medium">Tiki Khuyến Mãi</span>
        <span className="text-gray-400 text-sm">Có thể chọn 2</span>
      </div>
      <div className={`flex items-center gap-2 border rounded-lg p-2 mb-2 ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
        <img src={freeshipIcon} alt="freeship" className="w-8 h-8" />
        <span className="font-medium text-gray-800">Giảm 25K</span>
        <span className="ml-auto text-blue-500 text-sm font-semibold">i</span>
        {selected ? (
          <button
            className="ml-2 px-3 py-1 bg-blue-100 text-blue-600 rounded font-medium text-sm border border-blue-500"
            onClick={() => onChange(false)}
          >
            Bỏ Chọn
          </button>
        ) : (
          <button
            className="ml-2 px-3 py-1 bg-blue-500 text-white rounded font-medium text-sm border border-blue-500"
            onClick={() => onChange(true)}
          >
            Chọn
          </button>
        )}
      </div>
      <button className="flex items-center gap-1 text-blue-500 font-medium text-sm mt-1">
        <span className="text-lg">✂️</span>
        Chọn hoặc nhập mã khác
        <span className="ml-1">&gt;</span>
      </button>
    </div>
  );
};

export default ShippingPromo;
