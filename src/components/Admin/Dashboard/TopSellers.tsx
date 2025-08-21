import React from "react";
import type { TopSellerItem } from "../../../services/dashboardService";

type Props = {
  items: TopSellerItem[];
};

const TopSellers: React.FC<Props> = ({ items }) => {
  return (
    <div className="bg-white rounded p-4 shadow">
      <div className="font-semibold mb-2">Sản phẩm bán chạy</div>
      <div className="max-h-72 overflow-auto border rounded">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-2">Sách</th>
              <th className="text-right p-2">SL</th>
              <th className="text-right p-2">Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.bookId} className="border-t">
                <td className="p-2">{i.title}</td>
                <td className="p-2 text-right">{i.quantity}</td>
                <td className="p-2 text-right">{i.revenue.toLocaleString("vi-VN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellers;


