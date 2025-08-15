import { Navigate, Outlet, useLocation } from "react-router-dom";

function PrivateRouteAdmin() {
  const accessToken = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  const location = useLocation();
  
  if(user.role === "admin") {
    return <Outlet />;
  }
  else {
    if (!accessToken) {
        sessionStorage.setItem("isAdmin", "login");
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (!isAdmin) {
        sessionStorage.setItem("isAdmin", "no_permission");
        return <Navigate to="/" replace />;
    }
  }
  
}

export default PrivateRouteAdmin;