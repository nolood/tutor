import axios from "axios";
import { env } from "~/env";

export const api = axios.create({ baseURL: env.API_URL });

export const setTokenToHeaders = (token: string): void => {
  const newHeaders = {
    ...api.defaults.headers.common,
    Authorization: `Bearer ${token}`,
  };
  api.defaults.headers.common = { ...newHeaders };
};

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use((config) => {
  return config;
});
