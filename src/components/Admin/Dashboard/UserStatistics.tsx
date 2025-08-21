import type { UserStatistics } from "../../../services/dashboardService";

type Props = {
  userStats: UserStatistics;
};

const UserStatistics: React.FC<Props> = ({ userStats }) => {
  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);

  const formatNumber = (value: number): string => value.toLocaleString("vi-VN");


  return (
    <div className="bg-white rounded p-4 shadow">
      <h3 className="font-semibold text-lg mb-4">Thống kê người dùng</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded p-3 text-center">
          <div className="text-2xl font-bold text-blue-600">{formatNumber(userStats.totalUsers)}</div>
          <div className="text-sm text-blue-700">Tổng người dùng</div>
        </div>
        <div className="bg-green-50 rounded p-3 text-center">
          <div className="text-2xl font-bold text-green-600">{formatCurrency(userStats.avgRevenuePerUser)}</div>
          <div className="text-sm text-green-700">Doanh thu TB/khách</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-purple-50 rounded p-3 text-center">
          <div className="text-2xl font-bold text-purple-600">{formatNumber(userStats.newUsersThisMonth)}</div>
          <div className="text-sm text-purple-700">Khách mới tháng này</div>
        </div>
        <div className="bg-orange-50 rounded p-3 text-center">
          <div className="text-2xl font-bold text-orange-600">{formatNumber(userStats.activeUsers)}</div>
          <div className="text-sm text-orange-700">Khách hàng tích cực</div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-4">Top 5 khách hàng chi tiêu cao nhất</h4>
        <div className="space-y-4">
          {userStats.topSpenders.map((user, index) => (
            <div key={user.userId} className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-400' : 
                  index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.orders} đơn hàng</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg text-green-600">
                  {formatCurrency(user.totalSpent)}
                </div>
                <div className="text-xs text-gray-500">
                  {((user.totalSpent / userStats.avgRevenuePerUser) * 100).toFixed(0)}% TB
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Chỉ số tăng trưởng</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded p-3">
            <div className="text-sm text-blue-600 mb-1">Tỷ lệ khách mới</div>
            <div className="text-lg font-semibold text-blue-800">
              {((userStats.newUsersThisMonth / userStats.totalUsers) * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-blue-600">
              {userStats.newUsersThisMonth} / {userStats.totalUsers}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded p-3">
            <div className="text-sm text-green-600 mb-1">Tỷ lệ khách tích cực</div>
            <div className="text-lg font-semibold text-green-800">
              {((userStats.activeUsers / userStats.totalUsers) * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-green-600">
              {userStats.activeUsers} / {userStats.totalUsers}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;
