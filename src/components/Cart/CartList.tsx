import type { Book } from "../../../type/Book";
import CartItem from "./CartItem";
import shopIcon from "../../assets/icons/icon-shop.png"
import trashIcon from '../../assets/icons/trash.svg';

type CartItem = Book & { quantity?: number; isSelected?: boolean };

type ShopSection = {
  shopId: number;
  shopName: string;
  shopLogo?: string;
  shopLink?: string;
  items: CartItem[];
};

type CartListProps = {
  cartItems: CartItem[];
  onSelectAll: (checked: boolean) => void;
  onSelectItem: (productId: string, checked: boolean) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onRemoveSelected: () => void;
};

const CartList = ({ cartItems, onSelectAll, onSelectItem, onQuantityChange, onRemoveItem, onRemoveSelected }: CartListProps) => {
  const allSelected = cartItems.length > 0 && cartItems.every((i) => i.isSelected);

  const shopSections: ShopSection[] = cartItems.reduce((shops: ShopSection[], item) => {
    const storeId = item.current_seller?.store_id;
    const storeName = item.current_seller?.name;
    
    if (!storeId || !storeName) return shops;
    
    const existingShop = shops.find(shop => shop.shopId === storeId);
    
    if (existingShop) {

      existingShop.items.push(item);
    } else {
     
      shops.push({
        shopId: storeId,
        shopName: storeName,
        shopLogo: item.current_seller?.logo,
        shopLink: item.current_seller?.link,
        items: [item]
      });
    }
    
    return shops;
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => onSelectAll(e.target.checked)}
              className="h-5 w-5 accent-blue-600 cursor-pointer"
            />
            <span className="font-medium">Tất cả ({cartItems.length} sản phẩm)</span>
          </label>

          <div className="hidden md:flex items-center gap-10 text-sm text-gray-500 pr-2">
            <span className="w-[120px] text-center">Đơn giá</span>
            <span className="w-[120px] text-center">Số lượng</span>
            <span className="w-[120px] text-center">Thành tiền</span>
            <button
                type="button"
                onClick={onRemoveSelected}
                className="ml-auto text-gray-400 hover:text-red-500 cursor-pointer"
                aria-label="remove-item"
                title="Xóa"
            >
              <img src={trashIcon} alt="" />
            </button>
          </div>
        </div>
      </div>


      {shopSections.map((shop) => (
        <div key={shop.shopId} className="bg-white rounded-xl ">

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={shop.items.every(item => item.isSelected)}
                  onChange={(e) => {
                    shop.items.forEach(item => {
                      const productId = item.current_seller?.product_id || '';
                      onSelectItem(productId, e.target.checked);
                    });
                  }}
                  className="h-4 w-4 accent-blue-600 cursor-pointer"
                />
                <div className="flex items-center gap-3">
                    <img src={shopIcon} alt="" className="h-4 w-4"/>
                    <span className="font-medium text-gray-700">{shop.shopName}</span>
                    <span className="text-gray-400">&gt;</span>
                
                </div>
              </div>

              
              <div className="text-sm text-gray-500">
                {shop.items.length} sản phẩm
              </div>
            </div>
          </div>

          
          <div>
            {shop.items.map((item) => {
              const productId = item.current_seller?.product_id ?? "";
              return (
                <CartItem
                  key={productId}
                  item={item}
                  isSelected={Boolean(item.isSelected)}
                  onSelected={(checked) => onSelectItem(productId, checked)}
                  onQuantityChange={(quantity) => onQuantityChange(productId, quantity)}
                  onRemove={() => onRemoveItem(productId)}
                />
              );
            })}
          </div>

          <div className="p-3 bg-white">
            <div className="flex items-center justify-between text-sm">
              <button type="button" className="flex items-center gap-2 hover:text-blue-700">
                <span className="inline-block h-5 w-5 rounded bg-blue-100 text-blue-600 grid place-items-center">%</span>
                <span>Thêm mã khuyến mãi của {shop.shopName}</span>
              </button>
            </div>
            
          </div>
          <div className="bg-white rounded-xl p-3">
            <div className="font-medium text-sm text-gray-600 flex items-center gap-2">
              <span className="inline-block h-5 w-5 rounded bg-green-100 text-green-600 grid place-items-center">��</span>
              <span>Freeship 10k đơn từ 45k, Freeship 25k đơn từ 100k</span>
            </div>
          </div>
        </div>
      ))}

      
    </div>
  );
};

export default CartList;