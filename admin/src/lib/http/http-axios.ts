import envConfig from "@/config/env.config";
import {
  FieldError,
  ResponseApiError,
  ValidationError,
} from "@/lib/http/http.type";

import axios, { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
const appAxios = axios.create({
  baseURL: envConfig.BACKEND_URL,
  withCredentials: true,
});
const manualAxios = axios.create({
  baseURL: envConfig.BACKEND_URL,
  withCredentials: true,
});

appAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (err: AxiosError) => {
    const statusCode =
      err.response?.status ?? HttpStatusCode.InternalServerError;

    switch (statusCode) {
      // Check Error 422 (Error validation form)
      case HttpStatusCode.UnprocessableEntity: {
        const error = err as AxiosError<ResponseApiError>;
        const code: number =
          error.response?.data.code ?? HttpStatusCode.InternalServerError;
        const message: string = error.response?.data.message ?? "Server Error";
        const errors =
          error.response?.data.error.map(
            (e) =>
              ({
                field: e.field,
                message: e.message,
              } as FieldError)
          ) ?? [];
        return Promise.reject(
          new ValidationError({ code, message, error: errors })
        );
      }

      default:
        return Promise.reject(err);
    }
  }
);

export { manualAxios };
export default appAxios;
