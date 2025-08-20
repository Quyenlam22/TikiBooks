import { lazy } from "react";
import withSuspense from "../../utils/withSuspense";
import PrivateRouteAdmin from "../../components/PrivateRouter/PrivateRouteAdmin";
import LayoutAdmin from "../../layout/LayoutAdmin";"../../layout/LayoutAdmin";

const Error404 = lazy(() => import("../../pages/Error404"));
const Author = lazy(() => import("../../pages/Admin/Author"));
const Book = lazy(() => import("../../pages/Admin/Book"));
const Category = lazy(() => import("../../pages/Admin/Category"));
const DashBoard = lazy(() => import("../../pages/Admin/Dashboard"));
const UserAdmin = lazy(() => import("../../pages/Admin/User/UserAdmin"));
const UserClient = lazy(() => import("../../pages/Admin/User/UserClient"));
// const Login = lazy(() => import("../../pages/Admin/Login"));

export const routesAdmin = [
  {
    element: <PrivateRouteAdmin/>,
    children: [
      {
        path: "/admin",
        element: <LayoutAdmin/>,
        children: [
          {
            path: "dashboard",
            element: withSuspense(DashBoard),
          },
          {
            index: true,
            element: withSuspense(DashBoard),
          },
          {
            path: "categories",
            element: withSuspense(Category),
          },
          {
            path: "books",
            element: withSuspense(Book),
          },
          {
            path: "authors",
            element: withSuspense(Author),
          },
          {
            path: "userClient",
            element: withSuspense(UserClient),
          },
          {
            path: "userAdmin",
            element: withSuspense(UserAdmin),
          },
          // {
          //   path: "settings",
          //   element: withSuspense(Setting),
          // },
          {
            path: "*",
            element: withSuspense(Error404),
          },
        ],
      },
    ]
  },
  // {
  //   path: "admin/login",
  //   element: withSuspense(Login),
  // },
]