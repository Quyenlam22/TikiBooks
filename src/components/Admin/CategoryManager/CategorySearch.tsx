import React from "react";

interface CategorySearchProps {
  search: string;
  setSearch: (val: string) => void;
  sort: string;
  setSort: (val: string) => void;
}

const CategorySearch: React.FC<CategorySearchProps> = ({ search, setSearch, sort, setSort }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Tìm kiếm danh mục..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
      </div>
      <div className="flex gap-2">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sắp xếp theo</option>
          <option value="asc">Tên (A-Z)</option>
          <option value="desc">Tên (Z-A)</option>
          <option value="count">Số lượng sản phẩm</option>
        </select>
      </div>
    </div>
  );
};

export default CategorySearch;
