import React, { useState, useEffect } from "react";
import type { Category } from "./types";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Category) => void;
  editingCategory: Category | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, onSave, editingCategory }) => {
  const [name, setName] = useState("");
  const [productCount, setProductCount] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
      setProductCount(editingCategory.productCount);
      setImageUrl(editingCategory.imageUrl);
    } else {
      setName("");
      setProductCount(0);
      setImageUrl("");
    }
  }, [editingCategory]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const newCategory: Category = {
      id: editingCategory ? editingCategory.id : Date.now(),
      name,
      productCount,
      tags: [],
      imageUrl,
    };
    onSave(newCategory);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{editingCategory ? "Sửa danh mục" : "Thêm danh mục"}</h2>
        <div className="space-y-3">
          <input type="text" placeholder="Tên danh mục" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
          <input type="number" placeholder="Số lượng sản phẩm" value={productCount} onChange={(e) => setProductCount(Number(e.target.value))} className="w-full border px-3 py-2 rounded" />
          <input type="text" placeholder="URL hình ảnh" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Hủy</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
