import type { Book } from "./Book";

export interface Category {
  id: number;
  name: string;
  is_leaf: boolean;
  books: Book[];
}