import { useEffect, useState } from "react";
import type { Book } from '../../../type/Book';
import { getAllBooks } from "../../services/bookService";
import BookCard from "./BookCard";

function BookList() {
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
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dataBook.length > 0 && (
          dataBook.map((book: Book) => (
            <BookCard key={book.current_seller?.product_id} book={book} />
          ))
        )}
      </div>


    </>
  )
}

export default BookList;