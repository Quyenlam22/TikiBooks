import instance from './api.service';
import type { Order } from '../type/order';

export const createOrder = async (data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error("Chưa đăng nhập");

    const response = await instance.post('/orders', data, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.data as Order;
};
export const getOrderById = async (id: number): Promise<Order> => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Chưa đăng nhập hoặc không có accessToken');

    const response = await instance.get(`orders/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
export const getAllorders = async (): Promise<Order[]> => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Chưa đăng nhập hoặc không có accessToken');
    const response = await instance.get('/orders', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data as Order[];
}
export const deleteOrder = async (id: number): Promise<void> => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Chưa đăng nhập hoặc không có accessToken');

    await instance.delete(`/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}
export const updateOrder = async (id: number, data: Partial<Order>) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        throw new Error("Chưa đăng nhập hoặc không có accessToken");
    }

    const response = await instance.patch(`orders/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};