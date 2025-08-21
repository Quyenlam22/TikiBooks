export type ProductInOrder = {
    id: number;
    name: string;
    price: number;
    quantity?: number;
    images?: {
        base_url: string;
        [key: string]: unknown;
    }[];
};




export type OrderStatus = 'Đang xử lý' | 'Đã xác nhận' | 'Đang giao' | 'Đã giao' | 'Đã hủy';

export type Order = {
    id?: number; // Có thể có khi lấy về từ server
    userId: number;
    address: string;
    products: ProductInOrder[];
    totalPrice: number;
    fullname?: string;
    phone?: string;
    status: OrderStatus;
    createdAt?: string; // Ngày tạo đơn, nếu server trả về
    updatedAt?: string; // Ngày cập nhật, nếu có
};
