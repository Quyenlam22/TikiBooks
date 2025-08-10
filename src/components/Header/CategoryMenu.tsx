const categories = [
    "điện gia dụng", "xe cộ", "mẹ & bé", "khỏe đẹp", "nhà cửa",
    "sách", "thể thao", "harry potter", "lịch treo tường 2024", "nguyễn nhật ánh"
];

const CategotyMenu = () => {
    return (
        <div className="flex items-center text-sm bg-white">
            {categories.map((cat, index) => (
                <span key={index} className="cursor-pointer text-zinc-500 hover:text-blue-500 pr-3 pt-2">
                    {cat}
                </span>
            ))}
        </div>
    );
};

export default CategotyMenu;