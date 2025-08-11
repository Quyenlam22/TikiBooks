import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import BookSearchList from "../../components/Book/BookSearchList";

const SearchPage = () => {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const { dataBook } = useContext(AppContext);

  return (
    <div className="pl-4 mb-12">
      <h1 className="text-xl font-semibold mb-4">Kết quả tìm kiếm cho: "{q}"</h1>
      <BookSearchList dataBook={dataBook} searchTerm={q} />
    </div>
  );
};

export default SearchPage;
