import React from "react";
import type { LowStockItem } from "../../../services/dashboardService";

type Props = {
  items: LowStockItem[];
};

const LowStock: React.FC<Props> = ({ items }) => {
  return (
    <div className="bg-white rounded p-4 shadow">
      <div className="font-semibold mb-2">Tồn kho thấp</div>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.bookId} className="flex items-center justify-between p-2 rounded bg-orange-50">
            <span>{i.title}</span>
            <span className="font-semibold">{i.stock}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LowStock;


