import OrderInfo from "../../components/OrderSuccess/Orderinfor";
import OrderSummary from "../../components/OrderSuccess/OrderSumary";

import "./OrderSuccess.css"
function OrderSuccess() {
    return (
        <div className="flex flex-col md:flex-row gap-6 max-w-[1000px] mx-auto px-4">
            <OrderSummary />
            <div className="flex justify-center w-full md:w-auto">
                <OrderInfo />
            </div>
        </div>
    );
}

export default OrderSuccess;