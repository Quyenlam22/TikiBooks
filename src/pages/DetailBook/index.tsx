import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Bookrelated from "../../components/Bookdetail/related_topdeals";
import type { Book } from "../../../type/Book";
import { getBookById } from "../../services/bookService";
import BookImageSlider from "../../components/Book/BookImageSlider";
import BookPurchase from "../../components/Book/BookPurchase";
import BookInfo from "../../components/Bookdetail/BookInfo";

function DetailBook() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;

      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (error) {
        console.error("Failed to fetch book:", error);
      }
    };

    fetchBook();
  }, [id]);  

  return (
    <>
      <div className="flex justify-center w-full gap-6 mt-6 items-start">
        <div className="rounded-xl pl-4 flex flex-col gap-4">
          <BookImageSlider
            key={id}
            images={book ? [
              book.images[0].base_url,
              book.images[0].small_url,
            ] : []}
          />
          
        </div>

        <div>
          {book && <BookInfo book={book} />}
          {book && <Bookrelated book={book} />}
        </div>
        
        <BookPurchase price={book ? book.current_seller.price : 0} />
      </div>
    </>
  );
}

export default DetailBook;
