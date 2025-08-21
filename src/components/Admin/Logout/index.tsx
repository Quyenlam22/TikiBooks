import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

function Logout () {
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();

    const openNotification = () => {
        api['success']({
            message: `Đăng xuất thành công!`,
            duration: 1
        });
    };

    const handleClick = async () => {
        openNotification();
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        setTimeout(() => {
            navigate("/");
        }, 1000);
    }

    return (
        <>
            {contextHolder}
            <div onClick={handleClick}>Đăng xuất</div>
        </>
    )
}

export default Logout;