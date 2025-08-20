import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './sibar';
import InfoBlock from './infoblock';
import { getOrderById } from '../../services/orderService';
import type { Order } from '../../type/order';
import { getStatusFromCreatedAt } from '../../utils/orderstatus';

const OrderDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            console.warn('Thiếu ID đơn hàng trong URL');
            return;
        }
        getOrderById(Number(id))
            .then(data => {
                if (!data) {
                    console.warn('Không nhận được đơn hàng nào từ API');
                }
                console.log('Order trả về:', data);
                setOrder(data);
            })
            .catch(err => {
                console.error('Lỗi khi lấy đơn hàng:', err);
                alert('Không thể tải đơn hàng');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Đang tải đơn hàng...</div>;
    if (!order) return <div>Không tìm thấy đơn hàng</div>;

    return (
        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row w-full max-w-[1240px] h-auto lg:h-[847px] gap-6">
                <div className="w-full lg:w-[267px]">
                    <Sidebar />
                </div>
                <div className="w-full flex-1 py-6 mt-5 box-border">
                    {/* Header */}
                    <div className="flex">
                        <div className="mb-4 px-2 sm:px-0">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                Chi tiết đơn hàng #{order.id} –{' '}
                                <span className="text-yellow-600">{getStatusFromCreatedAt(order.createdAt!)}</span>
                            </h2>
                        </div>
                        <div className="text-right ml-auto mt-2">
                            <h4>Ngày đặt: 25-08-2025</h4>
                        </div>
                    </div>

                    {/* Thông tin khách hàng & địa chỉ */}
                    <div className="mb-6 sm:px-0">
                        <InfoBlock fullname={order.fullname} phone={order.phone} address={order.address} />



                    </div>

                    {/* Chi tiết sản phẩm */}
                    <div className="w-full h-auto lg:h-[489px] mt-5 rounded-md p-4 mb-6 bg-white text-sm text-gray-800 overflow-x-auto">
                        <table className="w-full min-w-[600px] sm:min-w-full mb-4 table-auto">
                            <thead>
                                <tr className="font-black text-left">
                                    <th className="py-2 px-1 sm:px-2">Sản phẩm</th>
                                    <th className="py-2 px-1 sm:px-2">Giá</th>
                                    <th className="py-2 px-1 sm:px-2">Số lượng</th>
                                    <th className="py-2 px-1 sm:px-2">Giảm giá</th>
                                    <th className="py-2 px-1 sm:px-2 text-right">Tạm tính</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.products.map((p, idx) => (
                                    <tr key={idx} className="align-top">
                                        <td className="py-4 sm:py-8 align-top">
                                            <div className="flex gap-4 h-full">
                                                <img
                                                    src={p.images?.[0]?.base_url || 'https://via.placeholder.com/80x100'}
                                                    alt={p.name}
                                                    className="w-16 sm:w-20 h-[80px] sm:h-[100px] object-cover rounded"
                                                />
                                                <div className="flex flex-col justify-between h-full text-xs sm:text-sm">
                                                    <p className="font-medium text-base sm:text-lg">{p.name}</p>
                                                    <p className="text-gray-500">Số lượng: {p.quantity || 1}</p>
                                                    <p className="text-gray-400">Giá: {p.price.toLocaleString()}₫</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 sm:py-8 align-top">{p.price.toLocaleString()}₫</td>
                                        <td className="py-4 sm:py-8 align-top text-center">{p.quantity || 1}</td>
                                        <td className="py-4 sm:py-8 align-top text-center">25%</td>
                                        <td className="py-4 sm:py-8 align-top text-right">
                                            {(p.price * (p.quantity || 1)).toLocaleString()}₫
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Tổng tiền */}
                        <div className="w-full mt-10 flex justify-end">
                            <div className="w-full max-w-[300px] space-y-1 text-sm">
                                <div className="flex justify-between"><span>Tạm tính:</span><span>{order.totalPrice.toLocaleString()}₫</span></div>
                                <div className="flex justify-between"><span>Phí vận chuyển:</span><span>25000₫</span></div>
                                <div className="flex justify-between"><span>Giảm giá vận chuyển:</span><span>25000₫</span></div>
                                <div className="flex justify-between font-bold text-base pt-2"><span>Tổng cộng:</span><span className="text-red-500">{order.totalPrice.toLocaleString()}₫</span></div>
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
                        <button
                            onClick={() => navigate('/myprofit/order')}
                            className="px-4 py-2 rounded text-blue-600 hover:text-yellow-600 inline-block"
                        >
                            &laquo; Quay lại danh sách đơn hàng của tôi
                        </button>
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
