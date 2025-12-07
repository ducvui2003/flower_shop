import { NavLink } from "@/components/nav-link/NavLink";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
type ProductPageProps = {
  children: ReactNode;
};

const ProductPage = () => {
  return (
    <div>
      <NavLink to={"/product/create"}>
        <Button>Create</Button>
      </NavLink>
    </div>
  );
};

export default ProductPage;
