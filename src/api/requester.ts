import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, isAxiosError } from 'axios';
// import { getAccessToken } from '@/main/services/helper/member/member.ts';
export const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const apiRequester: AxiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 5000,
});

//기본 설정 넣고, header만 설정하는 로직이네
const setRequestDefaultHeader = (requestConfig: AxiosRequestConfig) => {
  const config = requestConfig;
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json;charset=utf-8',
  };
  return config as InternalAxiosRequestConfig;
};
const setRequestAuthorizationHeader = (requestConfig: AxiosRequestConfig) => {
  const config = requestConfig;
  config.headers = {
    ...config.headers,
  };
  return config as InternalAxiosRequestConfig;
};

apiRequester.interceptors.request.use((request) => {
  setRequestDefaultHeader(request);
  setRequestAuthorizationHeader(request);
  return request;
});

apiRequester.interceptors.response.use(
  (response) => {
    // 응답 데이터를 그대로 반환
    return response;
  },
  (error) => {
    if (isAxiosError(error)) {
      console.group(
        '에러다.----------------------------------------------------------------------------------------------------------------------------------------',
      );
      console.log('요청 url: ' + error.request._url);
      console.log(error);
      console.log(error.response?.data);
      console.log('요청 header: ' + error.config?.headers);
      // console.log(error.request);
      console.log(
        '에러끝.----------------------------------------------------------------------------------------------------------------------------------------',
      );
      console.groupEnd();
    }
    return Promise.reject(error);
  },
);
