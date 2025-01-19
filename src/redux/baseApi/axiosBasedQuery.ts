import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  Method,
} from 'axios';
import { getPreloadedState } from '@/redux/getPreloadedState';
import { BASE_URL, ONE_HOUR_SECONDS, ONE_MONTH_SECONDS } from '@/config';
import { CookieType } from '@/enums';
import { setCookie } from 'cookies-next';

axios.interceptors.request.use(
  async (config) => {
    const token = getPreloadedState().auth.access_token;

    config.headers = {
      ...config.headers,
      ...(!!token && { Authorization: `Bearer ${token}` }),
    } as AxiosRequestHeaders;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error: AxiosError) => {
    const renewToken = getPreloadedState().auth.renew_token;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      renewToken
    ) {
      try {
        // Make a request to refresh the token
        const res = await axios.post(`${BASE_URL}/auth/renew-access-token`, {
          refresh_token: renewToken,
        });

        setCookie(CookieType.RENEW_TOKEN, res.data.token.refresh_token, {
          maxAge: ONE_MONTH_SECONDS,
        });

        setCookie(CookieType.TOKEN, res.data.token.access_token, {
          maxAge: ONE_HOUR_SECONDS,
        });

        // Update the token in your preloaded state

        // Retry the original request with the new token
      } catch (refreshError) {
        // Handle token refresh failure (optional)
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const axiosBaseQuery =
  ({
    baseUrl = '',
    baseHeaders = {},
  }: {
    baseUrl: string;
    baseHeaders?: AxiosRequestConfig['headers'];
  }): BaseQueryFn<
    {
      url: string;
      method: Method;
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    unknown
  > =>
  async ({ url, method, data, params, headers = {} }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        params,
        data,
        headers: { ...baseHeaders, ...headers },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          error: err.message,
          ...(typeof err.response?.data === 'object' ? err.response.data : {}),
        },
      };
    }
  };
