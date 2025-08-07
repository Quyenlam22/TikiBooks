import { NavLink, Outlet } from "react-router-dom";
import "./LayoutClient.css";
import logo from "../../assets/react.svg";
import { useState } from "react";
import FooterComponent from "../../components/FooterComponent";
import Header from "../../components/Header/Header";
import ServiceBar from "../../components/Header/ServiceBar";
import MainHeader from "../../components/Header/MainHeader";

function LayoutClient() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header/>
      <FooterComponent/>
    </>
  )
}

export default LayoutClient;