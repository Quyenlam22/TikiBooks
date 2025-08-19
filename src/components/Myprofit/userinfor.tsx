import Sidebar from '../../components/Myprofit/sibar';
import { getUserById, updateUserById } from '../../services/authService';
import { useEffect, useState } from 'react';
import type { User } from '../../../type/user';
import { User as UserIcon, Tag as TagIcon, UserCircle2 } from "lucide-react";

export default function AccountInfo() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    // Lấy dữ liệu ban đầu
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
                if (!storedUser.id) return;

                const data = await getUserById(storedUser.id.toString());
                setUser(data);
            } catch (err) {
                console.error('Lỗi lấy thông tin người dùng:', err);
            }
        };

        fetchUser();
    }, []);
    const handleChange = (field: string, value: string) => {
        setUser((prev) => ({
            ...prev,
            [field]: value
        }));
    };
    const handleSave = async () => {
        if (!user?.id) return;
        try {
            setLoading(true);
            await updateUserById(user.id, user);
            alert('Cập nhật thành công!');
        } catch (err) {
            console.error('Lỗi cập nhật:', err);
            alert('Cập nhật thất bại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row w-full max-w-[1240px] gap-16 mt-8 rounded p-8">
                {/* Sidebar */}
                <div className="w-full lg:w-[267px]">
                    <Sidebar />
                </div>

                {/* Nội dung */}
                <div className="bg-white w-full max-w-[973px] h-auto md:h-[600px] flex flex-col lg:flex-row gap-6 lg:gap-8 p-4 sm:p-5 md:p-6 rounded shadow mx-auto">

                    {/* Cột trái */}
                    <div className="flex-1 flex flex-col justify-between gap-4">
                        <h2 className="text-lg font-semibold mb-2">Thông tin cá nhân</h2>

                        <div className="flex items-start gap-4 flex-wrap">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-100 flex items-center justify-center">
                                <UserCircle2 size={48} className="text-blue-500" />
                            </div>
                            <div className='flex flex-col gap-3 flex-1 min-w-[200px]'>
                                {/* Họ & Tên */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                    <label className="flex items-center gap-2 w-[120px] text-gray-700 text-sm font-medium">
                                        <UserIcon size={16} /> Họ & Tên
                                    </label>
                                    <input
                                        type="text"
                                        value={user?.fullName || ""}
                                        onChange={(e) => handleChange("fullName", e.target.value)}
                                        className="flex-1 border border-gray-300 rounded px-3 py-1 h-[38px] text-sm"
                                        placeholder="Nhập họ và tên"
                                    />
                                </div>

                                {/* Nickname */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                    <label className="flex items-center gap-2 w-[120px] text-gray-700 text-sm font-medium">
                                        <TagIcon size={16} /> Nickname
                                    </label>
                                    <input
                                        type="text"
                                        value={user?.nickName || ""}
                                        onChange={(e) => handleChange("nickName", e.target.value)}
                                        className="flex-1 border border-gray-300 rounded px-3 py-1 h-[38px] text-sm"
                                        placeholder="Nhập nickname"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Ngày sinh */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <label className="w-[120px] text-gray-700 text-sm font-medium">
                                Ngày sinh
                            </label>
                            <input
                                type="date"
                                value={user?.birthDay || ""}
                                onChange={(e) => handleChange("birthDay", e.target.value)}
                                className="flex-1 border border-gray-300 rounded px-3 py-1 h-[38px] text-sm"
                                placeholder='Chọn ngày sinh'
                            />
                        </div>

                        {/* Giới tính */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <label className="w-[120px] text-gray-700 text-sm font-medium">
                                Giới tính
                            </label>
                            <div className="flex gap-4 flex-wrap">
                                {["male", "female", "other"].map((gender) => (
                                    <label key={gender} className="inline-flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={gender}
                                            checked={user?.gender === gender}
                                            onChange={() => handleChange("gender", gender)}
                                        />
                                        {gender === "male" ? "Nam" : gender === "female" ? "Nữ" : "Khác"}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Địa chỉ */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <label className="w-[120px] text-gray-700 text-sm font-medium">
                                Địa chỉ
                            </label>
                            <input
                                type="text"
                                value={user?.address || ""}
                                onChange={(e) => handleChange("address", e.target.value)}
                                className="flex-1 border border-gray-300 rounded px-3 py-1 h-[38px] text-sm"
                                placeholder="Nhập địa chỉ"
                            />
                        </div>

                        {/* Nút lưu */}
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="bg-blue-600 text-white rounded px-4 h-[38px] text-sm hover:bg-blue-700 transition"
                            >
                                {loading ? "Đang lưu..." : "Lưu thay đổi"}
                            </button>
                        </div>
                    </div>

                    {/* Cột phải */}
                    <div className="flex-1 lg:max-w-[300px] flex flex-col gap-5">
                        <div className="flex flex-col gap-5">
                            <h3 className="text-lg font-semibold">Số điện thoại và Email</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                <label className="w-[120px] text-gray-700 text-sm font-medium">
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    value={user?.phone || ""}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    className="flex-1 border border-gray-300 rounded px-3 py-1 h-[38px] text-sm"
                                    placeholder="Nhập số điện thoại"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                <label className="w-[120px] text-gray-700 text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className="flex-1 border border-gray-300 rounded px-3 py-1 h-[38px] text-sm"
                                    placeholder="Nhập email"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 mt-2">
                            <h3 className="text-lg font-semibold">Bảo mật</h3>
                            <div className="flex items-center justify-between">
                                <span>Đổi mật khẩu</span>
                                <button className="text-blue-600 font-medium hover:underline">
                                    Cập nhật
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Yêu cầu xóa tài khoản</span>
                                <button className="text-red-500 font-medium hover:underline">
                                    Yêu cầu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    );
}
