import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "@/components/ProtectedRoute";
import CategoryPage from "@/pages/category/page";
import HomePage from "@/pages/home/page";
import { homeLoader } from "@/pages/home/loader";
import RootLayout from "@/pages/layout";
import MediaPage from "@/pages/media/page";
import ProductCreatePage from "@/pages/product/create/page";
import { productUpdateLoader } from "@/pages/product/update/loader";
import ProductPage from "@/pages/product/page";
import ProductUpdatePage from "@/pages/product/update/page";
import ContentPage from "@/pages/content/page";
import { contentLoader } from "@/pages/content/loader";
import NavigatorsPage from "@/pages/navigator/page";
import { productLoader } from "@/pages/product/create/loader";
import LoginPage from "@/pages/login/page";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            index: true,
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
                loader: productLoader,
                element: <ProductCreatePage />,
              },
              {
                path: "update/:id",
                loader: productUpdateLoader,
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
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
