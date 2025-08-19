import type { Book } from "../../../type/Book";

type CartSummaryProps = {
  selectedItems: (Book & { quantity?: number })[];
  subtotalCurrent: number;
  subtotalOriginal: number;
  totalDiscount: number;

  onCheckout: () => void;
};

const CartSummary = ({ selectedItems, subtotalCurrent, subtotalOriginal, totalDiscount, onCheckout }: CartSummaryProps) => {
  const address = {
    name: "Vũ Văn Hậu",
    phone: "0981596853",
    tag: "Nhà",
    full: "Phường Mộ Lao, Quận Hà Đông, Hà Nội",
  };

  return (
    <div>
    <div className="bg-white rounded-xl p-4 mb-4 top-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Giao tới</h3>
          <button className="text-blue-600 text-sm hover:text-blue-700">Thay đổi</button>
        </div>
        <div className="rounded-lg pt-1">
          <div className="font-medium">{address.name} | {address.phone}</div>
          <div className="text-xs text-gray-500 mt-1">
            <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 mr-2">{address.tag}</span>
            {address.full}
          </div>
          <div className="mt-2 text-[11px] text-yellow-800 bg-yellow-100 rounded px-2 py-1">
            Lưu ý: Sử dụng địa chỉ nhận hàng trước sáp nhập
          </div>
        </div>

      </div>
      <div className="bg-white rounded-xl p-4 mb-4 top-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Tiki Khuyến Mãi</h3>
          <span className="text-xs text-gray-500">Có thể chọn 2</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="inline-grid place-items-center h-7 w-7 bg-blue-100 text-blue-600 rounded">TIKI</span>
              <span className="text-sm">Giảm 6% tối đa ...</span>
            </div>
            <button className="text-blue-600 text-sm">Bỏ Chọn</button>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="inline-grid place-items-center h-7 w-7 bg-green-100 text-green-600 rounded">🚚</span>
              <span className="text-sm">Giảm 50K</span>
            </div>
            <button className="text-blue-600 text-sm">Bỏ Chọn</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 sticky top-4">
      <div className="text-sm">
        <div className="flex justify-between py-1">
          <span>Tổng tiền hàng</span>
          <span>{subtotalOriginal.toLocaleString('vi-VN')}<sup>₫</sup></span>
        </div>
        {totalDiscount > 0 && (
          <div className="flex justify-between py-1 text-green-600">
            <span>Giảm giá trực tiếp</span>
            <span>-{totalDiscount.toLocaleString('vi-VN')}<sup>₫</sup></span>
          </div>
        )}
        
        <div className="flex justify-between py-2 text-lg font-semibold text-red-600">
          <span>Tổng tiền thanh toán</span>
          <span>{subtotalCurrent.toLocaleString('vi-VN')}<sup>₫</sup></span>
        </div>
        {totalDiscount > 0 && (
          <div className="text-xs text-green-600">Tiết kiệm {totalDiscount.toLocaleString('vi-VN')}<sup>₫</sup></div>
        )}
        <div className="text-[11px] text-gray-500">(Đã bao gồm VAT nếu có)</div>

        <button
          className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-3 font-medium disabled:bg-gray-400"
          onClick={onCheckout}
          disabled={selectedItems.length === 0}
        >
          Mua Hàng ({selectedItems.length})
        </button>
      </div>
      </div>
    </div>
  );
};

export default CartSummary;
