// src/services/categoryService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/categories'; // Thay đổi URL nếu cần

export const fetchCategories = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createCategory = async (name) => {
    await axios.post(API_URL, { name });
};

export const updateCategory = async (id, name) => {
    await axios.put(`${API_URL}/${id}`, { name });
};

export const deleteCategory = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
