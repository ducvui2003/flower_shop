import { Image, ProductEditing } from "@/components/data-table/product/type";
import httpService from "@/lib/http/http.service";
import { ResponseApi } from "@/lib/http/http.type";
import { isAxiosError } from "axios";
import { LoaderFunctionArgs } from "react-router";

export async function productLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Response("Invalid ID", { status: 400 });
  }

  try {
    const res = await httpService.get<ResponseApi<ProductEditing>>(
      `/admin/product/${id}`
    );
    const product = res.data.data;
    let images;
    if (product.imageIds) {
      const resImages = await httpService.get<ResponseApi<Array<Image>>>(
        `/media-id?ids=${product.imageIds.join(",")}`
      );
      images = resImages.data.data;
    }

    return {
      ...product,
      images: images,
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
