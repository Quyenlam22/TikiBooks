import { Rate } from 'antd';
import type { Book } from '../../../type/Book';
import { Link } from 'react-router-dom';
import "./Book.css";

type BookCardProps = {
    book: Book;
    isAd?: boolean;
    deliveryDate?: string;
};

const BookCarddetail: React.FC<BookCardProps> = ({
    book,
    isAd = false,
    // deliveryDate = '3, 01/04',
}) => {
    const {
        id,
        name,
        current_seller,
        rating_average,
        images,
    } = book;

    const imageUrl = images?.[0]?.thumbnail_url || '';
    const price = current_seller?.price || 0;
    const rating = rating_average || null;

    return (
        <Link to={`/book/${id}`} className="no-underline text-inherit">
            <div className="relative flex flex-col rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 w-[132px] h-[235px] cursor-pointer">
                {isAd && (
                    <div className="absolute top-2 right-2 bg-gray-100 rounded-sm text-xs text-gray-700 px-1 py-0.5 font-bold z-10">
                        AD
                    </div>
                )}

                <div className="w-full h-85 relative bg-white flex -mt-8 justify-center overflow-hidden">
                    <img src={imageUrl} alt={name} className="object-cover w-full h-auto transform transition-transform duration-300 ease-in-out hover:scale-110" />
                </div>

                <div className="p-2 flex flex-col justify-start h-[118px]">
                    <div className="text-[10px] font-medium text-gray-800 line-clamp-2 leading-tight mt-0">
                        {name}
                    </div>

                    <div className="flex items-center mt-1">
                        {rating && (
                            <Rate
                                disabled
                                allowHalf
                                defaultValue={rating}
                                style={{ fontSize: 10 }}
                                className="tight-rate"
                            />
                        )}
                    </div>

                    <div className="text-[12px] leading-none mt-3">
                        {price.toLocaleString()}₫
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BookCarddetail;
