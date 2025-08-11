import type { Book } from "../../type/Book";
import instance from "./api.service"

export const getAllBooks = async () => {
  
    const response = await instance.get("books");
    return response.data;
  }


export const getBookById = async (id: string): Promise<Book> => {
  const response = await instance.get(`books/${id}`);
  return response.data;
}


export const getRelatedBooks = async (book: Book): Promise<Book[]> => {
  const allBooks: Book[] = await getAllBooks();
  return allBooks.filter((item) =>
    item.name !== book.name &&
    (item.authors?.[0]?.name === book.authors?.[0]?.name ||
      item.categories?.name === book.categories?.name)
  ).slice(0, 16);
};