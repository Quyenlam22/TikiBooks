// Component chọn hình thức giao hàng
import React from 'react';

interface ShippingMethodProps {
  value: 'express' | 'economy';
  onChange: (type: 'express' | 'economy') => void;
}

const ShippingMethod: React.FC<ShippingMethodProps> = ({ value, onChange }) => {
  return (
    <div className="shipping-method bg-white p-4 rounded-lg">
      <h3 className="font-semibold mb-2">Chọn hình thức giao hàng</h3>
      <div>
        <div className="mb-4 relative bg-blue-50 w-[500px] border border-blue-200 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              value="express"
              checked={value === 'express'}
              onChange={() => onChange('express')}
              className="accent-blue-500 w-4 h-4"
            />
            <span className="font-bold text-red-500 text-xs mr-1">NEW</span>
            <span className="font-medium text-gray-800">Giao siêu tốc 2h</span>
            <span className="ml-auto text-green-600 font-semibold">-25K</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              value="economy"
              checked={value === 'economy'}
              onChange={() => onChange('economy')}
              className="accent-blue-500 w-4 h-4"
            />
            <span className="font-medium text-gray-800">Giao tiết kiệm</span>
            <span className="ml-auto text-green-600 font-semibold">-16K</span>
          </label>
          {/* Mũi nhọn dưới khung */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-5 h-5 bg-blue-50 border-l border-b border-blue-200 rotate-315"></div>
        </div>
      </div>
    </div>
  );
};

export default ShippingMethod;
