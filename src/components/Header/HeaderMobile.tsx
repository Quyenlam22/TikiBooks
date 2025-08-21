import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import searchIcon from "../../assets/icons/icon-search.png";

// import LoginModal from "../Login/LoginModal";

import { FaBars, FaChevronLeft } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";

const HeaderMobile = () => {
  const [searchValue, setSearchValue] = useState("");
  // const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

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

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = searchValue.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <div className="bg-blue-400 text-white p-3 shadow-md">
      <div className="flex items-center gap-4 mb-2">
        <FaChevronLeft 
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <FaBars className="text-2xl"/>
        <form onSubmit={handleSearch} className="flex flex-1 text-gray-800 bg-white items-center border border-gray-300 rounded-md px-2">
          <img src={searchIcon} alt="Search" className="w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Bạn đang tìm kiếm gì"
            className="flex-1 py-2 min-w-[100px] text-sm outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
        <Link to="cart" className="relative">
          <IoCartOutline className="text-3xl"/>
          <span className="absolute -top-1 -right-1 bg-red-500 text-sm px-1 rounded-full">
            {cartCount || 0} 
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HeaderMobile;