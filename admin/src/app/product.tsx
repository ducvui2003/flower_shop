import { Resource } from "ra-core";
import type { ReactNode } from "react";

type ProductPageProps = {
  children: ReactNode;
};

const ProductPage = () => {
  return <Resource name="products" />;
};

export default ProductPage;
