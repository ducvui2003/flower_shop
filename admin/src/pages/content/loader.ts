import { PageContentResponse } from "@/components/data-table/product/type";
import { authUtil } from "@/lib/auth.util";
import httpService from "@/lib/http/http.service";
import { ResponseApi } from "@/lib/http/http.type";
import { isAxiosError } from "axios";
import { LoaderFunctionArgs } from "react-router";

export async function contentLoader({ params }: LoaderFunctionArgs) {
  authUtil.requireAuth();

  const { page } = params;

  if (!page) {
    throw new Response("Invalid ID", { status: 400 });
  }

  try {
    const res = await httpService.get<ResponseApi<PageContentResponse>>(
      `/page/${page}`,
    );
    const data = res.data.data;

    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response?.status === 404) {
        throw new Response(`Page ${page}`, { status: 404 });
      }
      if (e.response?.status === 401) {
        authUtil.logout();
        throw new Response("Unauthorized", { status: 401 });
      }
      throw e;
    }
  }
}
