import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Bookrelated from "../../components/Bookdetail/related_topdeals";
import type { Book } from "../../type/Book";
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [id]);

  return (
    <>
      <div className="w-full px-3 md:px-4 lg:px-6 mt-4 md:mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
          <div className="lg:col-span-4">
            <div className="rounded-xl flex flex-col items-center lg:items-start gap-4 lg:sticky lg:top-4">
              <BookImageSlider
                key={id}
                images={book ? [
                  book.images[0].base_url,
                  book.images[0].small_url,
                ] : []}
              />
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            {book && <BookInfo book={book} />}
            {book && <Bookrelated book={book} />}
          </div>

          <div className="lg:col-span-3 w-full">
            <div className="lg:sticky lg:top-4">
              {book && <BookPurchase book={book} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailBook;
