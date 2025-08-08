import TopSellingSection from "../../components/top-seller";
import BookList from "../../components/Book/BookList";
import Carousel from "../../components/Carousel/Carousel";

function Home() {
  return (
    <>
      <Carousel />
      <div className="pl-4 mb-12 flex gap-8">
        <BookList />
      </div>
      
      <TopSellingSection />
    </>
  )
}

export default Home;