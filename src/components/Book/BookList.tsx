import type { Book } from '../../../type/Book';
import BookCard from "./BookCard";
import { useState } from 'react';
import PaginationPage from '../PaginationPage';

type BookListProps = {
  dataBook: Book[];
}

function BookList(props: BookListProps) {
  const {dataBook} = props;

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentBooks = dataBook.slice(startIndex, endIndex);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-2">
        {currentBooks.length > 0 && (
          currentBooks.map((book: Book) => (
            <BookCard key={book.id} book={book} />
          ))
        )}
      </div>
        <PaginationPage 
          dataBook={dataBook}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage} 
        />
    </>
  )
}

export default BookList;