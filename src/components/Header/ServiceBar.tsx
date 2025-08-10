import shieldIcon from "../../assets/icons/icon-0.png";
import truckIcon from "../../assets/icons/icon-1.png";
import refundIcon from "../../assets/icons/icon-2.png";
import returnIcon from "../../assets/icons/icon-3.png";
import flashIcon from "../../assets/icons/icon-4.png";
import tagIcon from "../../assets/icons/icon-5.png";

const services = [
    { icon: shieldIcon, text: "100% hàng thật" },
    { icon: truckIcon, text: "Freeship mọi đơn" },
    { icon: refundIcon, text: "Hoàn 200% nếu hàng giả" },
    { icon: returnIcon, text: "30 ngày đổi trả" },
    { icon: flashIcon, text: "Giao nhanh 2h" },
    { icon: tagIcon, text: "Giá siêu rẻ" },
];

const ServiceBar = () => {
    return (
        <div className="flex items-center space-x-6 px-6 py-3 text-sm b bg-white border-[1px] border-gray-200">
            <span className="font-bold text-blue-700">Cam kết</span>
            {services.map((srv, index) => (
                <div key={index} className="flex gap-[12px] item-centers">
                    <img src={srv.icon} alt={srv.text} className="w-5 h-5 mr-1" />
                    <span>{srv.text}</span>
                    <div className="w-[1px] h-[20px] bg-gray-200 ml-3"></div>
                </div>
            ))}
        </div>
    );
};

export default ServiceBar;