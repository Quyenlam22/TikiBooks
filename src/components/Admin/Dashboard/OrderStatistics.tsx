import type { OrderStatistics } from "../../../services/dashboardService";

type Props = {
  orderStats: OrderStatistics;
};

const OrderStatistics: React.FC<Props> = ({ orderStats }) => {
  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);

  const formatNumber = (value: number): string => value.toLocaleString("vi-VN");

  const chartWidth = 300;
  const chartHeight = 150;
  const padding = { top: 15, right: 30, bottom: 25, left: 30 };

  const maxOrders = Math.max(...orderStats.ordersByDay.map(d => d.orders), 1);
  const xScale = (index: number) => padding.left + (index / (orderStats.ordersByDay.length - 1)) * (chartWidth - padding.left - padding.right);
  const yScale = (orders: number) => chartHeight - padding.bottom - (orders / maxOrders) * (chartHeight - padding.top - padding.bottom);

  return (
    <div className="bg-white rounded p-4 shadow">
      <h3 className="font-semibold text-lg mb-4">Thống kê đơn hàng</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded p-5 text-center">
          <div className="text-2xl font-bold text-blue-600">{formatNumber(orderStats.totalOrders)}</div>
          <div className="text-sm text-blue-700">Tổng đơn hàng</div>
        </div>
        <div className="bg-green-50 rounded p-5 text-center">
          <div className="text-2xl font-bold text-green-600">{formatCurrency(orderStats.totalRevenue)}</div>
          <div className="text-sm text-green-700">Tổng doanh thu</div>
        </div>
        <div className="bg-purple-50 rounded p-5 text-center">
          <div className="text-2xl font-bold text-purple-600">{formatCurrency(orderStats.avgOrderValue)}</div>
          <div className="text-sm text-purple-700">Giá trị TB/đơn</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-5">Đơn hàng theo ngày (7 ngày gần nhất)</h4>
          <svg width="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="rounded ml-5 border border-gray-200">
            {Array.from({ length: 5 }).map((_, i) => {
              const y = padding.top + (i / 4) * (chartHeight - padding.top - padding.bottom);
              return (
                <line
                  key={i}
                  x1={padding.left}
                  x2={chartWidth - padding.right}
                  y1={y}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              );
            })}

            {orderStats.ordersByDay.map((day, index) => (
              <g key={day.date}>
                <rect
                  x={xScale(index) - 12}
                  y={yScale(day.orders)}
                  width={24}
                  height={chartHeight - padding.bottom - yScale(day.orders)}
                  fill="#3b82f6"
                  opacity="0.8"
                />
                <text
                  x={xScale(index)}
                  y={chartHeight - padding.bottom + 12}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                >
                  {day.date.slice(5)}
                </text>
                <text
                  x={xScale(index)}
                  y={yScale(day.orders) - 3}
                  textAnchor="middle"
                  className="text-xs fill-gray-700 font-medium"
                >
                  {day.orders}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="ml-20">
          <h4 className="font-medium mb-5">Phân bổ trạng thái</h4>
          <div className="space-y-4 ml-5 border border-gray-200 rounded p-5 max-w-95">
            {Object.entries(orderStats.statusBreakdown).map(([status, count]) => {
              const percentage = ((count / orderStats.totalOrders) * 100).toFixed(1);
              const statusLabels: Record<string, string> = {
                "Đang xử lý": "Đang xử lý",
                "Đã xác nhận": "Đã xác nhận", 
                "Đang giao": "Đang giao",
                "Đã giao": "Đã giao",
                "Đã hủy": "Đã hủy",
              };
              const statusColors: Record<string, string> = {
                "Đang xử lý": "bg-yellow-100 text-yellow-800",
                "Đã xác nhận": "bg-blue-100 text-blue-800",
                "Đang giao": "bg-purple-100 text-purple-800", 
                "Đã giao": "bg-green-100 text-green-800",
                "Đã hủy": "bg-red-100 text-red-800",
              };

              return (
                <div key={status} className="flex items-center gap-5 p-2 rounded">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${statusColors[status]}`}></div>
                    <span className="text-sm font-medium w-20">{statusLabels[status]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${statusColors[status].split(' ')[0]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-26 text-right">
                      {count} ({percentage}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatistics;
