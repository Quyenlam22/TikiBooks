import { createContext } from "react";
import type { Book } from "../../type/Book";

export type AppContextType = {
  dataBook: Book[];
  setDataBook: React.Dispatch<React.SetStateAction<Book[]>>;
  dataBookTopSelling: Book[];
  setDataBookTopSelling: React.Dispatch<React.SetStateAction<Book[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export const AppContext = createContext<AppContextType>({
  dataBook: [],
  setDataBook: () => {},
  dataBookTopSelling: [],
  setDataBookTopSelling: () => [],
  searchTerm: "",
  setSearchTerm: () => {},
});
