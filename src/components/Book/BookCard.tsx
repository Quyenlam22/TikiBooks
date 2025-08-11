import { Rate } from 'antd';
import type { Book } from '../../../type/Book';
import "./Book.css";
import { BiSolidLike } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';


type BookCardProps = {
  book: Book;
  isAd?: boolean;
  deliveryDate?: string;
};

const BookCard: React.FC<BookCardProps> = ({
  book,
  isAd = true,
  deliveryDate = '3, 01/04',
}) => {
  const {
    name,
    authors,
    current_seller,
    rating_average,
    quantity_sold,
    images,
    list_price,
  } = book;

  const imageUrl = images?.[0]?.thumbnail_url || '';
  const authorName = authors?.[0]?.name;
  const price = current_seller?.price || 0;
  const discount = list_price ? Math.round(((list_price - price) / list_price) * 100) : 0;
  const soldText = quantity_sold?.text || null;
  const rating = rating_average || null;


  return (
    <Link to={`/book/${book.id}`} className="no-underline text-inherit">
      <div className="relative flex flex-col rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 w-full min-h-[600px]">
        {isAd && (
          <div className="absolute top-2 right-2 bg-gray-100 rounded-sm text-xs text-gray-700 px-1 py-0.5 font-bold z-10">
            AD
          </div>
        )}

        <div className="w-full h-85 relative bg-white flex -mt-8 justify-center overflow-hidden">
          <img src={imageUrl} alt={name} className="object-cover w-full h-auto transform transition-transform duration-300 ease-in-out hover:scale-110" />

          <div className="absolute bottom-0 left-0 flex items-center gap-2 bg-white rounded-sm px-2 py-1">
            <div className="h-10 flex items-center bg-red-100 text-xs px-2 py-1 rounded shadow">
              <BiSolidLike className='text-sm mr-0.5 text-red-700' />
              <div className='font-bold text-[10px] text-red-700'>
                <p>TOP</p>
                <p>DEAL</p>
              </div>
            </div>
            <div className="h-10 text-center bg-[#F2F7FF] px-2 py-1 rounded shadow">
              <p className="font-bold italic text-[10px] text-blue-600">FREESHIP</p>
              <p className="font-bold italic text-xs text-green-600">XTRA</p>
            </div>
            <div className="h-10 rou flex items-center bg-[#F2F7FF] px-2 py-1 rounded shadow">
              <div className="w-4 h-4 mr-1 rounded-full bg-blue-700 flex items-center justify-center">
                <FaCheck className="text-white text-[10px]" />
              </div>
              <div className='font-bold text-[10px] text-blue-700'>
                <p>CHÍNH</p>
                <p>HÃNG</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2 text-sm flex-1 flex flex-col justify-between">
          <div>
            <div className="text-lg mb-4 font-semibold text-red-600 leading-none my-1">
              {price.toLocaleString()}₫
              {discount > 0 && (
                <span className="text-xs text-stone-900 bg-gray-100 rounded-sm px-1 py-0.5 ml-2">
                  -{discount}%
                </span>
              )}
            </div>

            {authorName && <div className="text-gray-500 text-lg mt-2 min-h-[1rem]">{authorName.toUpperCase()}</div>}

            <div className="text-lg text-gray-800 line-clamp-2">{name}</div>

            <div className="flex items-center text-gray-600 mt-1">
              {rating && (
                <>
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={rating}
                    style={{
                      fontSize: 14,
                      marginRight: "2px",
                    }}
                    className="tight-rate"
                  />
                </>
              )}
              <p className="text-gray-200">|</p>
              {soldText && <span className="ml-1">{soldText}</span>}
            </div>
          </div>

          <div className="text-gray-400 text-xs pt-1 border-t border-gray-200 mt-2">
            Giao thứ {deliveryDate}
          </div>
        </div>

      </div>
    </Link>
  );
};

export default BookCard;
