import {useState } from "react";
import tikiLogo from "../../assets/icons/tiki-logo.png";
import searchIcon from "../../assets/icons/icon-search.png"
import homeLogo from "../../assets/icons/header_menu_item_home.png";
import accountLogo from "../../assets/icons/header_header_account_img.png";
import cartLogo from "../../assets/icons/header_header_img_Cart.png";
import { useNavigate } from "react-router-dom";

import LoginModal from "../Login/LoginModal";
import CategoryMenu from "./CategoryMenu";

const MainHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = searchValue.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <div className="bg-white px-5 py-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center space-x-2 w-[96px]  ml-[24px]">
              <img src={tikiLogo} alt="Tiki Logo" className="h-10" />
              <span className=" font-bold text-blue-700 text-sm mt-2">Tốt & Nhanh</span>
          </div>
        
          <div className="flex-1 mx-10">
            <form onSubmit={handleSearch}>
              <div className="flex border border-gray-500 rounded-[8px] overflow-hidden">
              <img src={searchIcon} alt="" className="w-5 h-5 m-auto ml-3 "/>
              <input
                  type="text"
                  placeholder="100% hàng thật"
                  className="flex-1 px-3 py-2 outline-none"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
              />
              <div className="w-[1px] h-[20px] bg-gray-200 ml-3 m-auto"></div>
              <button type="submit" className="text-blue-500 px-4 hover:text-blue-900 cursor-pointer">Tìm kiếm</button>
              </div>
            </form>
            
            <CategoryMenu/>
          </div>
          <div className="flex self-start pt-3 space-x-6">
              <a href="/" className="flex self-start space-x-1">
              <img src={homeLogo} alt="" />
              <span>Trang chủ</span>
              </a>

              <a 
                href="/account" 
                className="flex items-center space-x-1"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLoginOpen(true);
                }}
              >
                <img src={accountLogo} alt="" />
                <span>Tài khoản</span>
              </a>
               {/* Login Modal */}
              {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}

              <a href="/cart" className="relative">
              <img src={cartLogo} alt="" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                  0
              </span>
              </a>
          </div>
          </div>
          
    </div>
  );
};

export default MainHeader;
