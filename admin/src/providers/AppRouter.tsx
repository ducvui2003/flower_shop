import CategoryPage from "@/pages/category/page";
import HomePage from "@/pages/home/page";
import RootLayout from "@/pages/layout";
import MediaPage from "@/pages/media/page";
import ProductCreatePage from "@/pages/product/create/page";
import ProductPage from "@/pages/product/page";
import { BrowserRouter, Route, Routes } from "react-router";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="product">
            <Route index element={<ProductPage />} />
            <Route path="create" element={<ProductCreatePage />} />
          </Route>
          <Route path="category">
            <Route index element={<CategoryPage />} />
          </Route>
          <Route path="media" element={<MediaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
