import { Navigate, Outlet, useLocation } from "react-router-dom";

function PrivateRouteClient() {
  const accessToken = localStorage.getItem("access_token");
  const location = useLocation();
  
  if (!accessToken) {
    sessionStorage.setItem("isAdmin", "login");
    const prevPath = location.state?.from?.pathname || "/";

    return <Navigate to={prevPath} replace />;
  }

  return <Outlet />;
}

export default PrivateRouteClient;
