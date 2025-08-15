import React, { useState } from "react";
import type { Book } from "../../../type/Book";
import { Rate } from "antd";
import { Link } from "react-router";

interface BookDetailProps {
  book: Book
}

const BookInfo: React.FC<BookDetailProps> = ({ book }) => {
  const [showMore, setShowMore] = useState(false);
  const hasDiscount =
    book.list_price &&
    book.list_price > book.current_seller.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((book.list_price! - book.current_seller.price) /
          book.list_price!) *
          100
      )
    : 0;

  const infoSpec = book.specifications[0];

  if (!infoSpec || infoSpec.attributes.length === 0) return null;

  return (
    <div className="w-[390px] sm:w-[584px]">
      <div className="p-4 mb-4 bg-white rounded-lg shadow-sm">
        <div className="text-sm text-gray-500 space-x-1">
          <span className="text-gray-400">Tác giả:</span>
          {book.authors?.length > 0 ? (
            <Link
              key={book.authors[0].id}
              to={`/author/${book.authors[0].slug}`}
              className="text-sky-600 hover:underline"
            >
              {book.authors[0].name}
            </Link>
          ) : (
            <span className="text-gray-500 italic">Không có thông tin</span>
          )}
        </div>
        <h3 className="my-2 text-xl font-medium text-gray-900">{book.name}</h3>

        <div className="flex items-center mt-1 space-x-1">
          <span className="text-sm font-medium">{book.rating_average.toFixed(1)}</span>
          <Rate
            disabled
            defaultValue={book.rating_average}
            allowHalf
            className="text-yellow-400 !text-sm tight-rate"
          />
        </div>

        <div className="my-2 flex items-center space-x-2">
          <span className="text-xl font-semibold text-red-500">
            {book.current_seller.price.toLocaleString()}<sup>₫</sup>
          </span>
          {hasDiscount && (
            <>
              <span className="text-xs bg-gray-100 p-0.5 rounded-md">-{discountPercent}%</span>
              <span className="text-gray-400 line-through text-sm">
                {book.list_price!.toLocaleString()}<sup>₫</sup>
              </span>
            </>
          )}
        </div>
      </div>
      
      <div className="bg-white mb-4 rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Thông tin chi tiết</h2>
        <table className="w-full text-sm border-collapse">
          <tbody>
            {infoSpec.attributes.map((attr, idx) => (
              <tr
                key={idx}
                className="border-gray-300 border-b last:border-0"
              >
                <td className="py-2 text-gray-500 w-1/2">{attr.name}</td>
                <td className="py-2 text-gray-800">
                  {attr.code === "publication_date"
                    ? new Date(attr.value).toLocaleDateString("vi-VN")
                    : attr.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white mb-4 rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Mô tả sản phẩm</h2>
        <div className="relative">
          <div
            className={`text-gray-700 text-sm transition-all duration-300`}
            dangerouslySetInnerHTML={{
              __html: showMore
                ? book.description
                : book.description.slice(0, 250) + "..."
            }}
          />
          {!showMore && (
            <div className="absolute bottom-0 left-0 w-full h-12 
                            bg-gradient-to-t from-white to-transparent pointer-events-none">
            </div>
          )}
        </div>
        <div className="text-center">
          <button
            className="mt-2 cursor-pointer text-blue-500 hover:underline"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Thu gọn" : "Xem thêm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
