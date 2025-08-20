import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import CategorySearch from "./CategorySearch";
import Pagination from "./Pagination";
import CategoryModal from "./CategoryModal";
import { Category } from "./types";

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Sách Tiếng Việt",
      productCount: 2345,
      tags: ["Bán chạy", "Khuyến mãi"],
      imageUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3cbe3f73-6e02-44cf-a21e-64316d833952.png",
      highlight: true,
    },
    {
      id: 2,
      name: "Sách Kỹ Năng Làm Việc",
      productCount: 1789,
      tags: ["Mới"],
      imageUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/15dbb4b4-1d4c-4ba7-8fba-c4eec8ec646b.png",
    },
  ]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const itemsPerPage = 6;

  const filtered = categories
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "asc") return a.name.localeCompare(b.name);
      if (sort === "desc") return b.name.localeCompare(a.name);
      if (sort === "count") return b.productCount - a.productCount;
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleSave = (category: Category) => {
    if (editingCategory) {
      setCategories((prev) => prev.map((c) => (c.id === category.id ? category : c)));
    } else {
      setCategories((prev) => [...prev, category]);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa danh mục này?")) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Quản lý danh mục sách</h1>
          <button onClick={() => { setEditingCategory(null); setIsModalOpen(true); }} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <i className="fas fa-plus mr-2"></i>
            <span>Thêm danh mục</span>
          </button>
        </div>

        <CategorySearch search={search} setSearch={setSearch} sort={sort} setSort={setSort} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((category) => (
            <CategoryCard key={category.id} category={category} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

        <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} editingCategory={editingCategory} />
      </div>
    </div>
  );
};

export default CategoryManager;
