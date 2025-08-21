import instance from "./api.service";
import { getAllBooks } from "./bookService";
import type { Book } from "../type/Book";
import type { OrderStatus } from "../type/order";

export interface OrderStatistics {
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
  ordersByDay: { date: string; orders: number }[];
  statusBreakdown: Record<OrderStatus, number>;
}

export interface BookStatistics {
  totalBooks: number;
  totalSold: number;
  avgRating: number;
  topRatedBooks: { bookId: string; title: string; rating: number; reviews: number }[];
  categoryBreakdown: { category: string; count: number }[];
}

export interface UserStatistics {
  totalUsers: number;
  avgRevenuePerUser: number;
  topSpenders: { userId: number; name: string; totalSpent: number; orders: number }[];
  newUsersThisMonth: number;
  activeUsers: number;
}

export interface DashboardResponse {
  orderStats: OrderStatistics;
  bookStats: BookStatistics;
  userStats: UserStatistics;
}

async function generateMockDataFromBooks(): Promise<DashboardResponse> {
  try {
    const books: Book[] = await getAllBooks();
    
    const totalBooks = books.length;
    const avgRating = books.reduce((sum, book) => sum + (book.rating_average || 0), 0) / totalBooks;
    
    const categoryMap = new Map<string, number>();
    books.forEach(book => {
      const categoryName = book.categories?.name || 'Unknown';
      const count = categoryMap.get(categoryName) || 0;
      categoryMap.set(categoryName, count + 1);
    });
    
    const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, count]) => ({
      category,
      count
    }));

    const totalSold = books.reduce((sum, book) => sum + (book.quantity_sold?.value || Math.floor(Math.random() * 100) + 20), 0);
    const totalRevenue = books.reduce((sum, book) => sum + ((book.current_seller?.price || book.list_price || 0) * (book.quantity_sold?.value || Math.floor(Math.random() * 50) + 10)), 0);
    
    const totalOrders = Math.floor(totalSold / 2) + 100;
    const avgOrderValue = totalRevenue / totalOrders;

    const ordersByDay = Array.from({ length: 7 }).map((_, idx) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - idx));
      return {
        date: d.toISOString().slice(0, 10),
        orders: 15 + Math.floor(Math.random() * 25)
      };
    });

    return {
      orderStats: {
        totalOrders,
        totalRevenue,
        avgOrderValue: Math.round(avgOrderValue),
        ordersByDay,
        statusBreakdown: {
          'Đang xử lý': 23,
          'Đã xác nhận': 58,
          'Đang giao': 31,
          'Đã giao': Math.floor(totalOrders * 0.7),
          'Đã hủy': 12,
        },
      },
      bookStats: {
        totalBooks,
        totalSold,
        avgRating: Math.round(avgRating * 10) / 10,
        topRatedBooks: books
          .sort((a, b) => (b.rating_average || 0) - (a.rating_average || 0))
          .slice(0, 5)
          .map(book => ({
            bookId: book.id,
            title: book.name,
            rating: book.rating_average || 0,
            reviews: Math.floor(Math.random() * 200) + 50
          })),
        categoryBreakdown,
      },
      userStats: {
        totalUsers: 2847,
        avgRevenuePerUser: Math.round(totalRevenue / 2847),
        topSpenders: [
          { userId: 1, name: "Nguyễn Văn A", totalSpent: 2500000, orders: 18 },
          { userId: 2, name: "Trần Thị B", totalSpent: 2100000, orders: 15 },
          { userId: 3, name: "Lê Văn C", totalSpent: 1800000, orders: 12 },
          { userId: 4, name: "Phạm Thị D", totalSpent: 1650000, orders: 11 },
          { userId: 5, name: "Hoàng Văn E", totalSpent: 1420000, orders: 9 },
        ],
        newUsersThisMonth: 156,
        activeUsers: 1247,
      },
    };
  } catch {
    return {
      orderStats: {
        totalOrders: 0,
        totalRevenue: 0,
        avgOrderValue: 0,
        ordersByDay: Array.from({ length: 7 }).map((_, idx) => {
          const d = new Date();
          d.setDate(d.getDate() - (6 - idx));
          return {
            date: d.toISOString().slice(0, 10),
            orders: 0
          };
        }),
        statusBreakdown: {
          'Đang xử lý': 0,
          'Đã xác nhận': 0,
          'Đang giao': 0,
          'Đã giao': 0,
          'Đã hủy': 0,
        },
      },
      bookStats: {
        totalBooks: 0,
        totalSold: 0,
        avgRating: 0,
        topRatedBooks: [],
        categoryBreakdown: [],
      },
      userStats: {
        totalUsers: 0,
        avgRevenuePerUser: 0,
        topSpenders: [],
        newUsersThisMonth: 0,
        activeUsers: 0,
      },
    };
  }
}

export async function fetchDashboardSummary(params: { from?: string; to?: string } = {}): Promise<DashboardResponse> {
  try {
    const response = await instance.get<DashboardResponse>("/admin/dashboard", { params });
    return response.data;
  } catch {
    return await generateMockDataFromBooks();
  }
}


