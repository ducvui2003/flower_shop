import {
  AutocompleteInput,
  BooleanInput,
  Create,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "@/components/admin";
import Editor from "@/components/Editor";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { required, useCreate } from "ra-core";
import { useForm } from "react-hook-form";
import { z } from "zod";

const productSchema = z.object({
  title: z.string().optional(),
  categoryId: z.string().optional(),
  isSale: z.boolean().optional(),
  basePrice: z.number().optional(),
  salePrice: z.number().optional(),
});
type ProductType = z.infer<typeof productSchema>;

const ProductCreate = () => {
  const form = useForm<ProductType>({
    mode: "onSubmit",
    resolver: zodResolver(productSchema),
  });

  const handleSubmit = async (data: ProductType) => {
    console.log(data);
  };

  return (
    <Create>
      <SimpleForm
        {...form}
        className="w-full max-w-none"
        onSubmit={handleSubmit}
      >
        <TextInput source="title" label="Title" validate={required()} />
        <ReferenceInput source="categoryId" reference="categories">
          <AutocompleteInput label="Category" />
        </ReferenceInput>
        <div className="flex gap-4 items-center">
          <NumberInput
            source="basePrice"
            label="Price"
            validate={required()}
            step={0.01}
          />
          <NumberInput
            source="salePrice"
            label="Price"
            validate={required()}
            step={0.01}
          />
          <BooleanInput source="isSale" label={"Active Sale"} />
        </div>
        <div>
          <Editor label={"Description"} source="description" />
        </div>
      </SimpleForm>
    </Create>
  );
};

export default ProductCreate;
