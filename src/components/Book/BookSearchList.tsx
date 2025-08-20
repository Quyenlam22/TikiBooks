import { useMemo, useState } from "react";
import BookCard from "./BookCard";
import type { Book } from '../../type/Book';
import PaginationPage from "../PaginationPage";
import { removeVietnameseTones } from "../../utils/removeVietnameseTones";

type Props = {
  dataBook: Book[];
  searchTerm: string;
};

const BookSearchList = ({ dataBook, searchTerm }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const filteredBooks = useMemo(() => {
    const q = removeVietnameseTones(searchTerm.trim().toLowerCase());
    if (!q) return dataBook;

    return dataBook.filter((book) => {
      const name = removeVietnameseTones(book.name?.toLowerCase() || "");
      const shortDesc = removeVietnameseTones(book.short_description?.toLowerCase() || "");
      const longDesc = removeVietnameseTones(book.description?.toLowerCase() || "");

      return (
        name.includes(q) ||
        shortDesc.includes(q) ||
        longDesc.includes(q)
      );
    });
  }, [dataBook, searchTerm]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-2">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <BookCard key={book.current_seller?.product_id || book.id} book={book} />
          ))
        ) : (
          <div className="col-span-full text-gray-500">
            Không tìm thấy kết quả phù hợp.
          </div>
        )}
      </div>

      {filteredBooks.length > pageSize && (
        <PaginationPage
          dataBook={filteredBooks}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default BookSearchList;
