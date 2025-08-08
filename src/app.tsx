import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <Link
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            color: "white",
            textDecoration: "none",
          }}
        >
          Website Bán Sách
        </Link>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
