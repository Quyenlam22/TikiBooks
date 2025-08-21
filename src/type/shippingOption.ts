export type ShippingOption = {
  id: string;
  name: string;
  description?: string;
  fee: number;       // phí vận chuyển
  discount?: number; // giảm giá phí (nếu có)
  eta: string;       // thời gian dự kiến
};