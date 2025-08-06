import LayoutDefault from "../layout/LayoutClient";
import { lazy } from "react";
import withSuspense from "../utils/withSuspense";

const Home = lazy(() => import("../pages/Home"));
const Error404 = lazy(() => import("../pages/Error404"));
const DetailBook = lazy(() => import("../pages/DetailBook"));

export const routes = [
  {
    path: "/",
    element: <LayoutDefault/>,
    children: [
      {
        path: "/*",
        element: withSuspense(Error404)
      },
      {
        index: true,
        element: withSuspense(Home)
      },
      {
        path: "/book/:id",
        element: withSuspense(DetailBook)
      },
    ]
  }
]