
import tiki from "../../assets/icons/tiki-logo.png";
const OrderInfo = () => {
    return (
        <div className="w-full max-w-[318px] h-[165px] bg-white rounded shadow-md border border-gray-200 p-4 text-xs flex flex-col justify-between">
            {/* Top: Mã đơn hàng + link trên cùng 1 dòng */}
            <div className="flex justify-between items-center">
                <span className="text-[#030303]">
                    Mã đơn hàng: <span className="font-semibold">030303</span>
                </span>
                <a href="#" className="text-blue-500 hover:underline whitespace-nowrap">
                    Xem đơn hàng
                </a>
            </div>

            {/* Middle: Thời gian giao */}
            <div className="text-gray-700">
                Giao thứ 6, trước 13h, 28/03
            </div>

            {/* Bottom: ảnh + tên sách */}
            <div className="flex items-center gap-3">
                <img
                    src={tiki}
                    alt="Book"
                    className="w-12 h-16 object-cover rounded border" />
                <span className="text-gray-800 leading-tight">Chat GPT Thực Chiến</span>
            </div>
        </div>
    );
};

export default OrderInfo;
