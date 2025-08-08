import BookCarddetail from "./bookcarddetail";
import { useEffect, useState } from "react";
import type { Book } from "../../../type/Book";
import { getRelatedBooks } from "../../services/bookService";
import SecureShopping from "./SecureShopping";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

type BookrelatedProps = {
    book: Book;
};

function Bookrelated({ book }: BookrelatedProps) {
    const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
    const [topDeals, setTopDeals] = useState<Book[]>([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [topDealsPage, setTopDealsPage] = useState(0);

    // Responsive books per page
    const getBooksPerPage = () => {
        if (window.innerWidth < 580) return 4;
        if (window.innerWidth < 768) return 6;
        return 8;
    };

    const getTopDealsPerPage = () => {
        if (window.innerWidth < 580) return 2;
        if (window.innerWidth < 768) return 3;
        return 4;
    };

    const [booksPerPage, setBooksPerPage] = useState(getBooksPerPage());
    const [topDealsPerPage, setTopDealsPerPage] = useState(getTopDealsPerPage());

    // Update per-page values on resize
    useEffect(() => {
        const handleResize = () => {
            setBooksPerPage(getBooksPerPage());
            setTopDealsPerPage(getTopDealsPerPage());
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const related = await getRelatedBooks(book);
                setRelatedBooks(related);

                const topSelling = related
                    .filter((b) => b.quantity_sold?.value !== undefined)
                    .sort((a, b) => b.quantity_sold!.value - a.quantity_sold!.value);

                setTopDeals(topSelling);
            } catch (error) {
                console.error("Error fetching related books:", error);
            }
        };

        if (book) fetchData();
    }, [book]);

    // Pagination calculations
    const totalPages = Math.ceil(relatedBooks.length / booksPerPage);
    const topDealsTotalPages = Math.ceil(topDeals.length / topDealsPerPage);

    const paginatedBooks = relatedBooks.slice(
        currentPage * booksPerPage,
        (currentPage + 1) * booksPerPage
    );

    const paginatedTopDeals = topDeals.slice(
        topDealsPage * topDealsPerPage,
        (topDealsPage + 1) * topDealsPerPage
    );

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const nextTopDealsPage = () => {
        setTopDealsPage((prev) => (prev + 1) % topDealsTotalPages);
    };
    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const prevTopDealsPage = () => {
        setTopDealsPage((prev) => (prev - 1 + topDealsTotalPages) % topDealsTotalPages);
    };


    return (
        <div className="flex flex-col items-center gap-4">
            {/* Sản phẩm tương tự */}
            <div className="w-[390px] sm:w-[584px] flex flex-col items-center bg-white shadow rounded p-4 pb-5.5 relative">


                <h2 className="text-base font-semibold text-gray-800 mb-4 self-start">
                    Sản phẩm tương tự
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
                    {paginatedBooks.map((book: Book) => (
                        <BookCarddetail
                            key={book.current_seller?.product_id}
                            book={book}
                        />
                    ))}
                </div>

                {totalPages >= 1 && (
                    <>
                        {currentPage > 0 && (
                            <button
                                onClick={prevPage}
                                className="absolute cursor-pointer top-1/2 -translate-y-1/2 left-0 bg-amber-50 text-xl text-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out rounded-full w-8 h-8 flex items-center justify-center ml-2 shadow-lg z-8"
                                aria-label="Previous page"
                            >
                                <LeftOutlined />
                            </button>
                        )}
                        <button
                            onClick={nextPage}
                            className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-0 bg-amber-50 text-xl text-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out rounded-full w-8 h-8 flex items-center justify-center mr-2 shadow-lg z-8"
                            aria-label="Next page"
                        >
                            <RightOutlined />
                        </button>


                        <div className="flex justify-center gap-2 mt-4 absolute bottom-2 left-1/2 -translate-x-1/2">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <span
                                    key={index}
                                    className={`h-2 w-4 rounded-full transition-all duration-300 ${index === currentPage
                                        ? "bg-blue-500"
                                        : "bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Top Deals */}
            <div className="w-[390px] sm:w-[584px] flex flex-col items-center bg-white shadow rounded p-4 pb-5.5 relative">


                <h2 className="text-base font-semibold text-gray-800 mb-4 self-start">
                    Top deals
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                    {paginatedTopDeals.map((book: Book) => (
                        <BookCarddetail
                            key={book.current_seller?.product_id}
                            book={book}
                        />
                    ))}
                </div>

                {topDealsTotalPages >= 1 && (
                    <>
                        {topDealsPage > 0 && (
                            <button
                                onClick={prevTopDealsPage}
                                className="absolute cursor-pointer top-1/2 -translate-y-1/2 left-0 bg-amber-50 text-xl text-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out rounded-full w-8 h-8 flex items-center justify-center ml-2 shadow-lg z-8"
                                aria-label="Previous page"
                            >
                                <LeftOutlined/>
                            </button>
                        )}

                        <button
                            onClick={nextTopDealsPage}
                            className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-0 bg-amber-50 text-xl text-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out rounded-full w-8 h-8 flex items-center justify-center mr-2 shadow-lg z-8"
                            aria-label="Next page"
                        >
                            <RightOutlined/>
                        </button>
                        <div className="flex justify-center gap-2 mt-4 absolute bottom-2 left-1/2 -translate-x-1/2">
                            {Array.from({ length: topDealsTotalPages }).map((_, index) => (
                                <span
                                    key={index}
                                    className={`h-2 w-4 rounded-full transition-all duration-300 ${index === topDealsPage
                                        ? "bg-blue-500"
                                        : "bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <SecureShopping />
        </div>
    );
}

export default Bookrelated;
