import { authUtil } from "@/lib/auth.util";
import httpService from "@/lib/http/http.service";
import { Page, ResponseApi } from "@/lib/http/http.type";
import { Category } from "@/pages/product/type";
import { isAxiosError } from "axios";
import { LoaderFunctionArgs } from "react-router";

export async function productLoader({}: LoaderFunctionArgs) {
  authUtil.requireAuth();

  try {
    const resCategory =
      await httpService.get<ResponseApi<Page<Category>>>(`/category`);
    return {
      categories: resCategory.data.data.items,
    };
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response?.status === 404) {
        throw new Response("Product Not Found", { status: 404 });
      }
      if (e.response?.status === 401) {
        authUtil.logout();
        throw new Response("Unauthorized", { status: 401 });
      }
    }
    throw e;
  }
}
