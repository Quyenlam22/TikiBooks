import { useState } from 'react';
import cashIcon from '../../assets/payments/p10.png';

const PaymentMethod = () => {
  const [selected, setSelected] = useState('cash');

  return (
    <div className="payment-method p-4 bg-white rounded-lg">
      <h3 className="font-semibold mb-3">Chọn hình thức thanh toán</h3>
      <div className="flex flex-col gap-3">
        <label className={`flex items-center gap-2 cursor-pointer ${selected === 'cash' ? '' : ''}`}>
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={selected === 'cash'}
            onChange={() => setSelected('cash')}
            className="accent-blue-500 w-4 h-4"
          />
          <img src={cashIcon} alt="cash" className="w-6 h-6" />
          <span className="font-medium">Thanh toán tiền mặt</span>
        </label>
        <label className={`flex items-center gap-2 cursor-pointer ${selected === 'viettel' ? '' : ''}`}>
          <input
            type="radio"
            name="payment"
            value="viettel"
            checked={selected === 'viettel'}
            onChange={() => setSelected('viettel')}
            className="accent-blue-500 w-4 h-4"
          />
          <img src="https://play-lh.googleusercontent.com/3YPlh6BmUr5K5vD0-LWfFJDweg3VJ5XhHrnQYf6-0AiI6Azegt8NmwpXPOqQqXd6fA" alt="viettel money" className="w-6 h-6 rounded-full bg-red-500" />
          <span className="font-medium">Viettel Money</span>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;
