import { FaBoxOpen, FaUndoAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { RightOutlined } from "@ant-design/icons";

function SecureShopping() {
    return (
        <div
            className="bg-white rounded p-4 w-[390px] sm:w-[584px] h-[194px]"
        >
            <h3 className="mb-3 flex items-center justify-between">
                An tâm mua sắm
                <span className="ml-2 text-xl"><RightOutlined style={{ fontSize: '14px', color: 'gray' }} /></span>
            </h3>

            <ul className="space-y-3 text-gray-700 text-sm" style={{ lineHeight: 1.4 }}>
                <li className="flex items-center gap-3">
                    <FaBoxOpen className="text-blue-500" size={20} />
                    <span>Được đồng kiểm khi nhận hàng</span>
                </li>
                <hr className="border-gray-300 opacity-50 my-2" />
                <li className="flex items-center gap-3">
                    <FaMoneyCheckAlt className="text-blue-500" size={20} />
                    <span>Được hoàn tiền 200% nếu là hàng giả.</span>
                </li>
                <hr className="border-gray-300 opacity-50 my-2" />

                <li className="flex items-center gap-3">
                    <FaUndoAlt className="text-blue-500" size={20} />
                    <div className="flex flex-col">
                        <div> Đổi trả miễn phí trong 30 ngày. Được đổi ý.{" "}</div>
                        <a href="#" className="underline">
                            Chi tiết
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default SecureShopping;
