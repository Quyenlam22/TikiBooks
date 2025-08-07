import instance from "./api.service"
import type { Book } from '../../type/Book';


export const getAllBooks = async () => {
  const response = await instance.get("books");
  return response.data;
}
export const getBookById = async (id: string): Promise<Book> => {
  const response = await instance.get(`books/${id}`);
  return response.data;

};
export const getTopSellingBooks = async (): Promise<Book[]> => {
  const response = await instance.get("books");
  const books: Book[] = response.data;

  // Lọc sách có quantity_sold.value hợp lệ
  const filteredBooks = books.filter(
    (book) => book.quantity_sold && book.quantity_sold.value !== undefined
  );

  // Sắp xếp giảm dần theo quantity_sold.value
  const sortedBooks = filteredBooks.sort(
    (a, b) => b.quantity_sold.value - a.quantity_sold.value
  );

  // Lấy 10 cuốn đầu tiên
  const topBooks = sortedBooks.slice(0, 10);

  return topBooks;
};
export const getRelatedBooks = async (book: Book): Promise<Book[]> => {
  const allBooks: Book[] = await getAllBooks();
  return allBooks.filter((item) =>
    item.name !== book.name &&
    (item.authors?.[0]?.name === book.authors?.[0]?.name ||
      item.categories?.name === book.categories?.name)
  ).slice(0, 16);
};


