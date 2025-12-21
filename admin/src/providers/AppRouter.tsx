import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CategoryPage from "@/pages/category/page";
import HomePage from "@/pages/home/page";
import RootLayout from "@/pages/layout";
import MediaPage from "@/pages/media/page";
import ProductCreatePage from "@/pages/product/create/page";
import { productLoader } from "@/pages/product/update/use-loader";
import ProductPage from "@/pages/product/page";
import ProductUpdatePage from "@/pages/product/update/page";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "product",
        children: [
          {
            index: true,
            element: <ProductPage />,
          },
          {
            path: "create",
            element: <ProductCreatePage />,
          },
          {
            path: "update/:id",
            loader: productLoader,
            element: <ProductUpdatePage />,
          },
        ],
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "media",
        element: <MediaPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
