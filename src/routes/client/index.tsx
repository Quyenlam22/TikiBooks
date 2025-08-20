import LayoutDefault from "../../layout/LayoutClient";
import { lazy } from "react";
import withSuspense from "../../utils/withSuspense";
import LayoutOrderSuccess from "../../layout/LayoutOrder";
import PrivateRouteClient from "../../components/PrivateRouter/PrivateRouterClient";

const Home = lazy(() => import("../../pages/Home"));
const Error404 = lazy(() => import("../../pages/Error404"));
const DetailBook = lazy(() => import("../../pages/DetailBook"));
const Search = lazy(() => import("../../pages/Search"));
const Cart = lazy(() => import("../../pages/Cart"));
const Myprofit = lazy(() => import("../../pages/Myprofit"));
const AccountInfo = lazy(() => import("../../components/Myprofit/userinfor"));
const OrderDetailPage = lazy(() => import("../../components/Myprofit/myorder"));
const NotificationPage = lazy(() => import("../../components/Myprofit/myinform"));

const OrderSuccess = lazy(() => import("../../pages/OrderSuccess"));
const CheckOut = lazy(() => import("../../pages/CheckOut/CheckOut"));

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
        element: <PrivateRouteClient />,
        children: [
          {
            path: "cart",
            element: withSuspense(Cart)
          }
        ]
      },
      {
        path: "*",
        element: withSuspense(Error404)
      },
      {
        path: "myprofit/order/:id",
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
  },
  {
    element: <LayoutOrderSuccess />,
    children: [
      {
        index: true,
        element: withSuspense(OrderSuccess)
      },
      {
        path: "/order/:id",
        element: withSuspense(OrderSuccess)
      },
      {
        element: <PrivateRouteClient/>,
        children: [
          {
            path: "checkout",
            element: withSuspense(CheckOut)
          }
        ]
      }
    ]
  }
]