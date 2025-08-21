import type { TimeseriesPoint } from "../../../services/dashboardService";

type Props = {
  timeseries: TimeseriesPoint[];
};

const RevenueChart: React.FC<Props> = ({ timeseries }) => {

  return (
    <div className="bg-white rounded p-4 shadow">
      <div className="font-semibold mb-2">Doanh thu & số đơn (14 ngày)</div>
      <div className="text-sm text-gray-500 mb-3">Thêm thư viện biểu đồ (recharts/chart.js) để hiển thị trực quan</div>
      <div className="max-h-64 overflow-auto border rounded">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-2">Ngày</th>
              <th className="text-right p-2">Doanh thu (VND)</th>
              <th className="text-right p-2">Số đơn</th>
            </tr>
          </thead>
          <tbody>
            {timeseries.map((p) => (
              <tr key={p.date} className="border-t">
                <td className="p-2">{p.date}</td>
                <td className="p-2 text-right">{p.revenue.toLocaleString("vi-VN")}</td>
                <td className="p-2 text-right">{p.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueChart;


