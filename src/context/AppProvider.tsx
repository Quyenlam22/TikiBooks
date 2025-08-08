import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Book } from "../../type/Book";
import { getAllBooks } from "../services/bookService";
import { message } from "antd";

type AppContextType = {
  dataBook: Book[];
  setDataBook: React.Dispatch<React.SetStateAction<Book[]>>;
  dataBookTopSelling: Book[];
  setDataBookTopSelling: React.Dispatch<React.SetStateAction<Book[]>>;
};

export const AppContext = createContext<AppContextType>({
  dataBook: [],
  setDataBook: () => {},
  dataBookTopSelling: [],
  setDataBookTopSelling: () => [],
});

type AppProviderProps = {
  children: ReactNode;
};

function AppProvider ({children}: AppProviderProps) {
  const [dataBook, setDataBook] = useState<Book[]>([]);
  const [dataBookTopSelling, setDataBookTopSelling] = useState<Book[]>([]);
  
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

  console.log((dataBookTopSelling));
  

  return (
    <>
      {contextHolder}
      <AppContext.Provider
        value={{
          dataBook, 
          setDataBook, 
          dataBookTopSelling,
          setDataBookTopSelling
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  )
}

export default AppProvider;