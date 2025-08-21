import { useEffect, useState } from "react";
import { fetchDashboardSummary, type DashboardResponse } from "../../../services/dashboardService";
import KpiCards from "../../../components/Admin/Dashboard/KpiCards";
import RevenueChart from "../../../components/Admin/Dashboard/RevenueChart";
import OrdersStatus from "../../../components/Admin/Dashboard/OrdersStatus";
import TopSellers from "../../../components/Admin/Dashboard/TopSellers";
import LowStock from "../../../components/Admin/Dashboard/LowStock";

function DashBoard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const summary = await fetchDashboardSummary();
        setData(summary);
      } catch {
        setError("Không tải được dữ liệu dashboard");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  if (loading) return <div className="p-4">Đang tải...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!data) return null;

  return (
    <div className="space-y-4">
      <KpiCards kpis={data.kpis} />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <RevenueChart timeseries={data.timeseries} />
        </div>
        <div className="col-span-4">
          <OrdersStatus status={data.ordersStatus} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <TopSellers items={data.topSellers} />
        </div>
        <div className="col-span-5">
          <LowStock items={data.lowStock} />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;