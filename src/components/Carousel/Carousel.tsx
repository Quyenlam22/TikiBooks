import type { Book } from "../../../type/Book-carousel";
import BookSlider from "./BookSlider";
import CategoryList from "./CategoryList";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

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

const books3: Book[] = [
  { id: 7, title: "Rừng Nauy", image: "https://salt.tikicdn.com/ts/product/c9/e4/18/a9cfc425fa590c453f20307229804bb3.jpg", discount: 20 },
  { id: 8, title: "Nhà Giả Kim", image: "https://salt.tikicdn.com/ts/product/45/3b/fc/aa81d0a534b45706ae1eee1e344e80d9.jpg", discount: 15 },
  { id: 9, title: "Những Đêm Không Ngủ, Những Ngày Chậm Trôi", image: "https://salt.tikicdn.com/cache/w1200/ts/product/a8/e9/36/94bb68f3b55bb93a593fec97c087915f.jpg", discount: 25 },
];

const books4: Book[] = [
  { id: 10, title: "Anh Em Nhà Karamazov", image: "https://salt.tikicdn.com/ts/product/e5/44/50/f2f7b7f873c54fed2ee677a283f6cbcb.jpg", discount: 10 },
  { id: 11, title: "Tam Quốc Diễn Nghĩa", image: "https://salt.tikicdn.com/ts/product/86/f4/fb/2466ac14784c38242a2f123e4f472cf1.jpg", discount: 30 },
  { id: 12, title: "Cho Đi Và Nhận Lại - Nghệ Thuật Xây Dựng Mối Quan Hệ Nơi Công Sở", image: "https://salt.tikicdn.com/ts/product/a9/d4/f0/c6cddbe8bc813582cd925251e440d3e8.jpg", discount: 40 },
];

const slides = [
  { title: "Top Sách Bán Chạy", sponsor: "1980 Books Tại Tiki Trading", rating: 5, books: books1 },
  { title: "Bộ Sưu Tập Sách Mới Giảm Đến", sponsor: "1980 Books Tại Tiki Trading", rating: 5, books: books2 },
  { title: "Khuyến Mãi Tháng Này", sponsor: "1980 Books Tại Tiki Trading", rating: 5, books: books3 },
  { title: "Sách Văn Học Kinh Điển", sponsor: "1980 Books Tại Tiki Trading", rating: 5, books: books4 },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = Math.ceil(slides.length / 2); // 2 slide mỗi trang

  const prev = () => {
    setCurrentIndex((prev) => (prev - 2 < 0 ? (totalPages - 1) * 2 : prev - 2));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 2 >= slides.length ? 0 : prev + 2));
  };

  return (
    <div>
      <h2 className="text-2xl bg-white rounded-lg px-3 py-5 font-bold mb-4">Nhà Sách Tiki</h2>

      {/* Vùng chỉ chứa slider + nút */}
      <div className="relative">
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow p-2 z-10"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow p-2 z-10"
        >
          <ChevronRight size={20} />
        </button>

        <div className="grid sm:grid-cols-2 gap-4">
          {slides.slice(currentIndex, currentIndex + 2).map((slide, idx) => (
            <BookSlider key={idx} {...slide} />
          ))}
        </div>
      </div>

      {/* Indicator */}
      <div className="flex justify-center mt-2 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${i === Math.floor(currentIndex / 2) ? "bg-blue-500" : "bg-gray-300"}`}
          ></span>
        ))}
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md my-4">
        <h3 className="mt-2 mb-2 text-lg font-semibold">Khám phá theo danh mục</h3>
        <CategoryList />
      </div>
    </div>
  );
};

export default Carousel;
