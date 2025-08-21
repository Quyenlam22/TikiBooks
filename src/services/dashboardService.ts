import instance from "./api.service";

export interface DashboardKpis {
  revenue: number;
  orders: number;
  avgOrderValue: number;
  conversionRate: number;
}

export interface OrdersStatusCounts {
  pending: number;
  processing: number;
  shipping: number;
  delivered: number;
  cancelled: number;
}

export interface TimeseriesPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopSellerItem {
  bookId: string;
  title: string;
  quantity: number;
  revenue: number;
}

export interface LowStockItem {
  bookId: string;
  title: string;
  stock: number;
}

export interface DashboardResponse {
  kpis: DashboardKpis;
  timeseries: TimeseriesPoint[];
  ordersStatus: OrdersStatusCounts;
  topSellers: TopSellerItem[];
  lowStock: LowStockItem[];
}

export async function fetchDashboardSummary(params: { from?: string; to?: string } = {}): Promise<DashboardResponse> {
  try {
    const response = await instance.get<DashboardResponse>("/admin/dashboard", { params });
    return response.data;
  } catch {
    const mock: DashboardResponse = {
      kpis: {
        revenue: 125000000,
        orders: 842,
        avgOrderValue: 148400,
        conversionRate: 0.032,
      },
      timeseries: Array.from({ length: 14 }).map((_, idx) => {
        const d = new Date();
        d.setDate(d.getDate() - (13 - idx));
        return {
          date: d.toISOString().slice(0, 10),
          revenue: 7_000_000 + Math.floor(Math.random() * 6_000_000),
          orders: 40 + Math.floor(Math.random() * 40),
        };
      }),
      ordersStatus: {
        pending: 23,
        processing: 58,
        shipping: 31,
        delivered: 612,
        cancelled: 12,
      },
      topSellers: [
        { bookId: "b1", title: "Clean Code", quantity: 124, revenue: 37200000 },
        { bookId: "b2", title: "The Pragmatic Programmer", quantity: 96, revenue: 28800000 },
        { bookId: "b3", title: "Refactoring", quantity: 74, revenue: 25900000 },
      ],
      lowStock: [
        { bookId: "b9", title: "Domain-Driven Design", stock: 5 },
        { bookId: "b8", title: "Designing Data-Intensive Apps", stock: 8 },
        { bookId: "b7", title: "You Don't Know JS", stock: 12 },
      ],
    };
    return mock;
  }
}


