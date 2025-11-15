import { DataTable, List } from "@/components/admin";

const ProductList = () => {
  return (
    <List>
      <DataTable rowClick="edit">
        <DataTable.Col source="id" />
        <DataTable.Col source="name" />
        <DataTable.Col source="price.base" />
        <DataTable.Col source="price.sale" />
        <DataTable.Col source="thumbnail" />
        <DataTable.Col source="createdAt" />
      </DataTable>
    </List>
  );
};

export default ProductList;
