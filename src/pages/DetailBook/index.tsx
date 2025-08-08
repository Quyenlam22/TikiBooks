import BookImageSlider from "../../components/Book/BookImageSlider";
import BookPurchase from "../../components/Book/BookPurchase";

function DetailBook() {
  return (
    <>
    <div className="bg-gray-50">
      DetailBook
      <BookImageSlider images={[
        "https://salt.tikicdn.com/cache/750x750/ts/product/10/c4/aa/a6ed84d63a9d3253a3c873d139e7ff36.png",
        "https://salt.tikicdn.com/cache/750x750/ts/product/19/45/ec/c9acd1b390d24905b5df36aa510b5a2d.png",
        "https://salt.tikicdn.com/cache/750x750/ts/product/4a/60/ec/ecebef5ecd90b5c470a42ff3c3d9c291.jpg",
        "https://salt.tikicdn.com/cache/750x750/ts/product/2a/3b/1d/a9d910bc45e18c500937ac8d732ac221.jpg",
        "https://salt.tikicdn.com/cache/100x100/ts/product/2f/fb/c0/d5a17ccee7579b98eab9c70047cdb50b.jpg"
      ]}/>
      <BookPurchase price={100000} />
      </div>
    </>
  )
}

export default DetailBook;