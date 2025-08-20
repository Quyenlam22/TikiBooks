import React from "react";
import Sidebar from "./sibar";
//import { HomeIcon, GiftIcon } from "lucide-react";

const NotificationPage: React.FC = () => {
    return (
        // <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
        //     <div className="flex flex-col lg:flex-row w-full max-w-[1240px] h-auto lg:h-[847px] gap-6">
        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row w-full max-w-[1240px] gap-16 mt-8 rounded p-8">


                <div className="w-full lg:w-[267px]">
                    <Sidebar />
                </div>
                {/* Main content */}
                <div className="bg-white w-full  sm:w-[500px]  md:w-[700px]  lg:w-[973px] h-[600px] flex flex-col gap-6 p-8 rounded shadow">
                    <h2 className="text-lg sm:text-xl font-semibold mb-6">Thông báo của tôi</h2>

                    <div className="bg-white rounded-md flex flex-col justify-center items-center py-20 px-4">
                        {/* Icon */}
                        {/* <img
                            src="/images/empty-noti.png"
                            alt="No notifications"
                            className="w-24 h-24 mb-4"
                        /> */}
                        {/* Text */}
                        <p className="text-gray-600 mb-6">Bạn chưa có thông báo</p>
                        {/* Button */}
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded">
                            Tiếp tục mua sắm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationPage;
