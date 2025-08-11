import { useMemo } from "react";
import BookCard from "./BookCard";
import type { Book } from '../../../type/Book';

type Props = {
  dataBook: Book[];
  searchTerm: string;
};

const BookSearchList = ({ dataBook, searchTerm }: Props) => {
  const filteredBooks = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return dataBook;
    return dataBook.filter((book) => {
      const name = book.name?.toLowerCase() || "";
      const shortDesc = book.short_description?.toLowerCase() || "";
      const longDesc = book.description?.toLowerCase() || "";
      return (
        name.includes(q) ||
        shortDesc.includes(q) ||
        longDesc.includes(q)
      );
    });
  }, [dataBook, searchTerm]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredBooks.length > 0 ? (
        filteredBooks.map((book) => (
          <BookCard key={book.current_seller?.product_id} book={book} />
        ))
      ) : (
        <div className="col-span-full text-gray-500">Không tìm thấy kết quả phù hợp.</div>
      )}
    </div>
  );
};

export default BookSearchList;
