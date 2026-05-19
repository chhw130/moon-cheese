import Axios from 'axios';
import type { ExchangeRate } from './types';

const axios = Axios.create();

export const http = {
  get: function get<Response = unknown>(url: string) {
    return axios.get<Response>(url).then(res => res.data);
  },
  post: function post<Request = any, Response = unknown>(url: string, data?: Request) {
    return axios.post<Response>(url, { data }).then(res => res.data);
  },
};

export const getCurrencyRate = async () => {
  return http.get<ExchangeRate>('/api/exchange-rate');
};
