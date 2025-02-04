import { requesterErrorHandling, setRequestDefaultHeader } from '@/api/requester';
import { SERVER_BASE_URL } from '@/constants/api';
import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

export const apiServerRequester: AxiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

const setRequestServerComponentHeader = (requestConfig: AxiosRequestConfig) => {
  const config = requestConfig;

  //서버 컴포넌트 api 호출 로직 추가
  const cookieStore = cookies();
  const session = cookieStore.get('JSESSIONID');
  console.log('session쿠키' + session);
  config.headers = {
    Cookie: session ? `JSESSIONID=${session.value}` : '',
  };

  return config as InternalAxiosRequestConfig;
};

apiServerRequester.interceptors.request.use((request) => {
  console.log('요청 url: ' + SERVER_BASE_URL + request.url);
  console.log('요청 header: ' + request.headers);

  setRequestDefaultHeader(request);
  setRequestServerComponentHeader(request);
  return request;
});

apiServerRequester.interceptors.response.use(
  (response) => {
    // 응답 데이터를 그대로 반환
    return response;
  },
  (error) => {
    requesterErrorHandling(error);
    return Promise.reject(error);
  },
);
