import ProductDataTable from "@/components/data-table/product/page";
import { NavLink } from "@/components/nav-link/NavLink";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { ReactNode } from "react";
type ProductPageProps = {
  children: ReactNode;
};

const ProductPage = () => {
  return (
    <div className="p-5">
      <div className="mb-5 flex ">
        <h2 className="text-2xl font-bold">Product</h2>
        <div className="ml-auto gap-3 flex items-center">
          <Button>
            <RefreshCcw />
          </Button>
          <NavLink to={"/product/create"}>
            <Button>Create</Button>
          </NavLink>
        </div>
      </div>

      <ProductDataTable />
    </div>
  );
};

export default ProductPage;
