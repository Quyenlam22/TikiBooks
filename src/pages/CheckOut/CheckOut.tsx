import React, { useContext } from 'react';
import ShippingMethod from '../../components/CheckOut/ShippingMethod';
import ProductInfo from '../../components/CheckOut/ProductInfo';
import PaymentMethod from '../../components/CheckOut/PaymentMethod';
import ReceiverInfo from '../../components/CheckOut/ReceiverInfo';
import ShippingPromo from '../../components/CheckOut/ShippingPromo';
import OrderSummary from '../../components/CheckOut/OrderSummary';
import { AppContext } from '../../context/AppProvider';

const CheckOut = () => {
    const { dataBook, selectedBookId, user } = useContext(AppContext);
    const book = dataBook.find(b => b.id === selectedBookId);
    const [shippingType, setShippingType] = React.useState<'express' | 'economy'>('express');
    const [shippingPromoSelected, setShippingPromoSelected] = React.useState(true);

    // Tính phí vận chuyển
    const shippingFee = shippingType === 'express' ? 25000 : 16000;
    // Tính giảm giá vận chuyển
    const shippingDiscount = shippingPromoSelected ? 25000 : 0;

    const totalPrice = book?.list_price || 169000;
    const directDiscount = book ? (book.list_price - (book.current_seller?.price || 0)) : 59000;
    const finalPrice = totalPrice + shippingFee - directDiscount - shippingDiscount;
    const savedAmount = directDiscount + shippingDiscount;

    return (
        <div className="flex flex-row gap-6 w-full justify-center items-start mt-6">
            <div className="flex-1 max-w-2xl flex flex-col gap-6">
                <ShippingMethod value={shippingType} onChange={setShippingType} />
                {book && <ProductInfo book={book} />}
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
                />
            </div>
        </div>
    )
}

export default CheckOut;