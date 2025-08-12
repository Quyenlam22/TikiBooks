import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/product";
import booksData from "../data/book.json";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Product | null>(null);

  useEffect(() => {
    const foundBook = booksData.find((b) => b.id === Number(id));
    if (foundBook) {
      setBook(foundBook);
    }
  }, [id]);

  if (!book) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        Không tìm thấy sách.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        margin: "0 auto",
        maxWidth: "1200px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={book.images.fullSize}
              alt={book.title}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            />
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
              {book.images.thumbnail.map((thumb, index) => (
                <img
                  key={index}
                  src={thumb}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: "4rem",
                    height: "4rem",
                    objectFit: "cover",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.375rem",
                  }}
                />
              ))}
            </div>
          </div>

          <div
            style={{
              flex: 2,
              padding: "1rem",
              border: "1px solid #e2e8f0",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h1
              style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}
            >
              {book.title}
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "0.875rem",
                color: "#6b7280",
                marginTop: "0.5rem",
              }}
            >
              <span>Tác giả: {book.author}</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "1rem",
                }}
              >
                <span style={{ color: "#facc15" }}>★</span>
                <span style={{ marginLeft: "0.25rem" }}>{book.rating}</span>
              </div>
            </div>
            <div
              style={{
                fontSize: "2.25rem",
                fontWeight: "bold",
                color: "#ef4444",
                margin: "1rem 0",
              }}
            >
              {book.salePrice?.toLocaleString()}₫
              {book.salePrice && (
                <span
                  style={{
                    marginLeft: "1rem",
                    fontSize: "1.25rem",
                    color: "#9ca3af",
                    textDecoration: "line-through",
                  }}
                >
                  {book.price.toLocaleString()}₫
                </span>
              )}
            </div>

            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "0.5rem",
                padding: "1rem",
                marginTop: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                Thông tin chi tiết
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  color: "#4b5563",
                }}
              >
                <div>Công ty phát hành:</div>
                <div>{book.productDetails.company}</div>
                <div>Nhà xuất bản:</div>
                <div>{book.productDetails.publisher}</div>
                <div>Ngày xuất bản:</div>
                <div>{book.productDetails.publishedDate}</div>
                <div>Kích thước:</div>
                <div>{book.productDetails.size}</div>
                <div>Số trang:</div>
                <div>{book.productDetails.pages}</div>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <h2
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                Mô tả sản phẩm
              </h2>
              <p style={{ color: "#374151", lineHeight: "1.5" }}>
                {book.description.long}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
