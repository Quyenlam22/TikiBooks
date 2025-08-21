import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Book } from "../type/Book";
import type { Category } from "../type/Category";
import { getAllBooks } from "../services/bookService";
import { message } from "antd";
import type { User } from "../type/user";
import type { Cart } from "../type/Cart";
import { getAllCategories } from "../services/categoryService";
import { MessageInstance } from "antd/es/message/interface";

type AppContextType = {
  dataBook: Book[];
  setDataBook: React.Dispatch<React.SetStateAction<Book[]>>;
  dataBookTopSelling: Book[];
  setDataBookTopSelling: React.Dispatch<React.SetStateAction<Book[]>>;
  dataCategory: Category[];
  setDataCategory: React.Dispatch<React.SetStateAction<Category[]>>;
  dataUser: User[];
  setDataUser: React.Dispatch<React.SetStateAction<User[]>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  selectedBookId: string | null;
  setSelectedBookId: React.Dispatch<React.SetStateAction<string | null>>;

  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;

  checkoutBooks: { book: Book; quantity: number }[];
  setCheckoutBooks: React.Dispatch<React.SetStateAction<{ book: Book; quantity: number }[]>>;

  messageApi: MessageInstance;
};

export const AppContext = createContext<AppContextType>({
  dataBook: [],
  setDataBook: () => { },
  dataBookTopSelling: [],
  setDataBookTopSelling: () => [],
  dataCategory: [],
  setDataCategory: () => { },
  dataUser: [],
  setDataUser: () => { },
  user: null,
  setUser: () => { },
  selectedBookId: null,
  setSelectedBookId: () => { },

  cart: [],
  setCart: () => { },

  checkoutBooks: [],
  setCheckoutBooks: () => { },

  messageApi: {} as MessageInstance,
});

type AppProviderProps = {
  children: ReactNode;
};

function AppProvider({ children }: AppProviderProps) {
  const [dataBook, setDataBook] = useState<Book[]>([]);
  const [dataBookTopSelling, setDataBookTopSelling] = useState<Book[]>([]);
  const [dataCategory, setDataCategory] = useState<Category[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [dataUser, setDataUser] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [checkoutBooks, setCheckoutBooks] = useState<{ book: Book; quantity: number }[]>([]);
  
  const [cart, setCart] = useState<Cart[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const [booksResponse, categoriesResponse] = await Promise.all([
          getAllBooks(),
          getAllCategories()
        ]);
        setDataBook(booksResponse);

        if (booksResponse.length > 0) {
          const topBook = booksResponse.filter(
            (book: Book) => book.quantity_sold && book.quantity_sold.value !== undefined
          ).sort(
            (a: Book, b: Book) => b.quantity_sold.value - a.quantity_sold.value
          ).slice(0, 10);

          setDataBookTopSelling(topBook);

          const categoryList: Category[] = categoriesResponse.map((cat: Category) => {
            const booksInCat = booksResponse.filter(
              (book: Book) => book.categories && book.categories.id === cat.id
            );
            return {
              ...cat,
              books: booksInCat,
            };
          });

          setDataCategory(categoryList);
        }

        // const userData = JSON.parse(localStorage.getItem("user") || "{}");
        // setUser(userData);
        //sửa
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
          } catch {
            localStorage.removeItem("user");
          }
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
          setDataCategory,
          dataUser,
          setDataUser,
          user,
          setUser,
          selectedBookId,
          setSelectedBookId,
          cart,
          setCart,
          checkoutBooks,
          setCheckoutBooks,
          messageApi 
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  )
}

export default AppProvider;