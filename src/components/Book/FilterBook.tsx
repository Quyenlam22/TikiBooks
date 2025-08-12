import { Dropdown, Checkbox, Rate, type MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../../context/AppProvider';
import BookList from './BookList';
import { AiFillLike } from "react-icons/ai";
import type { Book } from '../../../type/Book';
import type { MenuItemType } from 'antd/es/menu/interface';

const sortMenuItems: MenuItemType[] = [
  {
    key: 'popular',
    label: 'Phổ biến',
  },
  {
    key: 'top_seller',
    label: 'Bán chạy nhất',
  },
  {
    key: 'top_rate',
    label: 'Rate cao nhất',
  },
  {
    key: 'price_asc',
    label: 'Giá tăng dần',
  },
  {
    key: 'price_desc',
    label: 'Giá giảm dần',
  },
];

function FilterBook() {
  const { dataBook } = useContext(AppContext);

  const [filterByRating, setFilterByRating] = useState(() => {
    const saved = localStorage.getItem('filterByRating');
    return saved ? JSON.parse(saved) : false;
  });
  const [sortKey, setSortKey] = useState(() => {
    return localStorage.getItem('sortKey') || 'popular';
  });
  
  const [sortedBooks, setSortedBooks] = useState<Book[]>([]);

  const filteredBooks = useMemo(() => {
    return filterByRating
      ? dataBook.filter((book) => book.rating_average >= 4)
      : dataBook;
  }, [dataBook, filterByRating]);

  useEffect(() => {
    localStorage.setItem('filterByRating', JSON.stringify(filterByRating));
  }, [filterByRating]);

  useEffect(() => {
    localStorage.setItem('sortKey', sortKey);
  }, [sortKey]);

  useEffect(() => {
    let newBooks = [...filteredBooks];
    switch (sortKey) {
      case "top_seller":
        newBooks.sort((a, b) => b.quantity_sold?.value - a.quantity_sold?.value);
        break;
      case "top_rate":
        newBooks.sort((a, b) => b.rating_average - a.rating_average);
        break;
      case "price_asc":
        newBooks.sort((a, b) => a.current_seller.price - b.current_seller.price);
        break;
      case "price_desc":
        newBooks.sort((a, b) => b.current_seller.price - a.current_seller.price);
        break;
      default:
        break;
    }
    setSortedBooks(newBooks);
  }, [filteredBooks, sortKey]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSortKey(e.key);
  };

  const selectedItem = sortMenuItems.find(item => item.key === sortKey);

  return (
    <div>
      <div className="mb-4 bg-white rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">Tất cả sản phẩm</h2>

        <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-4 pb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox />
            <span className="text-red-500 font-bold text-sm">NOW</span>
            <span className="text-sm text-gray-600">Giao siêu tốc 2H</span>
          </label>

          <span className="text-gray-300">|</span>

          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox />
            <span className="text-red-500 font-bold text-sm flex gap-1 items-center"><AiFillLike /> TOP DEAL</span>
            <span className="text-sm text-gray-600">Siêu rẻ</span>
          </label>

          <span className="text-gray-300">|</span>

          <label className="flex items-center gap-2 cursor-pointer italic">
            <Checkbox />
            <span className="text-blue-600 font-bold text-sm">FREESHIP</span>
            <span className="text-green-500 font-bold text-sm">XTRA</span>
          </label>

          <span className="text-gray-300">|</span>

          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox 
              checked={filterByRating}
              onChange={(e) => setFilterByRating(e.target.checked)} 
            />
            <Rate
              disabled
              defaultValue={4}
              style={{
                fontSize: 14,
                marginRight: "2px",
              }}
              className="tight-rate"
            />
            <span className="text-sm text-gray-600">từ 4 sao</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm">Sắp xếp</span>
          <Dropdown
            className='rounded-xl border-gray-300'
            menu={{ items: sortMenuItems, onClick: handleMenuClick }}
            trigger={['click']}
          >
            <a className="border px-3 py-1 rounded text-sm cursor-pointer text-gray-800 hover:text-blue-600 hover:border-blue-400">
              {selectedItem?.label || 'Sắp xếp'} <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>

      <BookList dataBook={sortedBooks} />
    </div>
  );
}

export default FilterBook;
