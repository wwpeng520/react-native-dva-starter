import querystring from "querystring";
import * as FETCH from '../lib/fetch';
import { requestWithToken } from "../lib/request-with-token";
import { DataUseType, API_URL } from "../constants";
const {
  DATA_GET_ALL,
  DATA_POST,
  DATA_GET,
  DATA_DELETE,
  DATA_PATCH,
  DATA_SEARCH,
  DATA_COUNT
} = DataUseType;

// 解析出请求的 url 地址
function getUrl(type: string, dataName: string, tail?: string | number) {
  let baseUrl = "";
  if (dataName.startsWith("http://") || dataName.startsWith("https://")) {
    baseUrl = dataName;
  } else {
    baseUrl = `${API_URL.DATA_API_URL}/${dataName}`;
  }
  switch (type) {
    case DATA_GET_ALL:
    case DATA_POST: {
      return baseUrl
    }
    case DATA_SEARCH: {
      return `${baseUrl}/query`
    }
    case DATA_COUNT: {
      return `${baseUrl}/count`
    }
    case DATA_GET:
    case DATA_DELETE:
    case DATA_PATCH: {
      return `${baseUrl}/${tail ? tail.toString() : ""}`; //`${baseUrl}/${dataId}`;
    }
    default:
      return "";
  }
}

export async function getApiWithStoredToken(url: string) {
  return requestWithToken((token: string) => FETCH.getApi(url, token));
}

export async function postApiWithStoredToken(url: string, data: Object, dataType?: string) {
  return requestWithToken((token: string) => FETCH.postApi(url, token, data, dataType));
}

export async function patchApiWithStoredToken(url: string, data: Object, dataType?: string) {
  return requestWithToken((token: string) => FETCH.patchApi(url, token, data, dataType));
}

export async function deleteApiWithStoredToken(url: string) {
  return requestWithToken((token: string) => FETCH.deleteApi(url, token));
}

// 获取用户信息
// export async function getUserData(token?: string) {
//   if (token) {
//     const userInfo: any = await FETCH.getApi(API_URL.USER_PROFILE_URL, token);
//     if (!userInfo) {
//       return Promise.reject(new Error("no user"));
//     }
//     userInfo["token"] = token;
//     return userInfo;
//   }
//   return getApiWithStoredToken(API_URL.USER_PROFILE_URL);
// }

// 修改用户信息
export function patchUserData(data: Object, dataType?: string) {
  return patchApiWithStoredToken(API_URL.USER_PROFILE_URL, data, dataType);
}

export async function getData(dataName: string) {
  const url = getUrl(DATA_GET_ALL, dataName);
  const result: any = await getApiWithStoredToken(url);
  return result;
}

// url 上带 &page_size=10&... 参数形式的请求
export async function getDataWithParams(dataName: string, option: Object, apiUrl?: string) {
  const url = apiUrl || getUrl(DATA_GET_ALL, dataName);
  let fullUrl;
  const params = querystring.stringify(option);
  if (params) {
    fullUrl = `${url}?${params}`;
  } else {
    fullUrl = url;
  }
  try {
    const res = await getApiWithStoredToken(fullUrl);
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
}

// 请求 type/:id/subtype 形式的 api
export async function getSubData(dataName: string, subDataId: number | string, subType?: string) {
  let url;
  if (subType) {
    url = getUrl(DATA_GET, dataName) + `${subDataId}/${subType}`;
  } else {
    url = getUrl(DATA_GET, dataName) + `${subDataId}`;
  }
  return getApiWithStoredToken(url);
}

export function postData(dataName: string, data: any, dataType?: string, token?: string) {
  const url = getUrl(DATA_POST, dataName);
  if (!token) {
    return postApiWithStoredToken(url, data, dataType);
  } else {
    return FETCH.postApi(url, token, data, dataType);
  }
}

export async function deleteData(dataName: string, dataId: string | number) {
  const url = getUrl(DATA_DELETE, dataName, dataId);
  return deleteApiWithStoredToken(url);
}

// tail可以是id，也可以是字符串
// eg: tweet/:tweetId OR tweet/:tweetId/task/:taskId
export async function patchData(dataName: string, data: any, dataType?: string, tail?: number | string) {
  const url = getUrl(DATA_PATCH, dataName, tail);
  return patchApiWithStoredToken(url, data, dataType);
}

export async function searchData(dataName: string, query: Object, limit?: number) {
  interface Data {
    query: string;
    limit?: number;
  }
  let url = getUrl(DATA_SEARCH, dataName);
  let data: Data = {
    query: JSON.stringify(query)
  };
  if (limit && limit > 0) {
    data.limit = limit;
  }
  return getApiWithStoredToken(url);
}

export async function countData(dataName: string, query: Object) {
  let url = getUrl(DATA_COUNT, dataName);
  let data = {
    query: JSON.stringify(query)
  };
  return postApiWithStoredToken(url, data);
}
