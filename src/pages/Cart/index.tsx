import { useState, useEffect, useContext } from "react";
import CartList from "../../components/Cart/CartList";
import CartSummary from "../../components/Cart/CartSummary";
import type { Book } from "../../type/Book";
import { useNavigate } from "react-router";
import { AppContext } from "../../context/AppProvider";

interface CartItem extends Book {
  quantity: number;
  isSelected: boolean;
}

const CartPage = () => {  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const {setCheckoutBooks} = useContext(AppContext);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart');
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        setCartItems(parsed);
      } else {
        setCartItems([]);
      }
    } catch {
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch {
    }
  }, [cartItems]);

  const handleSelectAll = (checked: boolean) => {
    setCartItems(prev => 
      prev.map(item => ({ ...item, isSelected: checked }))
    );
  };

  const handleSelectItem = (productId: string, checked: boolean) => {
    setCartItems(prev => 
      prev.map(item => 
        item.current_seller?.product_id === productId 
          ? { ...item, isSelected: checked }
          : item
      )
    );
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.current_seller?.product_id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => 
      prev.filter(item => item.current_seller?.product_id !== productId)
    );
  };

  const handleRemoveSelected = () => {
    setCartItems(prev => prev.filter(item => !item.isSelected));
  };

  const selectedItems = cartItems.filter(item => item.isSelected);
  
  const subtotalOriginal = selectedItems.reduce((sum, item) => {
    const originalPrice = item.original_price || 0;
    return sum + (originalPrice * (item.quantity || 1));
  }, 0);
  
  const subtotalCurrent = selectedItems.reduce((sum, item) => {
    const currentPrice = item.current_seller?.price || 0;
    return sum + (currentPrice * (item.quantity || 1));
  }, 0);
  
  const totalDiscount = selectedItems.reduce((sum, item) => {
    const originalPrice = item.original_price || 0;
    const currentPrice = item.current_seller?.price || 0;
    return sum + ((originalPrice - currentPrice) * item.quantity);
  }, 0);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán!");
      return;
    }

    setCheckoutBooks(
      selectedItems.map(item => ({ book: {...item}, quantity: item.quantity, }))
    ); 
    navigate("/checkout");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Đang tải giỏ hàng...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">GIỎ HÀNG</h1>
          <div className="bg-white rounded-lg shadow-sm p-12">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l-.386-1.902L5.5 6.5H17a1 1 0 00.89-.55l2.5-5A1 1 0 0019 0H3zM6.5 6.5L5.5 6.5H6.5zM8 9a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-500 mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
            <button 
              onClick={() => window.history.back()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">GIỎ HÀNG</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartList
              cartItems={cartItems}
              onSelectAll={handleSelectAll}
              onSelectItem={handleSelectItem}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
              onRemoveSelected={handleRemoveSelected}
            />
          </div>

          <div className="lg:col-span-1">
            <CartSummary
              selectedItems={selectedItems}
              subtotalOriginal={subtotalOriginal}
              subtotalCurrent={subtotalCurrent}
              totalDiscount={totalDiscount}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;