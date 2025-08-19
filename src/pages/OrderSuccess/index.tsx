import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderInfo from '../../components/OrderSuccess/Orderinfor';
import OrderSummary from '../../components/OrderSuccess/OrderSumary';
import { getOrderById } from '../../services/orderService';
import type { Order } from '../../../type/order';

import './OrderSuccess.css';

function OrderSuccess() {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        getOrderById(Number(id))
            .then(data => setOrder(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div>Đang tải đơn hàng...</div>;
    if (!order) return <div>Không tìm thấy đơn hàng</div>;

    // Nếu bạn có các thông tin khác trong order thì lấy từ đó, hoặc tính ra
    const shippingFee = 25000;
    const directDiscount = 0;
    const shippingDiscount = 0;
    const finalPrice = order.totalPrice;
    const savedAmount = directDiscount + shippingDiscount;
    console.log('order.products[0]:', order.products[0]);
    console.log('order.products[0].images:', order.products[0].images);


    return (

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-[1080px] mx-auto">

            <OrderSummary
                totalPrice={order.totalPrice}
                shippingFee={shippingFee}
                directDiscount={directDiscount}
                shippingDiscount={shippingDiscount}
                finalPrice={finalPrice}
                savedAmount={savedAmount}

            />
            <div className="flex justify-center w-full max-w-[318px]">
                <OrderInfo
                    orderid={order.id!}
                    orderCode={order.id}
                    deliveryDate={'Thứ 6, trước 13h, 28/03'} // Thay bằng ngày giao thực tế nếu có
                    productName={order.products[0]?.name || ''}
                    images={order.products[0]?.images || []}
                />
            </div>
        </div>
    );
}

export default OrderSuccess;
