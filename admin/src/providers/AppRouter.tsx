import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CategoryPage from "@/pages/category/page";
import HomePage from "@/pages/home/page";
import { homeLoader } from "@/pages/home/loader";
import RootLayout from "@/pages/layout";
import MediaPage from "@/pages/media/page";
import ProductCreatePage from "@/pages/product/create/page";
import { productLoader } from "@/pages/product/update/loader";
import ProductPage from "@/pages/product/page";
import ProductUpdatePage from "@/pages/product/update/page";
import ContentPage from "@/pages/content/page";
import { contentLoader } from "@/pages/content/loader";
import NavigatorsPage from "@/pages/navigator/page";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        loader: homeLoader,
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
      {
        path: "content/:page",
        loader: contentLoader,
        element: <ContentPage />,
      },
      {
        path: "navigators",
        element: <NavigatorsPage />,
      },
      {
        path: "home",
        loader: homeLoader,
        element: <HomePage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
