import { FaChevronRight } from "react-icons/fa";
import HeaderMobile from "./HeaderMobile";
import MainHeader from "./MainHeader";
import ServiceBar from "./ServiceBar";
import TopBanner from "./TopBanner";

const Header = () => {
    return (
        <header>
            <div className="hidden md:block">   
                <TopBanner/>
                <MainHeader/>
                <ServiceBar/>
            </div> 
            <div className="md:hidden bg-white">
                <HeaderMobile/>
                <div className="flex m-4 p-2 bg-yellow-200 rounded-lg items-center justify-center gap-2">
                    <span className="text-blue-500 font-semibold">30 NGÀY</span>
                    <span className="font-semibold">đổi ý & miễn phí trả hàng</span>
                    <FaChevronRight 
                        className="text-xl cursor-pointer"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;