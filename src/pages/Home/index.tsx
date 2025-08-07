import { useEffect, useState } from "react";
import { getAllBooks } from "../../services/bookService";
import BookCard from "../../components/Book/BookCard";

const sampleBook = {
  name: "Lược Sử Loài Người",
  authors: [{ name: "Yuval Noah Harari" }],
  current_seller: {
    price: 89000,
  },
  rating_average: 4.5,
  quantity_sold: {
    text: "Đã bán 1.2k",
  },
  images: [
    {
      thumbnail_url: "https://salt.tikicdn.com/cache/280x280/ts/product/79/d1/d4/8888e28a70fd8f2a5d3d849fd29a3d8f.jpg",
    },
  ],
  list_price: 150000,
  description: "Một cuốn sách lịch sử nhân loại dễ hiểu và sâu sắc.",
};

import TopSellingSection from "../../components/top-seller";

function Home() {
  const [dataBook, setDataBook] = useState([]);


  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllBooks();
      console.log(response);
    }

    fetchApi();
  }, []);

  return (
    <>
      <div>home</div>

      <div className="p-4 max-w-sm">
        <BookCard book={sampleBook} isAd />
      </div>
      
      <TopSellingSection />
    </>
  )
}

export default Home;