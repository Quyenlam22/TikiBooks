import React from "react";
import type { Category } from "./types";

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit, onDelete }) => {
  return (
    <div
      className={`category-card bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${category.highlight ? "highlight-card" : ""}`}
    >
      <div className="p-4 flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg mb-1">{category.name}</h3>
          <p className="text-gray-500 mb-2">{category.productCount.toLocaleString()} sản phẩm</p>
          <div className="flex gap-1 flex-wrap">
            {category.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <img src={category.imageUrl} alt={category.name} className="category-image rounded-lg w-16 h-16 object-cover" />
      </div>
      <div className="border-t border-gray-200 p-3 bg-gray-50 flex justify-end gap-2">
        <button className="text-blue-500 hover:text-blue-700 p-1" onClick={() => onEdit(category)}>
          <i className="fas fa-edit"></i>
        </button>
        <button className="text-red-500 hover:text-red-700 p-1" onClick={() => onDelete(category.id)}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
