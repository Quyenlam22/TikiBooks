import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import CategoryAccordion from "./components/CategoryAccordion"; // Import component mới

export default function App() {
  return (
    <Router>
      <div className="p-4 flex">
        <div className="w-1/4 pr-4">
          <CategoryAccordion />
        </div>
        <div className="w-3/4">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/book/:id" element={<BookDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
