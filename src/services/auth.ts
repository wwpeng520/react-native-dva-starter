// import { getToken, refreshToken } from "../lib/api";

import { getToken, refreshToken } from "../lib/fetch";
import { API_URL } from "../constants";
import CONFIG from '../config/config';

// 获取 token
export async function mGetToken(loginInfo: Object) {
  try {
    const res: any = await getToken(API_URL.TOKEN, loginInfo);
    if (res && res.data) return res.data;
    return null;
  } catch (e) {
    console.log('#### mGetToken ERROR ####', e);
    return e;
  }
}

// 更新 token
export async function mRefreshToken(token: string) {
  try {
    const res: any = await refreshToken(API_URL.TOKEN, token);
    if (res && res.data) return res.data;
    return null;
  } catch (e) {
    console.log('#### mRefreshToken ERROR ####', e);
    return e;
  }
}
