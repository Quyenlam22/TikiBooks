import { useEffect, useState } from "react";
import { fetchDashboardSummary, type DashboardResponse } from "../../../services/dashboardService";
import OrderStatistics from "../../../components/Admin/Dashboard/OrderStatistics";
import BookStatistics from "../../../components/Admin/Dashboard/BookStatistics";
import UserStatistics from "../../../components/Admin/Dashboard/UserStatistics";

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
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <OrderStatistics orderStats={data.orderStats} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <BookStatistics bookStats={data.bookStats} />
        </div>
        <div className="col-span-6">
          <UserStatistics userStats={data.userStats} />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;