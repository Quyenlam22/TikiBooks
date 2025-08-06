import { useEffect, useState } from "react";
import { getAllBooks } from "../../services/bookService";

function Home() {
  const [dataBook, setDataBook] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllBooks();
      console.log(response);
    }

    fetchApi();
  }, []);

  return (
    <>
      Home
    </>
  )
}

export default Home;