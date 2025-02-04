import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, isAxiosError } from 'axios';
import { SERVER_BASE_URL } from '@/constants/api';

export const apiRequester: AxiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

//기본 설정 넣고, header만 설정하는 로직이네
export const setRequestDefaultHeader = (requestConfig: AxiosRequestConfig) => {
  const config = requestConfig;
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json;charset=utf-8',
  };

  return config as InternalAxiosRequestConfig;
};

// const setRequestAuthorizationHeader = (requestConfig: AxiosRequestConfig) => {
//   const config = requestConfig;
//   config.headers = {
//     ...config.headers,
//   };
//   return config as InternalAxiosRequestConfig;
// };

apiRequester.interceptors.request.use((request) => {
  console.log('요청 url: ' + SERVER_BASE_URL + request.url);
  console.log('요청 header: ' + request.headers);

  setRequestDefaultHeader(request);

  // setRequestAuthorizationHeader(request);
  return request;
});

export const requesterErrorHandling = (error: Error) => {
  if (isAxiosError(error)) {
    console.log(error);
  }
};

apiRequester.interceptors.response.use(
  (response) => {
    // 응답 데이터를 그대로 반환
    return response;
  },
  (error) => {
    requesterErrorHandling(error);
    return Promise.reject(error);
  },
);
