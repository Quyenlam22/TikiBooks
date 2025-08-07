import type { Book } from "../../../type/Book-carousel";
import BookSlider from "./BookSlider";
import CategoryList from "./CategoryList";

const books1: Book[] = [
  { id: 1, title: "Cây cam ngọt của tôi", image: "https://salt.tikicdn.com/ts/product/5e/18/24/2a6154ba08df6ce6161c13f4303fa19e.jpg", discount: 32 },
  { id: 2, title: "Rèn luyện tư duy phản biện", image: "https://salt.tikicdn.com/ts/product/22/cb/a9/524a27dcd45e8a13ae6eecb3dfacba7c.jpg", discount: 32 },
  { id: 3, title: "Nếu biết trăm năm là hữu hạn", image: "https://salt.tikicdn.com/ts/product/ef/6c/b1/e14d862b8a24c546dce69c71582089de.jpg", discount: 37 },
];

const books2: Book[] = [
  { id: 4, title: "Thiên Hoàng Minh Trị", image: "https://salt.tikicdn.com/ts/product/b5/42/19/4e614bc580b3de9c8b0aca634a22f705.jpg", discount: 50 },
  { id: 5, title: "Tội ác và hình phạt", image: "https://salt.tikicdn.com/ts/product/70/53/c2/5e40f93acf2e35a55c262e277457197f.jpeg", discount: 25 },
  { id: 6, title: "13 nguyên tắc nghĩ giàu, làm giàu", image: "https://salt.tikicdn.com/ts/product/0b/cd/50/9c219e191737b2757911b962eeb54c2c.jpg", discount: 32 },
];

const Carousel = () => {
  return (
    <div className="p-6 bg-gray-50 rounded">
      <h2 className="text-xl font-bold mb-4">Nhà Sách Tiki</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <BookSlider title="Top Sách Bán Chạy" sponsor="1980 Books Tại Tiki Trading" rating={5} books={books1} />
        <BookSlider title="Bộ Sưu Tập Sách Mới Giảm Đến" sponsor="1980 Books Tại Tiki Trading" rating={5} books={books2} />
      </div>

      <h3 className="mt-8 mb-2 text-lg font-semibold">Khám phá theo danh mục</h3>
      <CategoryList />
    </div>
  );
};

export default Carousel;