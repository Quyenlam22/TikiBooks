import { useEffect, useState } from 'react';
import Sidebar from '../../components/Myprofit/sibar';
import { getAllorders } from '../../services/orderService';
import type { Order } from '../../type/order';
import { Link } from 'react-router-dom';

const statuses = ['Tất cả đơn', 'Đang xử lý', 'Đã xác nhận', 'Đang giao', 'Đã giao', 'Đã huỷ'];

export default function AccountOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('Tất cả đơn');
    const [searchText, setSearchText] = useState<string>('');

    // Fetch all orders once
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data: Order[] = await getAllorders();
                setOrders(data);
            } catch (err) {
                console.error('Error fetching orders:', err);
            }
        };

        fetchOrders();
    }, []);

    // Filter orders based on status and search text
    useEffect(() => {
        const lowerSearch = searchText.toLowerCase();

        const filtered = orders.filter((order) => {
            const matchStatus = selectedStatus === 'Tất cả đơn' || order.status === selectedStatus;
            const matchSearch =
                order.id?.toString().includes(lowerSearch) ||
                order.fullname?.toLowerCase().includes(lowerSearch) ||
                order.products.some((p) => p.name.toLowerCase().includes(lowerSearch));

            return matchStatus && matchSearch;
        });

        setFilteredOrders(filtered);
    }, [orders, selectedStatus, searchText]);

    return (
        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row w-full max-w-[1240px] gap-16 mt-8 rounded p-4 sm:p-6 lg:p-8">
                {/* Sidebar bên trái */}
                <div className="w-full lg:w-[267px]">
                    <Sidebar />
                </div>

                {/* Nội dung chính: Đơn hàng */}
                <div className="bg-white w-full sm:w-[500px] md:w-[780px] lg:w-[973px] h-[600px] flex flex-col gap-6 p-6 sm:p-8 rounded shadow">
                    <h2 className="text-lg sm:text-xl font-semibold">Đơn hàng của tôi</h2>

                    {/* Tabs trạng thái */}
                    <div className="flex flex-wrap gap-2 text-sm font-medium border-b border-gray-200">
                        {statuses.map((status) => (
                            <button
                                key={status}
                                className={`pb-2 border-b-2 ${selectedStatus === status
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-600 hover:text-blue-600'
                                    }`}
                                onClick={() => setSelectedStatus(status)}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    {/* Tìm kiếm đơn */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 border border-gray-300 rounded px-4 py-2">
                        <input
                            type="text"
                            placeholder="Tìm đơn hàng theo Tên người nhận hoặc Tên sản phẩm"
                            className="flex-1 focus:outline-none text-sm"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button className="text-blue-600 font-medium text-sm hover:underline">
                            Tìm đơn hàng
                        </button>
                    </div>

                    {/* Danh sách đơn hàng */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredOrders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center text-center mt-10">
                                <p className="text-gray-500 text-sm">Không có đơn hàng</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">

                                Tạo đơn hàng mới
                                {filteredOrders.map((order) => (
                                    <Link

                                        to={`${order.id}`} className="text-blue-600 font-medium text-sm hover:underline cursor-pointer">
                                        <div
                                            key={order.id}
                                            className="border p-4 rounded shadow-sm bg-gray-50"
                                        >
                                            <p>
                                                <strong>Mã đơn:</strong> {order.id}
                                            </p>
                                            <p>
                                                <strong>Khách:</strong> {order.fullname} - {order.phone}
                                            </p>
                                            <p>
                                                <strong>Trạng thái:</strong> {order.status}
                                            </p>
                                            <p>
                                                <strong>Sản phẩm:</strong>
                                            </p>
                                            <ul className="list-disc ml-5">
                                                {order.products.map((p) => (
                                                    <li key={p.id}>
                                                        {p.name} x {p.quantity}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Link>
                                ))}

                            </div>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
