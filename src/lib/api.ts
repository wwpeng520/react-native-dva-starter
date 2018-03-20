/**
 * 已废弃，用 fetch.ts 代替
 */

import querystring from "querystring";
import { Buffer } from "buffer";
import { CError, CErrorCodes } from "../utils/CError";
import { ApiType } from "../constants";
import CONFIG from '../config/config';
import axios from 'axios';

const defaultTimeout = 8000; // 默认超时请求时间

interface Option {
  withoutVersion?: any;
  timeout?: number;
}
// interface Headers {
//   Authorization?: string;
//   BundleVersion?: string;
//   ['Content-Type']?: string;
// }
interface FetchData {
  method?: string;
  headers?: any;
  body?: any;
}

export async function getApi(url: string, token?: string, isNeedHeader?: boolean, option?: Option) {
  // console.log(url, token, isNeedHeader, option);
  let fetchData = {} as FetchData;
  // fetchData.method = 'GET';
  fetchData.headers = {};
  if (token) {
    fetchData.headers["Authorization"] = "Bearer " + token;
  } else {  // 无需登录获取到数据
    fetchData.headers["Authorization"] = "Bearer anonymous";
  }
  if (!option || !option.withoutVersion) {
    fetchData.headers["BundleVersion"] = CONFIG.APP_VERSION;
  }
  let timeout = defaultTimeout;
  if (option && option.timeout) {
    timeout = option.timeout;
  }
  console.log('### tbq-test ###');
  console.log('GETAPI### fetchData', fetchData);
  console.log('GETAPI### url', url);

  try {
    // const response: any = await _fetch(fetch(url, fetchData), timeout);
    // const json: any = await response.json();

    const response: any = await _fetch(axios.get(url, fetchData), timeout);
    // console.log(response, json);
    if (response.status === 201 || response.status === 200) {
      if (isNeedHeader) {
        return {
          data: response.data,
          headers: response.headers
        };
      } else {
        return response.data;
      }
    } else {
      return Promise.reject(response);
    }
  } catch (e) {
    console.log('GETAPI error => ', e);
    return null;
  }
}

export async function postApi(url: string, token?: string, data?: any, dataType?: string, option?: Option) {
  let fetchData = {} as FetchData;
  fetchData.method = 'POST';
  fetchData.headers = {};
  if (dataType === ApiType.API_UPLOAD_FILE) {
    fetchData.body = data;
    fetchData.headers = data.getHeaders();
  } else if (dataType === ApiType.API_JSON) {
    fetchData.headers = {
      "Content-Type": "application/json"
    };
    fetchData.body = JSON.stringify(data);
  } else {
    fetchData.headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    fetchData.body = querystring.stringify(data);
  }
  if (token) {
    fetchData.headers.Authorization = "Bearer " + token;
  }

  if (!option || !option.withoutVersion) {
    fetchData.headers["BundleVersion"] = CONFIG.APP_VERSION;
  }
  let timeout = defaultTimeout;
  if (option && option.timeout) {
    timeout = option.timeout;
  }
  console.log('POSTAPI### url', url);
  console.log('POSTAPI### fetchData', fetchData);

  try {
    const response: any = await _fetch(fetch(url, fetchData), timeout);
    const json: any = await response.json();

    // const response: any = await _fetch(axios.post(url, fetchData), timeout);

    // console.log(response);
    if (response.status === 201 || response.status === 200) {
      return json;
    } else {
      return Promise.reject(json);
    }
  } catch (e) {
    console.log('POSTAPI error => ', e);
    return null;
  }
}

export async function patchApi(url: string, token?: string, data?: any, dataType?: string, option?: Option) {
  let fetchData = {} as FetchData;
  fetchData.method = 'PATCH';
  fetchData.headers = {};
  if (dataType && dataType === ApiType.API_UPLOAD_FILE) {
    fetchData.body = data;
    fetchData.headers = data.getHeaders();
  } else if (dataType === ApiType.API_JSON) {
    fetchData.headers = {
      "Content-Type": "application/json"
    };
    fetchData.body = JSON.stringify(data);
  } else {
    fetchData.headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    fetchData.body = querystring.stringify(data);
  }
  if (token) {
    fetchData.headers.Authorization = "Bearer " + token;
  }

  if (!option || !option.withoutVersion) {
    fetchData.headers["BundleVersion"] = CONFIG.APP_VERSION;
  }

  let timeout = defaultTimeout;
  if (option && option.timeout) {
    timeout = option.timeout;
  }

  console.log('PATCHAPI ### url', url);
  console.log('PATCHAPI ### fetchData', fetchData);
  try {
    const response: any = await _fetch(fetch(url, fetchData), timeout);
    const json: any = await response.json();
    // console.log(response, json);
    if (response.status === 201 || response.status === 200) {
      return json;
    } else {
      return Promise.reject(json);
    }
  } catch (e) {
    console.log('PATCH error => ', e);
    return null;
  }
}

export async function deleteApi(url: string, token: string, option?: Option) {
  let fetchData = {} as FetchData;
  fetchData.method = 'DELETE';
  fetchData.headers = {
    Authorization: "Bearer " + token
  };

  if (!option || !option.withoutVersion) {
    fetchData.headers["BundleVersion"] = CONFIG.APP_VERSION;
  }

  let timeout = defaultTimeout;
  if (option && option.timeout) {
    timeout = option.timeout;
  }
  try {
    const response: any = await _fetch(fetch(url, fetchData), timeout);
    const json: any = await response.json();
    // console.log(response, json);
    if (response.status === 201 || response.status === 200) {
      return json;
    } else {
      return Promise.reject(json);
    }
  } catch (e) {
    console.log('DELETE error => ', e);
    return null;
  }
}

export function _fetch(fetch_promise: any, timeout: number) {
  let abort_fn: any = null;

  //这是一个可以被reject的promise
  let abort_promise = new Promise(function (resolve, reject) {
    abort_fn = function () {
      reject(new CError(CErrorCodes.Base.Timeout));
    };
  });

  //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
  let abortable_promise = Promise.race([
    fetch_promise,
    abort_promise
  ]);

  setTimeout(function () {
    abort_fn();
  }, timeout);

  return abortable_promise;
}

// 登录获取 token
export async function getToken(url: string, config?: any, info?: any) {
  let opts = {
    method: "post",
    headers: {
      "Authorization": "Basic " + new Buffer(`${config.clientID}:${config.clientSecret}`).toString("base64"),
      // "Authorization": "Basic Og==",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `grant_type=${info.grant_type}&username=${info.username}&password=${info.password}&scope=${info.scope}`
  };
  console.log("LOGIN url", url);
  console.log("LOGIN opts", opts);
  try {
    const response: any = await _fetch(fetch(url, opts), defaultTimeout);
    const json: any = await response.json();
    // console.log(response, json);
    if (response.status === 201 || response.status === 200) {
      return json;
    } else {
      const error = json ? new CError(CErrorCodes.Base.InvalidGrant) : new CError(CErrorCodes.Base.ServerError);
      return Promise.reject(error);
    }
  } catch (e) {
    console.log('GET TOKEN error => ', e);
    return null;
  }
}

export async function refreshToken(url: string, config?: any, token?: string) {
  let opts = {
    method: "post",
    headers: {
      "Authorization": "Basic " + new Buffer(`${config.clientID}:${config.clientSecret}`).toString('base64'),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `grant_type=refresh_token&refresh_token=${token}`
  };
  try {
    const response: any = await _fetch(fetch(url, opts), defaultTimeout);
    const json: any = await response.json();
    // console.log(response, json);
    if (response.status === 201 || response.status === 200) {
      return json;
    } else {
      const error = json ? new CError(CErrorCodes.Base.InvalidGrant) : new CError(CErrorCodes.Base.ServerError);
      return Promise.reject(error);
    }
  } catch (e) {
    console.log('REFRESH TOKEN error => ', e);
    return null;
  }
}
