import React from 'react';
import { FaUser, FaBell, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <aside className="bg-gray-100 p-4 w-full lg:w-[250px] h-auto lg:h-[847px]">
            {/* Thông tin tài khoản */}
            <div className="mb-4 lg:mb-6">
                <h3 className="text-sm font-medium text-gray-700">Tài khoản của</h3>
                <p className="text-sm font-semibold text-black">Vũ Anh Tú</p>
            </div>

            {/* Danh sách menu */}
            <ul className="flex flex-row lg:flex-col overflow-x-auto gap-6 lg:gap-3 text-sm text-gray-700 whitespace-nowrap">
                <li>
                    <Link
                        to="/myprofit/userinfo"
                        className="flex items-center gap-2 hover:text-yellow-600"
                    >
                        <FaUser size={16} />
                        <span>Thông tin tài khoản</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/myprofit/inform"
                        className="flex items-center gap-2 hover:text-yellow-600"
                    >
                        <FaBell size={16} />
                        <span>Thông báo của tôi</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/myprofit/order"
                        className="flex items-center gap-2 hover:text-yellow-600"
                    >
                        <FaClipboardList size={16} />
                        <span>Quản lý đơn hàng</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
