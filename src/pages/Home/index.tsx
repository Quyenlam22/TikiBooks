import TopSellingSection from "../../components/top-seller";
import FilterBook from "../../components/Book/FilterBook";
import Carousel from "../../components/Carousel/Carousel";
import CategoryAccordion from "../../components/Category/CategoryAccordion";
import FilterBarMobile from "../../components/Header/FilterBarMobile";
import BookList from "../../components/Book/BookList";
import { useState } from "react";
import type { Book } from "../../type/Book";

function Home() {
   const [sortedBooks, setSortedBooks] = useState<Book[]>([]);

  return (
    <>
      <div className="md:block hidden">
        <div className="flex pl-4 mb-12 gap-6">
          <CategoryAccordion/>
          <div>
            <Carousel />
            <FilterBook />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <FilterBarMobile onSort={(books) => setSortedBooks(books)} />
        <BookList dataBook={sortedBooks} />
      </div>
      <TopSellingSection />
    </>
  )
}

export default Home;