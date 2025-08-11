import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Book } from "../../type/Book";
import type { Category } from "../../type/Category";
import { getAllBooks } from "../services/bookService";
import { message } from "antd";

type AppContextType = {
  dataBook: Book[];
  setDataBook: React.Dispatch<React.SetStateAction<Book[]>>;
  dataBookTopSelling: Book[];
  setDataBookTopSelling: React.Dispatch<React.SetStateAction<Book[]>>;
  dataCategory: Category[];
  setDataCategory: React.Dispatch<React.SetStateAction<Category[]>>;
};

export const AppContext = createContext<AppContextType>({
  dataBook: [],
  setDataBook: () => {},
  dataBookTopSelling: [],
  setDataBookTopSelling: () => [],
  dataCategory: [],
  setDataCategory: () => {},
});

type AppProviderProps = {
  children: ReactNode;
};

function AppProvider ({children}: AppProviderProps) {
  const [dataBook, setDataBook] = useState<Book[]>([]);
  const [dataBookTopSelling, setDataBookTopSelling] = useState<Book[]>([]);
  const [dataCategory, setDataCategory] = useState<Category[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getAllBooks();
        setDataBook(response);

        if(response.length > 0) {
          const topBook = response.filter(
            (book: Book) => book.quantity_sold && book.quantity_sold.value !== undefined
          ).sort(
            (a: Book, b: Book) => b.quantity_sold.value - a.quantity_sold.value
          ).slice(0, 10);

          setDataBookTopSelling(topBook);

          let category: Category[] = [];
          response.forEach((book: Book) => {
            if (book.categories) {
              const existingCategory = category.find(c => c.id === book.categories.id);
              if (existingCategory) {
                existingCategory.books.push(book);
              } else {
                category.push({
                  id: book.categories.id,
                  name: book.categories.name,
                  is_leaf: book.categories.is_leaf,
                  books: [book],
                });
              }
            }
          });

          setDataCategory(category);          
        }
      } catch (error) {
        messageApi.open({
          type: 'error',
          content: 'An error occurred while fetching book data!',
        });
      }
      
    }
    fetchApi();
  }, []);
  
  return (
    <>
      {contextHolder}
      <AppContext.Provider
        value={{
          dataBook, 
          setDataBook, 
          dataBookTopSelling,
          setDataBookTopSelling,
          dataCategory, 
          setDataCategory
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  )
}

export default AppProvider;