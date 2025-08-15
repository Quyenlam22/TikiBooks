import LayoutDefault from "../../layout/LayoutClient";
import { lazy } from "react";
import withSuspense from "../../utils/withSuspense";

const Home = lazy(() => import("../../pages/Home"));
const Error404 = lazy(() => import("../../pages/Error404"));
const DetailBook = lazy(() => import("../../pages/DetailBook"));
const Search = lazy(() => import("../../pages/Search"));
const Cart = lazy(() => import("../../pages/Cart"));
export const routesClient = [
  {
    path: "/",
    element: <LayoutDefault/>,
    children: [ 
      {
        index: true,
        element: withSuspense(Home)
      },
      {
        path: "book/:id",
        element: withSuspense(DetailBook)
      },
      {
        path: "search",
        element: withSuspense(Search)
      },
      {
        path: "cart",
        element: withSuspense(Cart)
      },
      {
        path: "*",
        element: withSuspense(Error404)
      },
    ]
  }
]