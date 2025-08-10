import TopSellingSection from "../../components/top-seller";
import FilterBook from "../../components/Book/FilterBook";
import Carousel from "../../components/Carousel/Carousel";

function Home() {
  return (
    <>
      <Carousel />
      <div className="pl-4 mb-12 flex gap-8">
        <FilterBook />
      </div>
      
      <TopSellingSection />
    </>
  )
}

export default Home;