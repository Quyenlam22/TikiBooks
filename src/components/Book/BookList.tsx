import { useContext } from "react";
import type { Book } from '../../../type/Book';
import BookCard from "./BookCard";
import { AppContext } from "../../context/AppProvider";

function BookList() {
  const {dataBook} = useContext(AppContext);

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