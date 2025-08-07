import { useEffect, useState } from "react";
import { getAllBooks } from "../../services/bookService";

import TopSellingSection from "../../components/top-seller";
import type { Book } from "../../../type/Book";
import BookList from "../../components/Book/BookList";
import Carousel from "../../components/Carousel/Carousel";

function Home() {
  const [dataBook, setDataBook] = useState<Book[]>([]);


  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllBooks();
      setDataBook(response);
    }

    fetchApi();
  }, []);

  return (
    <>
      <div>home</div>
      <Carousel />
      <div className="pl-4 mb-12 flex gap-8">
        <BookList />
      </div>
      
      <TopSellingSection />
    </>
  )
}

export default Home;