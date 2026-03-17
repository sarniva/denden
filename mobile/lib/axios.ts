import axios from "axios";
import { useAuth } from "@clerk/expo";
import { useEffect } from "react";
import * as Sentry from "@sentry/react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("Missing EXPO_PUBLIC_API_URL");
}

if (!__DEV__ && !API_URL.startsWith("https://")) {
  throw new Error("EXPO_PUBLIC_API_URL must use https in non-dev builds");
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useApi = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(async (config) => {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          Sentry.logger.error(
            Sentry.logger
              .fmt`API request failed: ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
            {
              status: error.response.status,
              endpoint: error.config?.url,
              method: error.config?.method,
            },
          );
        } else if (error.request) {
          Sentry.logger.warn("API request failed -- no response", {
            endpoint: error.config?.url,
            method: error.config?.method,
          });
        }
        return Promise.reject(error);
      },
    );
    //cleanup: remove interceptors when components unmounts
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [getToken]);

  return api;
};
