import { useEffect, useState, useContext, useRef } from "react";
import tikiLogo from "../../assets/icons/tiki-logo.png";
import searchIcon from "../../assets/icons/icon-search.png"
import homeLogo from "../../assets/icons/header_menu_item_home.png";
import accountLogo from "../../assets/icons/header_header_account_img.png";
import cartLogo from "../../assets/icons/header_header_img_Cart.png";
import { useLocation, useNavigate } from "react-router-dom";

import LoginModal from "../Login/LoginModal";
import CategoryMenu from "./CategoryMenu";
import { AppContext } from "../../context/AppProvider";
import { Link } from "react-router-dom";

const MainHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { user, setUser, messageApi } = useContext(AppContext);

  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const totalQuantity = cart.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
    setCartCount(totalQuantity);
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    setSearchValue(q);
  }, [location.search]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowAccountMenu(false);
      }
    }
    if (showAccountMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAccountMenu]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = searchValue.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }

  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    messageApi.open({
      type: 'success',
      content: `Đăng xuất thành công!`,
    });
    setUser(null);
    setShowAccountMenu(false);
  };
  const getInitial = (fullName?: string) => {
    if (!fullName) return "T";
    return fullName.charAt(0).toUpperCase();
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
              <img src={searchIcon} alt="" className="w-5 h-5 m-auto ml-3 " />
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

          <CategoryMenu />
        </div>
        <div className="flex self-start pt-3 space-x-6">
          <a href="/" className="flex self-start space-x-1">
            <img src={homeLogo} alt="" />
            <span>Trang chủ</span>
          </a>

          {!user ? (
            <>
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
              {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
            </>
          ) : (
            <div className="relative">
              <div
                className="cursor-pointer flex items-center space-x-2"
                onClick={() => setShowAccountMenu(!showAccountMenu)}
              >
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  {getInitial(user.fullName!)}
                </div>
                <span>{user.fullName}</span>
              </div>

              {showAccountMenu && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50"
                >
                  <ul className="text-sm">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link
                        to="myprofit/userinfo"
                        onClick={() => setShowAccountMenu(false)}
                      >
                        Thông tin cá nhân
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link
                        to="myprofit/inform"
                        onClick={() => setShowAccountMenu(false)}
                      >
                        Thông báo của tôi
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link
                        to="myprofit/order"
                        onClick={() => setShowAccountMenu(false)}
                      >
                        Quản lý đơn hàng
                      </Link>
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer"
                      onClick={() => {
                        handleLogout();
                        setShowAccountMenu(false);
                      }}
                    >
                      Đăng xuất
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
          {/* Login Modal */}
          {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}

          <a href="/cart" className="relative">
            <img src={cartLogo} alt="" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </div>

    </div>
  );
};

export default MainHeader;