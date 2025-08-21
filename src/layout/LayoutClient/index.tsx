import { Outlet } from "react-router-dom";
import "./LayoutClient.css";
import FooterComponent from "../../components/FooterComponent";
import Header from "../../components/Header/Header";
import { useEffect } from "react";
import { message } from "antd";

function LayoutClient() {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const warningType = sessionStorage.getItem("isAdmin");
    if (warningType === "login") {
      messageApi.warning("Vui lòng đăng nhập để tiếp tục!");
      sessionStorage.removeItem("isAdmin");
    } else if (warningType === "no_permission") {
      messageApi.error("Vui lòng đăng nhập với vai trò admin để truy cập!");
      sessionStorage.removeItem("isAdmin");
    }
  }, [messageApi]);

  return (
    <>
      {contextHolder}
      <Header/>

      <main className="main p-0 md:p-4 min-h-[60vh]">
        <Outlet />
      </main>
      
      <FooterComponent/>
    </>
  )
}

export default LayoutClient;