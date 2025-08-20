import type { Book } from "./Book";

export interface Cart {
  book: Book;
  quantity: number;
  isSelected: boolean;
};