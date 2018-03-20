import { Platform } from "react-native";
import CONFIG from '../config/config';
const keyMirror = require('key-mirror');

const API_HOST = CONFIG.API_HOST;

export const ERROR_CODE_FROM_SERVER = "ERROR_CODE_FROM_SERVER";
export const DEFAULT_PAGE_SIZE = 10;
export const LAST_CURSOR_INIT = "init";
export const NATIVE_UPDATE_INFO = "NATIVE_UPDATE_INFO";

function getAppDocWebUrl(key: string): string {
  return API_HOST + "/app/doc/" + key;
}

function getAppWebUrl(key: string): string {
  return API_HOST + "/app/" + key;
}

// function getAppDocWebUrl(key: string): string {
//   return 'http://192.168.0.102:8080/' + key + ".html";
// }

const apiHost = "http://api.xxx.com"; // api2.xxx.com:60010

function getStaticWebUrl(key: string, type: string = '') {
    if (type) {
        return apiHost + "/static/" + key + `/${type}.html`;
    }
    return apiHost + "/static/" + key + "/index.html";
}

function getShUrl(): string {
  return API_HOST + "/config/" + Platform.OS + "_" + CONFIG.APP_VERSION + "_sh";
}

export const ApiType = keyMirror({
  API_UPLOAD_FILE: null,
  API_JSON: null,
  API_FORM_WWW: null
});

export const VerifyCodeType = {
  LOGIN: "login",
  REGISTER: "register",
  WECHAT: "wechat"
};

export const Scope = {
  LOGIN: "login",
  PASSWORD: "password",
  SMS: "sms",
  PASSWORD_LOGIN: "password_login",
  SMS_LOGIN: "sms_login",
  ENCRYPTED_LOGIN: "encrypted_login",
  REGISTER: "register",
  SMS_REGISTER: "sms_register",
  PATCH_PHONE: "patch_phone",
};

// get/post/patch/delete 等api请求类型
export const DataUseType = keyMirror({
  DATA_GET_ALL: null,
  DATA_GET: null,
  DATA_DELETE: null,
  DATA_PATCH: null,
  DATA_POST: null,
  DATA_SEARCH: null,
  DATA_COUNT: null,
});

// 保存数据到本地
export const StoreKey = keyMirror({
  SESSION_TOKEN_KEY: null,
  NEW_SESSION_TOKEN_KEY: null,
  SESSION_SIGN_CHECK: null,
  SESSION_USER_PHONE: null,
});

export const DataName = {
  WEIBO_LOGIN: "weiboUser/create",
  USER_INIT_DATA: "user/initData",
  
};

// API 请求地址
export const API_URL = {
  
};
