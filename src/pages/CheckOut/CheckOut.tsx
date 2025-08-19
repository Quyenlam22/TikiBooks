import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ShippingMethod from '../../components/CheckOut/ShippingMethod';
import ProductInfo from '../../components/CheckOut/ProductInfo';
import PaymentMethod from '../../components/CheckOut/PaymentMethod';
import ReceiverInfo from '../../components/CheckOut/ReceiverInfo';
import ShippingPromo from '../../components/CheckOut/ShippingPromo';
import OrderSummary from '../../components/CheckOut/OrderSummary';
import { AppContext } from '../../context/AppProvider';
import { createOrder } from '../../services/orderService';
import type { Order } from '../../../type/order';
import { getStatusFromCreatedAt } from '../../utils/orderstatus';
import { LuTicketPercent } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";

const CheckOut = () => {
    const { dataBook, selectedBookId, user } = useContext(AppContext);
    const book = dataBook.find(b => b.id === selectedBookId);
    const [shippingType, setShippingType] = React.useState<'express' | 'economy'>('express');
    const [shippingPromoSelected, setShippingPromoSelected] = React.useState(true);
    const navigate = useNavigate();
    const [quantity, setQuantity] = React.useState(1);

    // Tính phí vận chuyển
    const shippingFee = shippingType === 'express' ? 25000 : 16000;
    // Tính giảm giá vận chuyển
    const shippingDiscount = shippingPromoSelected ? 25000 : 0;

    const totalPrice = book?.list_price || 169000;
    const directDiscount = book ? (book.list_price - (book.current_seller?.price || 0)) : 59000;
    const totalAmount = totalPrice * quantity;
    const totalDiscount = directDiscount * quantity;
    const finalPrice = totalAmount + shippingFee - totalDiscount - shippingDiscount;
    const savedAmount = directDiscount + shippingDiscount;

    const handleOrderSubmit = async () => {
        if (!user || !book) {
            alert('Thiếu thông tin người dùng hoặc sản phẩm');
            return;
        }
        const createdAt = new Date().toISOString();
        const orderData: Omit<Order, 'id' | 'updatedAt'> = {
            userId: user.id!,
            address: user.address || '',
            products: [
                {
                    id: Number(book.id),
                    name: book.name,
                    price: book.current_seller?.price || book.list_price,
                    quantity: quantity,
                    images: book.images?.length
                        ? [{
                            base_url: book.images[0].base_url,
                            // thumbnail_url: book.images[0].thumbnail_url
                        }]
                        : [],
                },
            ],
            totalPrice: finalPrice,
            status: getStatusFromCreatedAt(createdAt),
            fullname: user.fullName || '',
            phone: user.phone || '',
            createdAt: createdAt
        };

        try {
            const order = await createOrder(orderData);
            // console.log('Order created successfully', orderData);
            setTimeout(() => {
                navigate(`/order/${order.id}`);
            }, 1000); // delay 2 giây
        } catch (error) {
            console.error(error);
            alert('Đặt hàng thất bại. Vui lòng thử lại.');
        }
    };


    return (
        <div className="flex flex-row gap-6 w-full justify-center items-start mt-6">
            <div className="flex-1 max-w-2xl flex flex-col gap-4">
                <div className='bg-white'>
                    <ShippingMethod value={shippingType} onChange={setShippingType} />
                    {book && (
                        <div className="mt-2 mb-6 ml-4">
                            <label htmlFor="quantity" className="mr-2 font-semibold">Số lượng:</label>
                            <input
                                id="quantity"
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="border rounded px-2 py-1 w-20"
                            />
                        </div>
                    )}

                    {book && <ProductInfo book={book} quantity={quantity} shippingFee={shippingFee} />}
                    
                    <div className='flex items-center gap-1 text-md py-4 mx-4 border-t border-gray-300'>
                        <LuTicketPercent className='text-xl text-blue-700'/>
                        Thêm mã khuyến mãi của shop
                        <MdKeyboardArrowRight className='text-2xl'/>
                    </div>
                </div>
                <PaymentMethod />
            </div>
            <div className="w-[340px] flex flex-col gap-4">
                {user && <ReceiverInfo user={user} />}
                <ShippingPromo selected={shippingPromoSelected} onChange={setShippingPromoSelected} />
                <OrderSummary
                    totalPrice={totalPrice}
                    shippingFee={shippingFee}
                    directDiscount={directDiscount}
                    shippingDiscount={shippingDiscount}
                    finalPrice={finalPrice}
                    savedAmount={savedAmount}
                    onOrderSubmit={handleOrderSubmit}
                    quantity={quantity}
                />
            </div>
        </div>
    );
};

export default CheckOut;
