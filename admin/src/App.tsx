import { Admin } from "@/components/admin";
import ProductCreate from "@/components/product/ProductCreate";
import ProductList from "@/components/product/ProductList";
import { Flower2 } from "lucide-react";
import { Resource } from "ra-core";

function App() {
  return (
    <Admin>
      <Resource
        name="products"
        list={ProductList}
        create={ProductCreate}
        icon={Flower2}
      />
    </Admin>
  );
}

export default App;
