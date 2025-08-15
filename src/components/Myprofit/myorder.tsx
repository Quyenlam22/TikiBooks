import Sidebar from '../../components/Myprofit/sibar';

export default function AccountOrders() {
    return (
        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row w-full max-w-[1240px] gap-16 mt-8 rounded p-4 sm:p-6 lg:p-8">

                {/* Sidebar bên trái */}
                <div className="w-full lg:w-[267px]">
                    <Sidebar />
                </div>

                {/* Nội dung chính: Đơn hàng */}
                <div className="
                    bg-white 
                    w-full            /* Mobile: full chiều rộng */
                    sm:w-[500px]      /* ≥640px */
                    md:w-[780px]      /* ≥768px */
                    lg:w-[973px]      /* ≥1024px */
                    h-[600px] 
                    flex flex-col gap-6 
                    p-6 sm:p-8 
                    rounded shadow
                ">
                    <h2 className="text-lg sm:text-xl font-semibold">Đơn hàng của tôi</h2>

                    {/* Tabs trạng thái đơn */}
                    <div className="flex flex-wrap gap-2 sm:gap-2 lg:gap-4 text-sm font-medium border-b border-gray-200">
                        {['Tất cả đơn', 'Đang xử lý', 'Đã xác nhận', 'Đang giao', 'Đã giao', 'Đã huỷ'].map((status, index) => (
                            <button
                                key={index}
                                className={`pb-2 border-b-2 ${index === 0 ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-600'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    {/* Tìm kiếm đơn */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 border border-gray-300 rounded px-4 py-2">
                        <input
                            type="text"
                            placeholder="Tìm đơn hàng theo Mã đơn hàng, Nhà bán hoặc Tên sản phẩm"
                            className="flex-1 focus:outline-none text-sm"
                        />
                        <button className="text-blue-600 font-medium text-sm hover:underline">Tìm đơn hàng</button>
                    </div>

                    {/* Nội dung đơn hàng (rỗng) */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        {/* <img src="/no-orders-icon.svg" alt="No orders" className="w-32 h-32 mb-4 opacity-60" /> */}
                        <p className="text-gray-500 text-sm">Chưa có đơn hàng</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
