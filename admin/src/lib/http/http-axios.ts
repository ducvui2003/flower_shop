import envConfig from "@/config/env.config";
import { tokenService } from "@/lib/token.service";
import {
  FieldError,
  ResponseApiError,
  ValidationError,
} from "@/lib/http/http.type";

import axios, { AxiosError, AxiosResponse, HttpStatusCode } from "axios";

let isRedirecting = false;

const appAxios = axios.create({
  baseURL: envConfig.BACKEND_URL,
  withCredentials: true,
});
const manualAxios = axios.create({
  baseURL: envConfig.BACKEND_URL,
  withCredentials: true,
});

// Request interceptor to add token to headers
appAxios.interceptors.request.use(
  (config) => {
    const accessToken = tokenService.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

appAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (err: AxiosError) => {
    const statusCode =
      err.response?.status ?? HttpStatusCode.InternalServerError;

    switch (statusCode) {
      // Check Error 401 (Unauthorized - token expired)
      case HttpStatusCode.Unauthorized: {
        const refreshToken = tokenService.getRefreshToken();
        if (refreshToken && err.config) {
          try {
            const response = await manualAxios.post<{
              data: {
                access: { token: string };
                refresh: { token: string };
              };
            }>("/auth/refresh", {
              refreshToken,
            });

            const newAccessToken = response.data.data.access.token;
            const newRefreshToken = response.data.data.refresh.token;

            tokenService.saveTokens(newAccessToken, newRefreshToken);

            // Retry the original request with new token
            err.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return appAxios(err.config);
          } catch (refreshError) {
            // Refresh failed, clear tokens and redirect to login
            if (!isRedirecting) {
              isRedirecting = true;
              tokenService.removeTokens();
              window.location.href = "/login";
            }
            return Promise.reject(refreshError);
          }
        } else {
          // No refresh token or config, redirect to login
          if (!isRedirecting) {
            isRedirecting = true;
            tokenService.removeTokens();
            window.location.href = "/login";
          }
          return Promise.reject(err);
        }
      }

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
              }) as FieldError,
          ) ?? [];
        return Promise.reject(
          new ValidationError({ code, message, error: errors }),
        );
      }

      default:
        return Promise.reject(err);
    }
  },
);

export { manualAxios };
export default appAxios;
