
import { useContext } from "react";
import type { Book } from '../../../type/Book';
import { AppContext } from "../../context/AppProvider";

function TopSellingSection() {
    const { dataBookTopSelling } = useContext(AppContext);

    return (
        <div className=" ">
            <div className=" mx-auto px-1 py-1 bottom-[35px] pl-4">

                {/* top-[2554px] */}
                <div className="  h-[64px] w-full bg-white rounded-[4px] shadow flex items-center mb-4  ">
                    <h2 className="ml-2 text-lg">
                        Tìm kiếm liên quan
                    </h2>
                </div>
                {/* top-[2634px] */}

                <div className="h-[383px] w-full bg-white rounded-[4px] shadow p-4 overflow-y-hidden">
                    <div className="mb-1 text-lg ">
                        Top bán chạy sản phẩm nhà sách Tiki
                    </div>
                    <ul className="text-sm text-gray-800 flex flex-col justify-between h-[calc(383px-1rem-32px)] ">
                        {dataBookTopSelling.map((book: Book) => (
                            <li key={book.current_seller.product_id} className="flex-1">
                                <a
                                    href="#"
                                    className="flex items-center justify-between rounded px-4 py-2 hover:bg-amber-50 transition-colors h-full mb-1"
                                >
                                    <div className=" text-blue-600">1.{book.name}</div>
                                    <div >{book.list_price.toLocaleString()}₫</div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>


            </div>
        </div>
    );
}
export default TopSellingSection;
