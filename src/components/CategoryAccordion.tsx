import React, { useState } from "react";
import categoriesData from "../data/categories.json";

// Định nghĩa kiểu dữ liệu cho danh mục
interface Category {
  id: number;
  name: string;
  subcategories: string[];
}

const CategoryAccordion: React.FC = () => {
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(1); // Mặc định mở danh mục "English Books"

  const toggleAccordion = (categoryId: number) => {
    setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Khám phá theo danh mục</h2>
      {categoriesData.map((category: Category) => (
        <div key={category.id} className="border-b last:border-b-0 py-2">
          <button
            onClick={() => toggleAccordion(category.id)}
            className="flex justify-between items-center w-full text-lg font-semibold text-gray-700 hover:text-blue-500"
          >
            {category.name}
            <span>{openCategoryId === category.id ? "▲" : "▼"}</span>
          </button>
          {openCategoryId === category.id &&
            category.subcategories.length > 0 && (
              <ul className="pl-4 pt-2 space-y-1 text-sm text-gray-600">
                {category.subcategories.map((sub, index) => (
                  <li
                    key={index}
                    className="hover:text-blue-500 cursor-pointer"
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            )}
        </div>
      ))}
    </div>
  );
};

export default CategoryAccordion;
