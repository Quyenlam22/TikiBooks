import { YoutubeFilled } from "@ant-design/icons";
import { QRCode, Tooltip } from "antd";
import cert_1 from "../../assets/cert/cert_1.png";
import cert_2 from "../../assets/cert/cert_2.png";
import cert_3 from "../../assets/cert/cert_3.png";
import { FaFacebookF } from "react-icons/fa";
import zaloIcon from "../../assets/socials/zalo.png";

const modules = import.meta.glob('../../assets/payments/*.png', { eager: true }) as Record<string, { default: string }>;

const images = Object.entries(modules)
  .sort(([a], [b]) => {
    const getNum = (s: string) => parseInt(s.match(/p(\d+)/)?.[1] || '0', 10);
    return getNum(a) - getNum(b);
  })
  .map(([_, mod]) => mod.default);
  
function FooterComponent() {
  return (
    <footer className="bg-white text-sm text-gray-600">
      <div className="p-8 grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Hỗ trợ khách hàng</h3>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Về Tiki</h3>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Hợp tác và liên kết</h3>
          <ul className="mb-4 space-y-1">
            <li>Quy chế hoạt động Sàn GDTMĐT</li>
            <li>Bán hàng cùng Tiki</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">Chứng nhận bởi</h3>
          <div className="flex space-x-2 mb-4">
            <img src={cert_1} alt="cert_1" className="h-8" />
            <img src={cert_2} alt="cert_2" className="h-8" />
            <img src={cert_3} alt="cert_3" className="h-8" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Phương thức thanh toán</h3>
          <div className="grid grid-cols-5 gap-2">
            {images.map((src, index) => (
              <img key={index} src={src} alt={`payments-${index}`} className="h-6" />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Kết nối với chúng tôi</h3>
          <div className="flex space-x-2 text-xl mb-4">
            <Tooltip title="Facebook">
              <div className="w-10 h-10 bg-[#3b5998] rounded-full flex items-center justify-center text-white text-xl cursor-pointer">
                <FaFacebookF />
              </div>
            </Tooltip>

            <Tooltip title="YouTube">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white text-xl cursor-pointer">
                <YoutubeFilled />
              </div>
            </Tooltip>

            <Tooltip title="Zalo">
              <div className="w-12 h-10 rounded-full flex items-center justify-start cursor-pointer bg-white">
                <img
                  src={zaloIcon}
                  alt="Zalo"
                  className="w-12 h-12 object-contain"
                />
              </div>
            </Tooltip>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">Tải ứng dụng trên điện thoại</h3>
          <div className="flex gap-2">
            <QRCode
              bordered={false}
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

      <div className="text-gray-500 border-t border-gray-300 px-8 py-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Công ty TNHH TI KI</h3>
        <p className="mb-1">
          Tòa nhà số 52 đường Út Tịch, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh
        </p>
        <p>
          Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và Đầu Tư Thành phố Hồ Chí Minh cấp lần đầu ngày 06/01/2010.
        </p>
        <p>Hotline: <span className="text-blue-600 font-medium">1900 6035</span></p>
      </div>

      <div className="text-gray-500 border-t border-gray-300 px-8 py-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Thương Hiệu Nổi Bật</h3>    
        <p>
          vascara / dior / esteelauder / th truemilk / barbie / owen / ensure / durex / bioderma / elly / milo / skechers / aldo / triumph / nutifood / kindle / nerman / wacom / anessa / yoosee / olay / similac / comfort / bitas / shiseido / langfarm / hulken / vichy / fila / tsubaki
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
