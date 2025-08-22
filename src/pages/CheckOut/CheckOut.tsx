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
import type { Order } from '../../type/order';
import { getStatusFromCreatedAt } from '../../utils/orderstatus';
import { LuTicketPercent } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";

const CheckOut = () => {
  const { checkoutBooks, user, messageApi } = useContext(AppContext);
  const [shippingType, setShippingType] = React.useState<'express' | 'economy'>('express');
  const [shippingPromoSelected, setShippingPromoSelected] = React.useState(true);
  const navigate = useNavigate();

  if (!checkoutBooks || checkoutBooks.length === 0) {
    return <div className="text-center mt-10">Chưa có sản phẩm để thanh toán</div>;
  }

  // phí ship
  const shippingFee = shippingType === 'express' ? 25000 : 16000;
  // giảm ship
  const shippingDiscount = shippingPromoSelected ? 25000 : 0;

  // Tổng tiền gốc (chưa giảm)
  const totalPrice = checkoutBooks.reduce(
    (sum, item) =>
      sum + (item.book.list_price || 0) * (item.quantity || 1),
    0
  );

  // Giảm giá trực tiếp (so với list_price)
  const directDiscount = checkoutBooks.reduce(
    (sum, item) =>
      sum + ((item.book.list_price || 0) - (item.book.current_seller?.price || 0)) * (item.quantity || 1),
    0
  );

  const finalPrice = totalPrice + shippingFee - directDiscount - shippingDiscount;
  const savedAmount = directDiscount + shippingDiscount;

  const handleOrderSubmit = async () => {
    if (!user) {
      messageApi.open({
        type: 'warning',
        content: 'Thiếu thông tin người dùng'
      });
      return;
    }

    const createdAt = new Date().toISOString();

    const orderData: Omit<Order, 'id' | 'updatedAt'> = {
      userId: user.id!,
      address: user.address || '',
      products: checkoutBooks.map(item => ({
        id: Number(item.book.id),
        name: item.book.name,
        price: item.book.current_seller?.price || item.book.list_price,
        quantity: item.quantity || 1,
        images: item.book.images?.length ? [{ base_url: item.book.images[0].base_url }] : [],
      })),
      totalPrice: finalPrice,
      status: getStatusFromCreatedAt(createdAt),
      fullname: user.fullName || '',
      phone: user.phone || '',
      createdAt
    };

    try {
      const order = await createOrder(orderData);
      setTimeout(() => {
        navigate(`/order/${order.id}`);
      }, 1000);
    } catch (error) {
      console.error(error);
      messageApi.open({
        type: 'error',
        content: `Đặt hàng thất bại. Vui lòng thử lại.`,
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full justify-center items-start mt-6">
      <div className="w-full lg:flex-1 max-w-2xl  flex flex-col gap-4">
        <div className="bg-white">
          <ShippingMethod value={shippingType} onChange={setShippingType} />

          <ProductInfo
            books={checkoutBooks}
            shippingFee={shippingFee}
            shippingLabel={shippingType}
          />

          <div className="flex items-center gap-1 text-md py-4 mx-4 border-t border-gray-300">
            <LuTicketPercent className="text-xl text-blue-700" />
            Thêm mã khuyến mãi của shop
            <MdKeyboardArrowRight className="text-2xl" />
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
          quantity={checkoutBooks.reduce((sum, item) => sum + (item.quantity || 1), 0)}
          onOrderSubmit={handleOrderSubmit}
        />
      </div>
    </div>
  );
};

export default CheckOut;
