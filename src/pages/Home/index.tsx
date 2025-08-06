import { useEffect, useState } from "react";
import { getAllBooks } from "../../services/bookService";
import TopSellingSection from "../../components/top-seller";
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
      <div>home</div>
      <TopSellingSection />
    </>
  )
}

export default Home;