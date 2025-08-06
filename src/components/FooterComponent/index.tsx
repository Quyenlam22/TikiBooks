import { FacebookFilled, YoutubeFilled } from "@ant-design/icons";
import { QRCode, Layout } from "antd";

const { Footer } = Layout;

function FooterComponent() {
  return (
    <footer className="bg-white text-sm text-gray-600">
      <div className="max-w-[1280px] mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Hỗ trợ khách hàng</h4>
          <p className="font-bold">1900-6035</p>
          <p>(1000 đ/phút, 8-21h kể cả T7, CN)</p>
          <ul className="mt-2 space-y-1">
            <li>Các câu hỏi thường gặp</li>
            <li>Gửi yêu cầu hỗ trợ</li>
            <li>Hướng dẫn đặt hàng</li>
            <li>Phương thức vận chuyển</li>
            <li>Chính sách kiểm hàng</li>
            <li>Chính sách đổi trả</li>
            <li>Hướng dẫn trả góp</li>
            <li>Chính sách nhập khẩu</li>
            <li>Email CSKH: hotro@tiki.vn</li>
            <li>Báo lỗi bảo mật: security@tiki.vn</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Về Tiki</h4>
          <ul className="space-y-1">
            <li>Giới thiệu Tiki</li>
            <li>Tiki Blog</li>
            <li>Tuyển dụng</li>
            <li>Chính sách bảo mật thanh toán</li>
            <li>Chính sách bảo mật thông tin cá nhân</li>
            <li>Chính sách giải quyết khiếu nại</li>
            <li>Điều khoản sử dụng</li>
            <li>Giới thiệu Tiki Xu</li>
            <li>Tiếp thị liên kết cùng Tiki</li>
            <li>Bán hàng doanh nghiệp</li>
            <li>Điều kiện vận chuyển</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Hợp tác và liên kết</h4>
          <ul className="mb-4 space-y-1">
            <li>Quy chế hoạt động Sàn GDTMĐT</li>
            <li>Bán hàng cùng Tiki</li>
          </ul>

          <h4 className="font-semibold text-gray-900 mb-2">Chứng nhận bởi</h4>
          <div className="flex space-x-2 mb-4">
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/certification1.png" alt="cert 1" className="h-8" />
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/certification2.png" alt="cert 2" className="h-8" />
          </div>

          <h4 className="font-semibold text-gray-900 mb-2">Phương thức thanh toán</h4>
          <div className="grid grid-cols-4 gap-2">
            {["visa", "mastercard", "jcb", "atm", "momo", "vnpay", "zalopay", "installment"].map((method) => (
              <img
                key={method}
                src={`https://frontend.tikicdn.com/_desktop-next/static/img/footer/visa.svg`}
                alt={method}
                className="h-6"
              />
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Kết nối với chúng tôi</h4>
          <div className="flex space-x-4 text-xl mb-4">
            <FacebookFilled className="text-blue-600" />
            <YoutubeFilled className="text-red-600" />
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/social_zalo.png" alt="zalo" className="h-6" />
          </div>

          <h4 className="font-semibold text-gray-900 mb-2">Tải ứng dụng</h4>
          <div className="flex gap-2">
            <QRCode
              value="https://tiki.vn"
              size={64}
            />
            <div className="flex flex-col gap-1">
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png" alt="appstore" className="h-8" />
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png" alt="playstore" className="h-8" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-4 text-center text-xs text-gray-500 border-t">
        <p className="mb-1">
          Công ty TNHH TIKI - Tòa nhà số 52, đường Út Tịch, Phường 4, Quận Tân Bình, TP.HCM | GCNĐKDN số 0309532909 do Sở KHĐT TP.HCM cấp lần đầu ngày 06/01/2010
        </p>
        <p>Hotline: <span className="text-blue-600 font-medium">1900 6035</span></p>
      </div>

      <div className="bg-gray-50 py-4 text-center text-xs text-gray-500 border-t">
        <p>
          Thương hiệu nổi bật: vasacara / dior / estee lauder / barbie / owen / ensure / durex / bioderma / elly / milo / skechers / aldo / ... và nhiều hơn nữa.
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
