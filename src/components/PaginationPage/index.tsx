import { Pagination } from "antd";
import { useEffect } from "react";
import type { Book } from "../../type/Book";

export type PaginationPageProps = {
  dataBook: Book[];
  pageSize: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

function PaginationPage(props: PaginationPageProps) {
  const {dataBook, pageSize, currentPage, setCurrentPage} = props;

  useEffect(() => {
    const maxPage = Math.ceil(dataBook.length / pageSize) || 1;
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [dataBook, currentPage]);
  
  return (
    <>
      <Pagination 
        align='center' 
        current={currentPage}
        pageSize={pageSize}
        total={dataBook.length}
        onChange={(page) => setCurrentPage(page)} 
      />
    </>
  )
}

export default PaginationPage;