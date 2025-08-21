import { useContext, useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { AppContext } from "../../context/AppProvider";
import type { Book } from "../../type/Book";

const menuItems = [
  { key: "popular", label: "Phổ biến" },
  { key: "top_seller", label: "Bán chạy" },
  { key: "top_rate", label: "Rate cao" },
  { key: "price_asc", label: "Giá" },
];

export default function FilterBarMobile({ onSort }: { onSort: (books: Book[]) => void }) {
  const { dataBook } = useContext(AppContext);

  const [sortKey, setSortKey] = useState<string>(() => {
    return localStorage.getItem("sortKey") || "popular";
  });

  useEffect(() => {
    localStorage.setItem("sortKey", sortKey);
  }, [sortKey]);

  useEffect(() => {
    let newBooks = [...dataBook]; 
    switch (sortKey) {
      case "top_seller":
        newBooks.sort(
          (a, b) => (b.quantity_sold?.value || 0) - (a.quantity_sold?.value || 0)
        );
        break;
      case "top_rate":
        newBooks.sort((a, b) => b.rating_average - a.rating_average);
        break;
      case "price_asc":
        newBooks.sort((a, b) => a.current_seller.price - b.current_seller.price);
        break;
      default:
        break;
    }
    onSort(newBooks);
  }, [sortKey, dataBook]);

  const handleMenuClick = (key: string) => {
    setSortKey(key);
  };

  return (
    <div className="md:hidden bg-white w-[100vw] sm:w-[98vw]">
      <div className="flex flex-col mb-2 gap-2">
        <div className="px-2 text-md font-medium">
          <div className="px-2 text-md border-b border-gray-200 pb-4 font-medium">
            <div className="flex items-center justify-between gap-6">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleMenuClick(item.key)} 
                  className={`${
                    sortKey === item.key ? "text-blue-500" : "text-gray-600"
                  }`}
                >
                  {item.label}
                  {item.key.startsWith("price") && <span className="ml-1">⇅</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-1 px-2 pb-2">
          <div className="flex gap-1 items-center">
            <CiFilter className="text-xl font-medium" />
            <span className="border-r pr-2 border-gray-200">Lọc</span>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-red-500">
            NOW
          </span>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-red-600 flex items-center gap-1">
            👍 TOP DEAL
          </span>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold">
            <span className="text-blue-600">FREESHIP</span>{" "}
            <span className="text-green-600">XTRA</span>
          </span>
        </div>
      </div>
    </div>
  );
}