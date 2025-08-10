import type { Book } from '../../../type/Book';
import BookCard from "./BookCard";

type BookListProps = {
  dataBook: Book[];
}

function BookList(props: BookListProps) {
  const {dataBook} = props;

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