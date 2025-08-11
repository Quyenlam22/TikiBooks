import TopSellingSection from "../../components/top-seller";
import FilterBook from "../../components/Book/FilterBook";
import Carousel from "../../components/Carousel/Carousel";
import CategoryAccordion from "../../components/Category/CategoryAccordion";

function Home() {
  return (
    <>
      <div className="pl-4 mb-12 flex gap-6">
        <CategoryAccordion/>
        <div>
          <Carousel />
          <FilterBook />
        </div>
      </div>
      
      <TopSellingSection />
    </>
  )
}

export default Home;