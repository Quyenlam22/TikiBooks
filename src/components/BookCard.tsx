import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";

interface BookCardProps {
  book: Product;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link
      to={`/book/${book.id}`}
      style={{
        display: "block",
        padding: "1rem",
        border: "1px solid #e2e8f0",
        borderRadius: "0.5rem",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        transition: "box-shadow 0.3s ease-in-out",
        textDecoration: "none",
      }}
    >
      <img
        src={book.images.fullSize}
        alt={book.title}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: "0.375rem",
          marginBottom: "0.5rem",
        }}
      />
      <div
        style={{ fontSize: "0.875rem", fontWeight: "600", color: "#1f2937" }}
      >
        {book.title}
      </div>
      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{book.author}</div>
      <div
        style={{ display: "flex", alignItems: "center", marginTop: "0.25rem" }}
      >
        <span style={{ color: "#facc15" }}>★</span>
        <span
          style={{
            marginLeft: "0.25rem",
            fontSize: "0.875rem",
            color: "#4b5563",
          }}
        >
          {book.rating}
        </span>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        {book.salePrice ? (
          <>
            <span
              style={{
                fontSize: "1.125rem",
                fontWeight: "bold",
                color: "#ef4444",
              }}
            >
              {book.salePrice.toLocaleString()}₫
            </span>
            <span
              style={{
                marginLeft: "0.5rem",
                fontSize: "0.875rem",
                color: "#9ca3af",
                textDecoration: "line-through",
              }}
            >
              {book.price.toLocaleString()}₫
            </span>
          </>
        ) : (
          <span
            style={{
              fontSize: "1.125rem",
              fontWeight: "bold",
              color: "#1f2937",
            }}
          >
            {book.price.toLocaleString()}₫
          </span>
        )}
      </div>
    </Link>
  );
};

export default BookCard;
