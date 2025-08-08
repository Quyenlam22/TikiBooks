import { Link } from "react-router";
import tikiLogo from "../../assets/icons/logoder.webp";

const OrderSummary = () => {
    return (
        <div className="w-[320px] sm:w-[490px] md:w-[490px] lg:w-[742px] h-[521px] bg-white rounded shadow-md border border-gray-200 ">
            {/* Banner header */}
            <div className="relative">
                {/* Gradient background */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white h-[112px] rounded-t-md flex items-center 
          px-4 sm:px-8 md:pl-[222px] md:pr-[60px]"
                >
                    <div>
                        <h2 className="text-xl font-semibold">Yay, đặt hàng thành công!</h2>
                        <p className="text-sm">Chuẩn bị tiền mặt <strong>110.000 ₫</strong></p>
                    </div>
                </div>

                {/* Icon giữa xanh và trắng */}
                <div className="absolute left-4 sm:left-82 md:left-[60px] -bottom-12 p-2">
                    <img src={tikiLogo} alt="success" className="w-20 h-20 rounded-full" />
                </div>
            </div>

            {/* Nội dung thanh toán */}
            <div className="pt-10 px-4 sm:px-8 md:px-[60px] md:pl-[222px] space-y-4">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Phương thức thanh toán</span>
                    <span className="text-gray-900 font-medium">Thanh toán tiền mặt</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Tổng cộng</span>
                    <span className="text-lg font-bold text-gray-900">110.000 ₫</span>
                </div>
                <p className="text-xs text-gray-500">(Đã bao gồm VAT nếu có)</p>
            </div>

            {/* Nút quay về */}
            <div className="mt-6 text-center px-4 sm:px-8 md:px-[65px] md:pl-[222px]">
                <Link
                    to="/"
                    className="inline-block w-full sm:w-[400px] md:w-[220px] lg:w-[480px] h-[44px] leading-[44px] border border-blue-500 text-blue-600 font-medium rounded hover:bg-blue-50 transition"
                >
                    Quay về trang chủ
                </Link>
            </div>
        </div>
    );
};

export default OrderSummary;
