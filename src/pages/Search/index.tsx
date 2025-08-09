import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import BookList from "../../components/Book/BookList";

const SearchPage = () => {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const { setSearchTerm } = useContext(AppContext);

  useEffect(() => {
    setSearchTerm(q);
  }, [q, setSearchTerm]);

  return (
    <div className="pl-4 mb-12">
      <h1 className="text-xl font-semibold mb-4">Kết quả tìm kiếm cho: "{q}"</h1>
      <BookList />
    </div>
  );
};

export default SearchPage;
