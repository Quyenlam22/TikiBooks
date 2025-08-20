import React from 'react';
import { Link } from 'react-router-dom';


type OrderInfoProps = {
    orderid: number;
    orderCode?: number;
    deliveryDate: string;
    productName: string;
    images?: {
        base_url?: string;
    }[];
};

const OrderInfo: React.FC<OrderInfoProps> = ({ orderid, orderCode, deliveryDate, productName, images }) => {

    return (
        <div className="w-full max-w-[318px] h-[165px] bg-white rounded shadow-md border border-gray-200 p-4 text-xs flex flex-col justify-between">
            <div className="flex justify-between items-center">
                <span className="text-[#030303]">
                    Mã đơn hàng: <span className="font-semibold">{orderCode}</span>
                </span>
                <Link to={`/myprofit/order/${orderid}`}>Xem đơn hàng</Link>

            </div>

            <div className="text-gray-700">{deliveryDate}</div>

            <div className="flex items-center gap-3">
                {images && images[0]?.base_url ? (
                    <img
                        src={images[0].base_url}
                        alt={productName}
                        className="w-12 h-16 object-cover rounded border"

                    />
                ) : (
                    <div className="w-12 h-16 bg-amber-300 rounded border" />
                )}
                <span className="text-gray-800 leading-tight">{productName}</span>
            </div>
        </div>
    );
};

export default OrderInfo;
