import { authUtil } from "@/lib/auth.util";
import httpService from "@/lib/http/http.service";
import { ResponseApi } from "@/lib/http/http.type";
import { isAxiosError } from "axios";
import { LoaderFunctionArgs } from "react-router";

type PageSection = {
  id: number;
  type: "banner" | "category_slider" | "category_product_section";
  position: number;
  config: {
    mediaIds?: number[];
    title?: string;
    categoryIds?: number[];
    categories?: Array<{
      id: number;
      title: string;
      productIds: number[];
    }>;
  };
  isActive: boolean;
  pageId: number;
};

type HomePageResponse = PageSection[];

export async function homeLoader(_: LoaderFunctionArgs) {
  authUtil.requireAuth();

  try {
    const res =
      await httpService.get<ResponseApi<HomePageResponse>>("/page/home/config");
    return res.data.data;
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response?.status === 404) {
        throw new Response("Home page", { status: 404 });
      }
      if (e.response?.status === 401) {
        authUtil.logout();
        throw new Response("Unauthorized", { status: 401 });
      }
      throw e;
    }
  }
}

export type { HomePageResponse, PageSection };
