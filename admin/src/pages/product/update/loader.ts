import { Image, ProductEditing } from "@/components/data-table/product/type";
import httpService from "@/lib/http/http.service";
import { Page, ResponseApi } from "@/lib/http/http.type";
import { Category } from "@/pages/product/type";
import { isAxiosError } from "axios";
import { LoaderFunctionArgs } from "react-router";

export async function productLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Response("Invalid ID", { status: 400 });
  }

  try {
    const resProduct = await httpService.get<
      ResponseApi<
        ProductEditing & {
          description: string;
        }
      >
    >(`/admin/product/${id}`);
    const product = resProduct.data.data;
    let images;
    if (product.imageIds) {
      const resImages = await httpService.get<ResponseApi<Array<Image>>>(
        `/media-id?ids=${product.imageIds.join(",")}`,
      );
      images = resImages.data.data;
    }
    const resCategory =
      await httpService.get<ResponseApi<Page<Category>>>(`/category`);
    return {
      product: {
        ...product,
        description: JSON.parse(product.description),
        images: images,
      },
      categories: resCategory.data.data.items,
    };
  } catch (e) {
    if (isAxiosError(e)) {
      // 3. Handle non-existing resource
      if (e.code === "404") {
        throw new Response("Product Not Found", { status: 404 });
      }
    }
  }
}
