import fsLogo from "../../assets/icons/freeship-img.png";

const TopBanner = () =>{
    return (
        <div className="flex gap-[4px] mx-auto  items-center justify-center bg-green-50 text-green-600 text-center font-bold text-sm py-3 px-4">
            <span className="block text-xs pl-1">Freeship đơn từ 45k, giảm nhiều hơn cùng</span>
            <img src={fsLogo} alt="" className="block w-[80px]" />
        </div>
    );
};

export default TopBanner;