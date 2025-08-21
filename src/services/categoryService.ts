import type { Category } from "../type/Category";
import instance from "./api.service";

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await instance.get("categories");
  return response.data;
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const response = await instance.get(`categories/${id}`);
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Chưa đăng nhập hoặc không có accessToken");
  }

  const response = await instance.delete(`categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateCategory = async (
  id: number,
  data: Partial<Category>
) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Chưa đăng nhập hoặc không có accessToken");
  }

  const response = await instance.patch(`categories/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createCategory = async (data: Partial<Category>) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Chưa đăng nhập hoặc không có accessToken");
  }

  const response = await instance.post("categories", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
