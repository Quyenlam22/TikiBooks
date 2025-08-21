import type { DashboardKpis } from "../../../services/dashboardService";

type Props = {
  kpis: DashboardKpis;
};

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);

const formatPercent = (value: number): string => `${(value * 100).toFixed(1)}%`;

const KpiCards: React.FC<Props> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3 bg-white rounded p-4 shadow">
        <div className="text-gray-500">Doanh thu</div>
        <div className="text-2xl font-semibold">{formatCurrency(kpis.revenue)}</div>
      </div>
      <div className="col-span-3 bg-white rounded p-4 shadow">
        <div className="text-gray-500">Số đơn</div>
        <div className="text-2xl font-semibold">{kpis.orders}</div>
      </div>
      <div className="col-span-3 bg-white rounded p-4 shadow">
        <div className="text-gray-500">AOV</div>
        <div className="text-2xl font-semibold">{formatCurrency(kpis.avgOrderValue)}</div>
      </div>
      <div className="col-span-3 bg-white rounded p-4 shadow">
        <div className="text-gray-500">Conversion</div>
        <div className="text-2xl font-semibold">{formatPercent(kpis.conversionRate)}</div>
      </div>
    </div>
  );
};

export default KpiCards;


