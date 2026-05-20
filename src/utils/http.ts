import Axios from 'axios';
import type { GradePoint, UserInfo } from './types/user';
import type { CurrencyRate } from './types/currency';
import type { RecentPurchaseProductSchema } from './types/product';

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
  return http.get<CurrencyRate>('/api/exchange-rate');
};

export const getUserInfo = async () => {
  return http.get<UserInfo>('/api/me');
};

export const getGradePointList = async () => {
  return http.get<GradePoint>('/api/grade/point');
};

export const getRecentPurchaseProducts = async () => {
  return http.get<RecentPurchaseProductSchema>('/api/recent/product/list');
};
