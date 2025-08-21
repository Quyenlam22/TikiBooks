import React from "react";
import type { OrdersStatusCounts } from "../../../services/dashboardService";

type Props = {
  status: OrdersStatusCounts;
};

const OrdersStatus: React.FC<Props> = ({ status }) => {
  const items = [
    { label: "Pending", value: status.pending, color: "bg-yellow-100" },
    { label: "Processing", value: status.processing, color: "bg-blue-100" },
    { label: "Shipping", value: status.shipping, color: "bg-purple-100" },
    { label: "Delivered", value: status.delivered, color: "bg-green-100" },
    { label: "Cancelled", value: status.cancelled, color: "bg-red-100" },
  ];

  return (
    <div className="bg-white rounded p-4 shadow">
      <div className="font-semibold mb-2">Trạng thái đơn hàng</div>
      <div className="space-y-2">
        {items.map((i) => (
          <div key={i.label} className={`flex items-center justify-between p-2 rounded ${i.color}`}>
            <span>{i.label}</span>
            <span className="font-semibold">{i.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersStatus;


