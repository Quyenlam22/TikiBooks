import type { Book } from "../../type/Book";
import addIcon from '../../assets/icons/icons-add.svg';
import subIcon from '../../assets/icons/icons-sub.svg';
import trashIcon from '../../assets/icons/trash.svg';
type CartItemProps = {
    item: Book & { quantity?: number};
    isSelected: boolean;
    onSelected: (checked: boolean) => void;
    onQuantityChange: (quantity: number) => void;
    onRemove: () => void;
};

const CartItem = ({item, isSelected, onSelected, onQuantityChange, onRemove}: CartItemProps) => {
    const productId = item.current_seller?.product_id ?? "";
    const quantity = item.quantity ?? 1;
    const price = item.current_seller?.price ?? 0;
    const originalPrice = item.original_price ?? 0;
    const lineTotal = price * quantity;

  return (
    <div className="flex items-center justify-start gap-3 py-4">
        <input 
        aria-label={`select-${productId}`} 
        type="checkbox" 
        checked ={isSelected}
        onChange={(e) => onSelected(e.target.checked)}
        className="mt-2 ml-4 h-4 w-4 accent-blue-600 cursor-pointer"
        />
        <img src={item.images?.[0]?.thumbnail_url || item.images?.[0]?.small_url || "https://via.placeholder.com/80x80"}
        alt={item.name}
        className="h-20 w-20 object-cover rounded" 
        />

        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</div>
                

            <div className="flex items-center gap-10">
                <div className="min-w-30">
                <div className="text-red-600 font-semibold ml-8">{price.toLocaleString("vi-VN")}<sup>₫</sup></div>
                {originalPrice > price && (
                    <div className="text-gray-400 line-through text-xs">{originalPrice.toLocaleString("vi-VN")}<sup>₫</sup></div>
                )}
                </div>
                <div className="flex items-center rounded overflow-hidden">
                    <button
                    type="button"
                    aria-label="decrease"
                    className="h-8 w-8 flex items-center justify-center border border-gray-300 hover:bg-gray-50"
                    onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                    >
                    <img src={subIcon} alt="" />
                    </button>
                    <div className="h-8 w-10 flex items-center justify-center border-y border-gray-300 text-sm">{quantity}</div>
                    <button
                    type="button"
                    aria-label="increase"
                    className="h-8 w-8 flex items-center justify-center border border-gray-300 hover:bg-gray-50"
                    onClick={() => onQuantityChange(quantity + 1)}
                    >
                    <img src={addIcon} alt="" />
                    </button>
                </div>
                <div className="min-w-[120px] font-semibold text-red-600">{lineTotal.toLocaleString("vi-VN")}<sup>₫</sup></div>


                <button
                    type="button"
                    onClick={onRemove}
                    className="ml-auto mr-6 text-gray-400 hover:text-red-500 cursor-pointer"
                    aria-label="remove-item"
                    title="Xóa"
                >
                    <img src={trashIcon} alt="" />
                </button>
            </div>
        </div>
        <div className="mt-1 text-xs text-gray-500 items-center gap-2">
                    <div>NOW Giao siêu tốc 2h</div>
                    <div>Có thể bọc bằng Bookcare</div>
                </div>
        </div>
    </div>
  );
};

export default CartItem;
