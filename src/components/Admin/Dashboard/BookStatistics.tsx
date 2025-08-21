import type { BookStatistics } from "../../../services/dashboardService";

type Props = {
  bookStats: BookStatistics;
};

const BookStatistics: React.FC<Props> = ({ bookStats }) => {
  const formatNumber = (value: number): string => value.toLocaleString("vi-VN");

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
        <span className="text-yellow-400">★</span>
      </div>
    );
  };

  const chartWidth = 250;
  const chartHeight = 300;
  const radius = 80;
  const cx = chartWidth / 2;
  const cy = chartHeight / 2;

  const totalBooks = bookStats.categoryBreakdown.reduce((sum, cat) => sum + cat.count, 0);
  let currentAngle = -90;

  const categoryColors = [
    "#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6",
    "#06b6d4", "#84cc16", "#f97316", "#ec4899", "#6366f1"
  ];

  return (
    <div className="bg-white rounded p-4 shadow">
      <h3 className="font-semibold text-lg mb-5">Thống kê sách</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-indigo-50 rounded p-3 text-center">
          <div className="text-2xl font-bold text-indigo-600">{formatNumber(bookStats.totalBooks)}</div>
          <div className="text-sm text-indigo-700">Tổng số sách</div>
        </div>
        <div className="bg-emerald-50 rounded p-3 text-center">
          <div className="text-2xl font-bold text-emerald-600">{formatNumber(bookStats.totalSold)}</div>
          <div className="text-sm text-emerald-700">Sách đã bán</div>
        </div>
        <div className="bg-amber-50 rounded p-3 text-center">
          <div className="text-2xl font-bold text-amber-600">{bookStats.avgRating.toFixed(1)}</div>
          <div className="text-sm text-amber-700">Đánh giá TB</div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-4">Sách đánh giá cao nhất</h4>
        <div className="space-y-3">
          {bookStats.topRatedBooks.map((book, index) => (
            <div key={book.bookId} className="flex items-center justify-between p-2 bg-gray-100 rounded">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 w-6">#{index + 1}</span>
                <span className="text-sm max-w-80" title={book.title}>{book.title}</span>
              </div>
              <div className="flex items-center gap-2">
                {renderRating(book.rating)}
                <span className="text-sm text-gray-600">({book.reviews})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

             <div>
         <h4 className="font-medium mb-3">Phân bổ theo danh mục</h4>
         <div className="flex items-center gap-6">
           <svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
             {bookStats.categoryBreakdown.map((category, index) => {
               const percentage = (category.count / totalBooks) * 100;
               const angle = (percentage / 100) * 360;
               const startAngle = currentAngle;
               const endAngle = currentAngle + angle;
               
               const x1 = cx + radius * Math.cos((startAngle * Math.PI) / 180);
               const y1 = cy + radius * Math.sin((startAngle * Math.PI) / 180);
               const x2 = cx + radius * Math.cos((endAngle * Math.PI) / 180);
               const y2 = cy + radius * Math.sin((endAngle * Math.PI) / 180);
               
               const largeArcFlag = angle > 180 ? 1 : 0;
               
               const pathData = [
                 `M ${cx} ${cy}`,
                 `L ${x1} ${y1}`,
                 `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                 'Z'
               ].join(' ');

               currentAngle += angle;

               return (
                 <path
                   key={category.category}
                   d={pathData}
                   fill={categoryColors[index % categoryColors.length]}
                   stroke="white"
                   strokeWidth="2"
                 />
               );
             })}
           </svg>
           
           <div className="space-y-4">
             {bookStats.categoryBreakdown.map((category, index) => {
               const percentage = ((category.count / totalBooks) * 100).toFixed(1);
               return (
                 <div key={category.category} className="flex items-center gap-3">
                   <div
                     className="w-3 h-3 rounded-full"
                     style={{ backgroundColor: categoryColors[index % categoryColors.length] }}
                   />
                   <span className="text-sm w-38" title={category.category}>
                     {category.category.length > 20 ? category.category.slice(0, 20) + '...' : category.category}
                   </span>
                   <span className="text-sm font-medium w-16 text-right">
                     {category.count} ({percentage}%)
                   </span>
                 </div>
               );
             })}
           </div>
         </div>
       </div>
    </div>
  );
};

export default BookStatistics;
