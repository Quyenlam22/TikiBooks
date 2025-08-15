// src/components/Admin/CategoryManagement.tsx
import React, { useEffect, useState } from 'react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../services/categoryService';

const CategoryManagement: React.FC = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };
        loadCategories();
    }, []);

    const handleCreateCategory = async () => {
        if (newCategory) {
            await createCategory(newCategory);
            setNewCategory('');
            // Reload categories
            const data = await fetchCategories();
            setCategories(data);
        }
    };

    const handleDeleteCategory = async (id) => {
        await deleteCategory(id);
        // Reload categories
        const data = await fetchCategories();
        setCategories(data);
    };

    return (
        <div>
            <h1>Quản lý danh mục</h1>
            <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Thêm danh mục mới"
            />
            <button onClick={handleCreateCategory}>Thêm</button>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.name}
                        <button onClick={() => handleDeleteCategory(category.id)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryManagement;
