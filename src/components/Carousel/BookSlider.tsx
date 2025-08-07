import type { Book } from "../../../type/Book-carousel";

interface BookSliderProps {
  title: string;
  sponsor: string;
  rating: number;
  books: Book[];
}

const BookSlider = ({ title, sponsor, rating, books }: BookSliderProps) => {
  return (
    <div className="bg-white rounded shadow-md flex p-4 gap-4">
      {/* Left: Logo */}
      <div className="flex-shrink-0 aspect-square w-40 flex items-center justify-center bg-green-100 rounded-md relative">
        <div className="absolute inset-0 bg-green-600 backdrop-blur-sm opacity-10 rounded-md" />
        <img
            src="https://theme.hstatic.net/1000290493/1000909353/14/logo-footer.png?v=231/240x240"
            alt="Sponsor"
            className="w-40 h-40 object-contain z-10"
        />
        </div>

      {/* Right: Text + Books */}
      <div className="flex flex-col flex-grow justify-between">
        {/* Top text */}
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">
            Tài trợ bởi <span className="font-medium">{sponsor}</span> ⭐{rating}/5
          </p>
        </div>

        {/* Book list */}
        <div className="flex gap-4 mt-4">
          {books.slice(0, 3).map((book) => (
            <div key={book.id} className="relative w-20 h-32 flex-shrink-0">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover rounded"
              />
              <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1 rounded">
                -{book.discount}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookSlider;