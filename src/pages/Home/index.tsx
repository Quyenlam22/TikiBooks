import { useEffect, useState } from "react";
import { getAllBooks } from "../../services/bookService";

import TopSellingSection from "../../components/top-seller";
import type { Book } from "../../../type/Book";
import BookList from "../../components/Book/BookList";
import FilterBook from "../../components/Book/FilterBook";

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

      <div className="pl-4 mb-12 flex gap-8">
        <FilterBook />
      </div>
      
      <TopSellingSection />
    </>
  )
}

export default Home;