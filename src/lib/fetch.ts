import axios from 'axios';
import CONFIG from '../config/config';
import { ApiType } from "../constants";
import { Buffer } from "buffer";
import querystring from "querystring";
import { CError, CErrorCodes } from "../utils/CError";
import * as _ from 'lodash';

interface FetchOption {
  url: string;
  method?: string;
  headers?: any;
  timeout?: number;
  body?: any;
  data?: any;
}

interface ExtraOption {
  withoutVersion?: any;
  timeout?: number;
}

interface Headers {
  "Content-Type"?: string;
  "Authorization"?: string;
  'BundleVersion'?: string;
}

// axios 配置
axios.defaults.timeout = 8000;
axios.defaults.headers.common['User-Agent'] = 'GithubViewer';

interface Response {
  status: number;
  data: any;
}

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('axios handle error: ', error);
    let response = {} as Response;
    response.status = _.get(error.response, 'status', -1)
    if (error.response) {
      console.log('error.response: ', error.response);
      const statusCode = _.get(error.response, 'status');
      let message: string;

      switch (statusCode) {
        case 400: message = '请求错误'; break;
        case 401: message = '用户登录验证错误'; break;
        case 403: message = '无权限操作'; break;
        case 404: message = '找不到资源'; break;
        case 500: message = '服务器出错了'; break;
        default: message = '其他错误'
      }
      
      const msgFromServer = _.get(error.response, 'data.error.message');
      if (msgFromServer) message = msgFromServer;
      
      if (message) {
        response.data = {
          error: {
            message: message
          }
        }
      } else {
        response.data = _.get(error.response, 'data');
      }
    } else if (error.message && error.message.indexOf('timeout') !== -1) {
      response.data = {
        error: {
          message: '网络超时！'
        }
      }
    } else {
      response.data = {
        error: {
          message: '网络错误请稍后重试！'
        }
      }
    }
    return Promise.reject(response);
  }
)

export async function getApi(url: string, token?: string) {
  let axiosOption: FetchOption = {
    url: url,
    method: 'GET',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  };

  if (token) {
    axiosOption.headers["Authorization"] = "Bearer " + token;
  }

  console.log('GETAPI axiosOption: ', axiosOption);
  // 使用Promise方法异步处理请求
  return await axios(axiosOption);
}

export async function postApi(url: string, token?: string, option?: any, dataType?: string) {
  let contentType,
    axiosOption: any,
    headers: Headers = {};
  if (dataType === ApiType.API_UPLOAD_FILE) {
    axiosOption = option;
  } else if (dataType === ApiType.API_JSON) {
    contentType = "application/json"
    axiosOption = JSON.stringify(option);
  } else {
    contentType = "application/x-www-form-urlencoded"
    axiosOption = querystring.stringify(option);
  }
  if (token) {
    headers = {
      "Content-Type": contentType,
      "Authorization": "Bearer " + token,
      'BundleVersion': CONFIG.APP_VERSION
    }
  } else {
    headers = {
      "Content-Type": contentType,
      'BundleVersion': CONFIG.APP_VERSION
    }
  }

  console.log('POSTTAPI URL: ', url);
  console.log('POSTTAPI axiosOption: ', axiosOption);
  return await axios.post(url, axiosOption, { headers });
}

export async function patchApi(url: string, token?: string, option?: any, dataType?: string) {
  let contentType,
    axiosOption: any,
    headers: Headers = {};
  if (dataType === ApiType.API_UPLOAD_FILE) {
    axiosOption = option;
  } else if (dataType === ApiType.API_JSON) {
    contentType = "application/json"
    axiosOption = JSON.stringify(option);
  } else {
    contentType = "application/x-www-form-urlencoded"
    axiosOption = querystring.stringify(option);
  }
  if (token) {
    headers = {
      "Content-Type": contentType,
      "Authorization": "Bearer " + token,
      'BundleVersion': CONFIG.APP_VERSION
    }
  } else {
    headers = {
      "Content-Type": contentType,
      'BundleVersion': CONFIG.APP_VERSION
    }
  }

  console.log('PATCHAPI URL: ', url);
  console.log('PATCHAPI axiosOption', axiosOption);
  return await axios.patch(url, axiosOption, { headers });
}

export async function deleteApi(url: string, token: string) {
  let axiosOption = {} as FetchOption;
  axiosOption.url = url;
  axiosOption.method = 'DELETE';

  if (token) {
    axiosOption.headers = {
      "Authorization": "Bearer " + token,
      'BundleVersion': CONFIG.APP_VERSION
    }
  } else {
    axiosOption.headers = {
      'BundleVersion': CONFIG.APP_VERSION
    }
  }
  return await axios(axiosOption);
}

// 登录获取 token
export async function getToken(url: string, info: any) {
  let axiosOption = {} as FetchOption;
  axiosOption.url = url;
  axiosOption.method = 'POST';
  axiosOption.data = `grant_type=${info.grant_type}&username=${info.username}&password=${info.password}&scope=${info.scope}`;
  axiosOption.headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Basic " + new Buffer(`${CONFIG.CLIENT.ID}:${CONFIG.CLIENT.SECRET}`).toString("base64"),
  }

  console.log("LOGIN opts", axiosOption);
  return await axios(axiosOption);
}

export async function refreshToken(url: string, token: string) {
  let axiosOption = {} as FetchOption;
  axiosOption.url = url;
  axiosOption.method = 'POST';
  axiosOption.data = `grant_type=refresh_token&refresh_token=${token}`;
  axiosOption.headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Basic " + new Buffer(`${CONFIG.CLIENT.ID}:${CONFIG.CLIENT.SECRET}`).toString("base64"),
  }

  console.log("REFRESH TOKEN opts", axiosOption);
  return await axios(axiosOption);
}
