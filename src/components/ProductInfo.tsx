// src/components/ProductInfo.tsx
import React, { useState } from "react";

interface Book {
  title: string;
  author: string;
  price: number;
  salePrice: number;
  imageUrl: string;
  bookDetails: string;
  publisher: string;
  publicationDate: string;
  category: string;
  size: string;
  pageCount: number;
  description: string;
  rating: number;
}

const ProductInfo: React.FC<{ book: Book }> = ({ book }) => {
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className="product-info">
      <div className="product-header">
        <div className="product-image">
          <img src={book.imageUrl} alt={book.title} />
        </div>
        <div className="product-details">
          <h1>{book.title}</h1>
          <p>
            <strong>Tác giả:</strong> {book.author}
          </p>
          <p>
            <strong>Giá:</strong>{" "}
            <span className="price">
              {book.salePrice ? book.salePrice : book.price}₫
            </span>
          </p>
          <div className="rating">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={index < book.rating ? "filled" : "empty"}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="additional-details">
        <h2>Thông tin chi tiết</h2>
        <ul>
          <li>
            <strong>Bookcare:</strong> {book.bookDetails}
          </li>
          <li>
            <strong>Công ty phát hành:</strong> {book.publisher}
          </li>
          <li>
            <strong>Ngày xuất bản:</strong> {book.publicationDate}
          </li>
          <li>
            <strong>Kích thước:</strong> {book.size}
          </li>
          <li>
            <strong>Dịch giả:</strong> {book.category}
          </li>
          <li>
            <strong>Loại bìa:</strong> {book.bookDetails}
          </li>
          <li>
            <strong>Số trang:</strong> {book.pageCount}
          </li>
        </ul>
      </div>

      <div className="description">
        <h2>Mô tả sản phẩm</h2>
        <p>
          {isDescriptionExpanded
            ? book.description
            : `${book.description.substring(0, 200)}...`}
        </p>
        <button onClick={toggleDescription}>
          {isDescriptionExpanded ? "Thu gọn" : "Xem thêm"}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
