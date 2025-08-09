import axios from "axios";
import type { Book } from "../../type/Book";
import { mockBooks } from "../pages/mockBooks";

const BASE_URL = import.meta.env.VITE_API_URL || "";

export const getAllBooks = async (): Promise<Book[]> => {
  try {
    if (!BASE_URL) {
      return mockBooks;
    }
    const response = await axios.get(`${BASE_URL}/books`);
    return response.data as Book[];
  } catch {
    return mockBooks;
  }
};
