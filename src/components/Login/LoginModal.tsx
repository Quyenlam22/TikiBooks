import { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const data = await login({ email, password });

      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      onClose();

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Login thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Nền mờ + click ra ngoài để đóng
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-black/30"
      onClick={onClose}
    >
      {/* Ngăn click vào modal bị đóng */}
      <div
        className="bg-white rounded-lg w-full max-w-3xl flex overflow-hidden shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Form */}
        <div className="flex-1 p-8">
          {/* Back arrow */}
          <button
            className="text-gray-500 text-2xl mb-4 hover:text-black"
            onClick={onClose}
          >
            ←
          </button>

          <h2 className="text-2xl font-semibold mb-2">
            Đăng nhập bằng email
          </h2>
          <p className="text-black text-sm mb-6">
            Nhập email và mật khẩu tài khoản Tiki
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              placeholder="abc@email.com"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-sm text-blue-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white rounded py-2 hover:bg-red-600 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          {/* Links */}
          <div className="flex flex-row justify-between text-sm mt-4">
            <a href="#" className="text-blue-500 hover:underline">
              Quên mật khẩu?
            </a>
            <a href="#" className="text-blue-500 hover:underline">
              Tạo tài khoản
            </a>
          </div>
        </div>

        {/* Right: Image / Info */}
        <div className="hidden md:flex flex-col items-center justify-center bg-blue-50 w-1/3 p-6 text-center">
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.V8b34N-gbA-XEQHrSGdpigHaHa"
            alt="Tiki mascot"
            className="w-24 mb-4"
          />
          <h3 className="text-lg text-blue-500 font-semibold">
            Mua sắm tại Tiki
          </h3>
          <p className="text-blue-500 text-sm">Siêu ưu đãi mỗi ngày</p>
        </div>
      </div>
    </div>
  );
}
