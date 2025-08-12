import React from 'react';

const InfoBlock: React.FC = () => {
    return (
        <div className="w-full  lg:px-0 mb-6">
            {/* Tiêu đề */}
            <div className="hidden sm:flex sm:flex-wrap sm:space-x-4 mb-2">
                <h4 className="w-full sm:w-[317px] font-semibold mb-2 sm:mb-0">Địa chỉ người nhận</h4>
                <h4 className="w-full sm:w-[317px] font-semibold mb-2 sm:mb-0">Hình thức giao hàng</h4>
                <h4 className="w-full sm:w-[317px] font-semibold">Hình thức thanh toán</h4>
            </div>

            {/* Nội dung từng box */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                {/* Box 1 */}
                <div className="w-full sm:w-[317px] bg-white p-4 rounded-md shadow-sm">
                    {/* Tiêu đề hiển thị riêng trên mobile */}
                    <h4 className="sm:hidden font-semibold mb-2">Địa chỉ người nhận</h4>
                    <p>Võ Anh Tú</p>
                    <p>Số 17 Duy Tân, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội</p>
                    <p>0942436893</p>
                </div>

                {/* Box 2 */}
                <div className="w-full sm:w-[317px] bg-white p-4 rounded-md shadow-sm">
                    <h4 className="sm:hidden font-semibold mb-2">Hình thức giao hàng</h4>
                    <p>Giao siêu tốc</p>
                    <p>Trước 13h, 28/03</p>
                </div>

                {/* Box 3 */}
                <div className="w-full sm:w-[317px] bg-white p-4 rounded-md shadow-sm">
                    <h4 className="sm:hidden font-semibold mb-2">Hình thức thanh toán</h4>
                    <p>Thanh toán tiền mặt khi nhận hàng</p>
                </div>
            </div>
        </div>
    );
};

export default InfoBlock;
