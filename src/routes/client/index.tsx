import LayoutDefault from "../../layout/LayoutClient";
import { lazy } from "react";
import withSuspense from "../../utils/withSuspense";

const Home = lazy(() => import("../../pages/Home"));
const Error404 = lazy(() => import("../../pages/Error404"));
const DetailBook = lazy(() => import("../../pages/DetailBook"));
const Search = lazy(() => import("../../pages/Search"));
const Myprofit = lazy(() => import("../../pages/Myprofit"));
const AccountInfo = lazy(() => import("../../components/Myprofit/userinfor"));
const OrderDetailPage = lazy(() => import("../../components/Myprofit/myorder"));
const NotificationPage = lazy(() => import("../../components/Myprofit/myinform"));

export const routesClient = [
  {
    path: "/",
    element: <LayoutDefault />,
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
        path: "*",
        element: withSuspense(Error404)
      },
      {
        path: "myprofit",
        element: withSuspense(Myprofit)
      },
      {
        path: "myprofit/userinfo",
        element: withSuspense(AccountInfo)
      },
      {
        path: "myprofit/order",
        element: withSuspense(OrderDetailPage)
      },
      {
        path: "myprofit/inform",
        element: withSuspense(NotificationPage)
      }
    ]
  }
]