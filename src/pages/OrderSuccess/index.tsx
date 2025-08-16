import OrderInfo from "../../components/OrderSuccess/Orderinfor";
import OrderSummary from "../../components/OrderSuccess/OrderSumary";

import "./OrderSuccess.css"
function OrderSuccess() {
    return (
        <div className="flex flex-col md:flex-row gap-4  max-w-[1080px] mx-auto ">
            <OrderSummary />
            <div className="flex justify-center w-full max-w-[318px]">
                <OrderInfo />
            </div>
        </div>
    );
}

export default OrderSuccess;