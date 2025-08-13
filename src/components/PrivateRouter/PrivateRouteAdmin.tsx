import { Modal } from "antd";
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { WarningOutlined } from "@ant-design/icons";

function PrivateRouteAdmin () {
    const accessToken = localStorage.getItem("access_token");
    const dataUser = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleCancel = () => {
        setIsModalOpen(false);
        navigate('/');
    };
    return (
        <>
            {(accessToken && dataUser.role === "admin") ? <Outlet/> : (
                <>
                    <Modal
                        title={<><WarningOutlined /> Thông báo</>}
                        closable={{ 'aria-label': 'Custom Close Button' }}
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <p>Vui lòng đăng nhập với vai trò Admin!</p>
                    </Modal>
                </>
            )}
        </>
    )
}

export default PrivateRouteAdmin;