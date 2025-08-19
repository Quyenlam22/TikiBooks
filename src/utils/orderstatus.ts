import type { OrderStatus } from '../../type/order';


export const getStatusFromCreatedAt = (createdAt: string): OrderStatus => {
    const created = new Date(createdAt).getTime();
    const now = Date.now();
    const diff = now - created;

    const ONE_HOUR = 60 * 60 * 1000;
    const THREE_HOURS = 3 * ONE_HOUR;
    const TWO_DAYS = 2 * 24 * ONE_HOUR;

    if (diff >= TWO_DAYS + THREE_HOURS + ONE_HOUR) return "Đã giao";
    if (diff >= THREE_HOURS + ONE_HOUR) return "Đang giao";
    if (diff >= ONE_HOUR) return "Đã xác nhận";
    return "Đang xử lý";
}