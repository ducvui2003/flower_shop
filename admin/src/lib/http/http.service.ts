import appAxios, { manualAxios } from "@/lib/http/http-axios";
import { AxiosRequestConfig } from "axios";

const httpService = {
  get: <R>(url: string, config?: AxiosRequestConfig) => {
    return appAxios.get<R>(url, config);
  },
  post: <R, B>(url: string, body: B, config?: AxiosRequestConfig) => {
    return appAxios.post<R>(url, body, config);
  },
  put: <R, B>(url: string, body: B, config?: AxiosRequestConfig) => {
    return appAxios.put<R>(url, body, config);
  },
  patch: <R, B>(url: string, body: B, config?: AxiosRequestConfig) => {
    return appAxios.put<R>(url, body, config);
  },
  delete: <R>(url: string, config?: AxiosRequestConfig) => {
    return appAxios.delete<R>(url, config);
  },
  manual: () => {
    return manualAxios;
  },
};

export default httpService;
