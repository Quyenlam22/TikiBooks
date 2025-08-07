const categories = [
  { label: "English Books", image: "https://m.media-amazon.com/images/I/81ss+hdlrzL._SL1500_.jpg" },
  { label: "Sách tiếng Việt", image: "https://tse2.mm.bing.net/th/id/OIP.lVJm21R1jx_z8DhC7TrvXQHaLc?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { label: "Văn phòng phẩm", image: "https://vanphongphamhuyenanh.com/wp-content/uploads/2020/10/cac-vat-dung-van-phong.jpg" },
  { label: "Quà lưu niệm", image: "https://ik.imagekit.io/tvlk/blog/2023/05/qua-luu-niem-singapore-10.jpg?tr=dpr-2,w-675" },
];

const CategoryList = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 mt-6">
      {categories.map((cat) => (
        <div key={cat.label} className="flex flex-col items-center">
          <img src={cat.image} alt={cat.label} className="w-20 h-20 object-cover rounded-full" />
          <span className="mt-2 text-sm font-medium">{cat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
