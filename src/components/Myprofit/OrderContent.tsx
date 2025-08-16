import React from 'react';
import Sidebar from './sibar';
import InfoBlock from './infoblock';

const OrderDetailPage: React.FC = () => {
    return (
        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row w-full max-w-[1240px] h-auto lg:h-[847px] gap-6">

                {/* Sidebar */}
                <div className="w-full lg:w-[267px]">
                    <Sidebar />
                </div>

                {/* Main content */}
                <div className="w-full flex-1 py-6 mt-5 box-border">
                    <div className="flex  ">
                        {/* Title */}
                        <div className="mb-4 px-2 sm:px-0">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                Chi tiết đơn hàng #861977987 - <span className="text-yellow-600">Đang xử lý</span>
                            </h2>
                        </div>
                        <div className='text-right ml-auto mt-2'>
                            <h4>Ngày đặt: 10:47 20/07/2025</h4>
                        </div>
                    </div>
                    {/* Info block */}
                    <div className="mb-6  sm:px-0">
                        <InfoBlock />
                    </div>

                    {/* Chi tiết đơn hàng */}
                    <div className="w-full h-auto lg:h-[489px] mt-5 rounded-md p-4 mb-6 bg-white text-sm text-gray-800 overflow-x-auto">
                        <table className="w-full min-w-[600px] sm:min-w-full mb-4 table-auto">
                            <thead>
                                <tr className="font-black text-left ">
                                    <th className="py-2 px-1  sm:px-2">Sản phẩm</th>
                                    <th className="py-2 px-1  sm:px-2">Giá</th>
                                    <th className="py-2 px-1 sm:px-2">Số lượng</th>
                                    <th className="py-2 px-1 sm:px-2">Giảm giá</th>
                                    <th className="py-2 px-1 sm:px-2 text-right">Tạm tính</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="align-top">
                                    <td className="py-4 sm:py-8 h-auto sm:h-[201px] align-top">
                                        <div className="flex gap-4 h-full">
                                            {/* Ảnh sản phẩm */}
                                            <img
                                                src="https://via.placeholder.com/80x100"
                                                alt="Sản phẩm"
                                                className="w-16 sm:w-20 h-[80px] sm:h-[100px] object-cover rounded"
                                            />
                                            {/* Thông tin sản phẩm */}
                                            <div className="flex flex-col justify-between h-full text-xs sm:text-sm">
                                                <p className="font-medium text-base sm:text-lg">Chat GPT Thực Chiến</p>
                                                <p className="text-gray-500">
                                                    Cung cấp bởi <span className="text-blue-500">Tiki Trading</span>
                                                </p>
                                                <p className="text-gray-400">SKU: 8936144924927</p>
                                                <p className="text-gray-400">30%</p>
                                                <p className="text-gray-400">Chat với nhà bán</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 sm:py-8 align-top">110.000 đ</td>
                                    <td className="py-4 sm:py-8 align-top text-center">1</td>
                                    <td className="py-4 sm:py-8 align-top text-center">0</td>
                                    <td className="py-4 sm:py-8 align-top text-right">110.000 đ</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Tổng tiền */}
                        <div className="w-full mt-10 flex justify-end">
                            <div className="w-full max-w-[300px] space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span>Tạm tính:</span>
                                    <span>110.000 đ</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Phí vận chuyển:</span>
                                    <span>25.000 đ</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Giảm giá vận chuyển:</span>
                                    <span>-25.000 đ</span>
                                </div>
                                <div className="flex justify-between font-bold text-base pt-2">
                                    <span>Tổng cộng:</span>
                                    <span className="text-red-500">110.000 đ</span>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button className="bg-yellow-400 px-4 py-2 rounded text-white hover:bg-yellow-500 cursor-pointer">
                                        Hủy đơn hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nút hành động */}
                    <div className="text-left space-x-2 px-2 sm:px-0">
                        <a
                            href="#"
                            className="px-4 py-2 rounded text-blue-600 hover:text-yellow-600 inline-block"
                        >
                            &laquo; Quay lại đơn hàng của tôi
                        </a>
                        <button className="bg-yellow-400 px-4 py-2 rounded text-white hover:bg-yellow-500 cursor-pointer">
                            Theo dõi đơn hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
