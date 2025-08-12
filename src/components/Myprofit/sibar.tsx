import React from 'react';
import { FaUser, FaBell, FaClipboardList } from 'react-icons/fa';

const Sidebar: React.FC = () => {
    return (
        <aside className="bg-gray-100 p-4 w-full lg:w-[250px] h-auto lg:h-[847px]">
            {/* Thông tin tài khoản */}
            <div className="mb-4 lg:mb-6 flex items-center gap-2 lg:block">
                {/* <img
                    src="https://via.placeholder.com/40"
                    alt="avatar"
                    className="w-10 h-10 rounded-full mb-0 lg:mb-2"
                /> */}
                <div>
                    <h3 className="text-sm font-medium text-gray-700">Tài khoản của</h3>
                    <p className="text-sm font-semibold text-black">Vũ Anh Tú</p>
                </div>
            </div>

            {/* Danh sách menu */}
            <ul className="flex flex-row lg:flex-col overflow-x-auto gap-6 lg:gap-3 text-sm text-gray-700 whitespace-nowrap">
                <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-600">
                    <FaUser size={16} />
                    <span>Thông tin tài khoản</span>
                </li>
                <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-600">
                    <FaBell size={16} />
                    <span>Thông báo của tôi</span>
                </li>
                <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-600">
                    <FaClipboardList size={16} />
                    <span>Quản lý đơn hàng</span>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
