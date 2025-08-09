import { useContext, useMemo } from "react";
import type { Book } from '../../../type/Book';
import BookCard from "./BookCard";
import { AppContext } from "../../context/AppContext";

function BookList() {
  const { dataBook, searchTerm } = useContext(AppContext);

  const filteredBooks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return dataBook;
    return dataBook.filter((book: Book) => {
      const name = book.name?.toLowerCase() || "";
      const shortDesc = book.short_description?.toLowerCase() || "";
      const longDesc = book.description?.toLowerCase() || "";
      return (
        name.includes(term) ||
        shortDesc.includes(term) ||
        longDesc.includes(term)
      );
    });
  }, [dataBook, searchTerm]);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBooks.length > 0 && (
            filteredBooks.map((book: Book) => (
              <BookCard key={book.current_seller?.product_id} book={book} />
            ))
        )}
      </div>
    </>
  )
}

export default BookList;