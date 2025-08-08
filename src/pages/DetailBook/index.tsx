import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Bookrelated from "../../components/Bookdetail/related_topdeals";
import type { Book } from "../../../type/Book";
import { getBookById } from "../../services/bookService";

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
      <div className="text-xl font-semibold mb-4 text-center">
        Chi tiết sách - ID: {id}
      </div>

      <div className="flex justify-center w-full mt-6">
        {/* Chỉ render Bookrelated nếu đã có dữ liệu book */}
        {book && <Bookrelated book={book} />}
      </div>
    </>
  );
}

export default DetailBook;
