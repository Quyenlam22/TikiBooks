import React from 'react';
import type { User } from '../../type/user';

interface ReceiverInfoProps {
  user: User;
}

const ReceiverInfo: React.FC<ReceiverInfoProps> = ({ user }) => {
  return (
    <div className="bg-blue-50 rounded-xl p-4 flex flex-col gap-1 w-full max-w-xs">
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-600 font-medium">Giao tới</span>
        <button className="text-blue-500 text-sm font-medium hover:underline">Thay đổi</button>
      </div>
      <div className="font-bold text-base text-gray-800">{user.fullName || 'Tên người nhận'}</div>
      <div className="font-semibold text-gray-700">{user.phone || 'Số điện thoại'}</div>
      <div className="flex items-center gap-2 mt-1">
        <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-xs font-semibold">Văn phòng</span>
        <span className="text-gray-700">{user.address || 'Địa chỉ nhận hàng'}</span>
      </div>
    </div>
  );
};

export default ReceiverInfo;
