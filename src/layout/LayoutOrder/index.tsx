import tikiLogo from "../../assets/icons/tiki-logo.png";
import { Outlet } from "react-router-dom";

const LayoutOrderSuccess = () => {
    return (
        <div className="bg-[#f5f5fa] w-full flex flex-col items-center">
            {/* Wrapper - Responsive max width */}
            <div className="w-full max-w-[1440px] min-h-[1042px] flex flex-col px-4 md:px-8 lg:px-0">

                {/* Freeship XTRA banner */}
                <div className="h-[42px] bg-[#f5f5fa] flex items-center justify-center border-b border-gray-200 text-center text-sm">
                    <p className="text-green-600">
                        Freeship đơn từ 45k, giảm nhiều hơn cùng{" "}
                        <span className="font-bold">
                            <span className="text-blue-600">FREESHIP</span>{" "}
                            <span className="text-green-700">XTRA</span>
                        </span>
                    </p>
                </div>

                {/* Header */}
                <header className="h-[100px] bg-white flex items-center px-4 sm:px-6 shadow-sm">
                    <div className="flex flex-col items-center w-[96px] ml-4">
                        <img src={tikiLogo} alt="Tiki Logo" className="h-10" />
                        <span className="font-bold text-blue-700 text-sm mt-2">Tốt & Nhanh</span>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-grow flex justify-center py-6 sm:py-10">
                    <div className="w-full max-w-[1080px]">
                        <Outlet />
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-[#EBEBF0]  px-4 sm:px-10 py-6 text-xs text-gray-600 leading-relaxed">
                    <p className="mb-2">
                        Bằng việc tiến hành Đặt Mua, bạn đồng ý với các điều khoản sử dụng của chúng tôi:
                    </p>
                    <p className="mb-2 font-bold flex flex-wrap gap-2 sm:gap-4">
                        <a href="#">Quy chế hoạt động</a>
                        <a href="#">Chính sách giải quyết khiếu nại</a>
                        <a href="#">Chính sách bảo hành</a>
                        <a href="#">Chính sách thanh toán</a>
                        <a href="#">Chính sách bảo mật thông tin</a>
                    </p>
                    <p className="mt-5">
                        © 2019 – Bản quyền của Công ty Cổ phần Tiki – Tiki.vn
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default LayoutOrderSuccess;
