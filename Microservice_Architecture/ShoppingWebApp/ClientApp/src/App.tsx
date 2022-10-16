import "./App.scss";
import { Layout } from "./Components/Layout/Layout";
import { Index } from "./Pages/Index/Index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Cart } from "./Pages/Cart/Cart";
import { CheckOut } from "./Pages/CheckOut/CheckOut";
import { Confirmation } from "./Pages/Confirmation/Confirmation";
import { Contact } from "./Pages/Contact/Contact";
import { Order } from "./Pages/Order/Order";
import { ProductPage } from "./Pages/Product/Product";
import { ProductDetail } from "./Pages/ProductDetail/ProductDetail";
import { BasketContext, useBasketProvider } from "./Services/BasketService";
import { catalogLoader } from "./Services/catalogLoader";
import { orderLoader } from "./Services/orderLoader";

const index = true;
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index,
        element: <Index />,
        loader: catalogLoader,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <CheckOut />,
      },
      {
        path: "confirmation",
        element: <Confirmation />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "order",
        element: <Order />,
        loader: orderLoader
      },
      {
        path: "product",
        children: [
          {
            index,
            element: <ProductPage />,
            loader: catalogLoader,
          },
          {
            path: ":productId",
            element: <ProductDetail />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const basketModel = useBasketProvider();
  return (
    <BasketContext.Provider value={basketModel}>
      <RouterProvider router={router} />
    </BasketContext.Provider>
  );
}

export default App;
