import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import queryString from 'query-string'; 
import { IndexedObject } from 'utils/types';

const axiosClient = axios.create({ 
  baseURL: 'https://opentdb.com', 
  headers: { 
      'content-type': 'application/json', 
  }, 
  paramsSerializer: (params : IndexedObject) => queryString.stringify(params)
});

const onRequestSuccess = (config: AxiosRequestConfig) => {
  return config;
};

const onResponseSuccess = (response: AxiosResponse) => response

const onResponseError = (err: IndexedObject) => {
  return Promise.reject(err);
};

axiosClient.interceptors.request.use(onRequestSuccess);
axiosClient.interceptors.response.use(onResponseSuccess, onResponseError);

export default axiosClient;
