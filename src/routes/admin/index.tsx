import { lazy } from "react";
import LayoutAdmin from "../../layout/LayoutAdmin";
import Author from "../../pages/Admin/Author";
import Book from "../../pages/Admin/Book";
import Category from "../../pages/Admin/Category";
import DashBoard from "../../pages/Admin/Dashboard";
import Login from "../../pages/Admin/Login";
import UserAdmin from "../../pages/Admin/User/UserAdmin";
import UserClient from "../../pages/Admin/User/UserClient";
import withSuspense from "../../utils/withSuspense";

const Error404 = lazy(() => import("../../pages/Error404"));

export const routesAdmin = [
  {
    // element: <PrivateRouteAdmin/>,
    // children: [
    //   {
      path: "/admin",
      element: <LayoutAdmin/>,
      children: [
        
        {
          path: "dashboard",
          element: <DashBoard/>,
        },
        {
          index: true,
          element: <DashBoard/>,
        },
        {
          path: "categories",
          element: <Category/>,
        },
        {
          path: "books",
          element: <Book/>,
        },
        {
          path: "authors",
          element: <Author/>,
        },
        {
          path: "userClient",
          element: <UserClient/>,
        },
        {
          path: "userAdmin",
          element: <UserAdmin/>,
        },
        // {
        //   path: "settings",
        //   element: <Setting/>,
        // },
        {
          path: "*",
          element: withSuspense(Error404)
        },
      ]
  //   }
  // ]
  },
  {
    path: "admin/login",
    element: <Login/>,
  }
]