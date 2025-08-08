import "./LayoutClient.css";
import FooterComponent from "../../components/FooterComponent";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router";

function LayoutClient() {
  return (
    <>
        <Header/>
        <main className="main p-4 min-h-[60vh]">
          <Outlet />
        </main>
        <FooterComponent/>
    </>
  )
}

export default LayoutClient;