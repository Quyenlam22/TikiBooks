// src/App.tsx
import React from "react";
import "./App.css"; // Nếu cần style toàn bộ ứng dụng

import ProductPage from "./pages/ProductPage";

const App = () => {
  return (
    <div className="App">
      <ProductPage />
    </div>
  );
};

export default App;
