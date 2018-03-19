import { AsyncStorage } from "react-native";
import { getApi } from "../lib/fetch";
import { ERROR_CODE_FROM_SERVER, API_URL } from "../constants/index";
import CONFIG from '../config/config';

interface BaseError {
  showMessage: string;
}

export class CError {
  code: number | string;
  showMessage?: string;
  baseError: BaseError;
  constructor(code: number = 10000, message?: string, baseError?: any) {
    if (!message) {
      if (baseError && baseError.showMessage) {
        message = baseError.showMessage;
      } else {
        message = getErrorDefaultText(code);
      }
    }
    this.code = code;
    this.showMessage = message;
    this.baseError = baseError || { error: "", errorCode: code, request: "" };
  }
}

var ErrorCodesFromServer: any = {};

export function initErrorCodeToMessage() {
  AsyncStorage.getItem(ERROR_CODE_FROM_SERVER)
    .then((errCodes: any) => {
      console.log("errCodes", errCodes);
      try {
        errCodes = JSON.parse(errCodes);
      } catch (e) {
        errCodes = {};
      }
      getApi(`${API_URL.ERROR_CODE_INIT}?version=${CONFIG.APP_VERSION}`)
        .then((res: any) => {
          if (res && typeof res === "object") {
            ErrorCodesFromServer = res;
            AsyncStorage.setItem(ERROR_CODE_FROM_SERVER, JSON.stringify(res));
          } else {
            if (errCodes && typeof errCodes === "object") {
              ErrorCodesFromServer = errCodes;
            }
          }
        })
        .catch(() => {
          if (errCodes && typeof errCodes === "object") {
            ErrorCodesFromServer = errCodes;
          }
        });
    });
}

export const DefaultErrors: any = {
  "10001": {
    "showMessage": "未知错误"
  },
  "10002": {
    "showMessage": "服务器出错"
  },
  "10003": {
    "showMessage": "服务器出错"
  },
  "10010": {
    "showMessage": "服务器出错"
  },
  "10013": {
    "showMessage": "错误的微博用户"
  },
  "10016": {
    "showMessage": "提交的内容有误"
  },
  "10017": {
    "showMessage": "提交的内容有误"
  },
  "10022": {
    "showMessage": "请求过于频繁"
  },
  "10023": {
    "showMessage": "请求过于频繁"
  },
  "10024": {
    "showMessage": "请求过于频繁"
  },
  "20003": {
    "showMessage": "用户不存在"
  },
  "20005": {
    "showMessage": "不支持的图片类型"
  },
  "20006": {
    "showMessage": "图片尺寸太大"
  },
  "20007": {
    "showMessage": "上传图片失败"
  },
  "20008": {
    "showMessage": "提交的内容有误"
  },
  "20012": {
    "showMessage": "文本内容过长"
  },
  "20013": {
    "showMessage": "文本内容过长"
  },
  "20016": {
    "showMessage": "请求过于频繁"
  },
  "20017": {
    "showMessage": "请勿提交重复的内容"
  },
  "20018": {
    "showMessage": "请勿包含广告或非法网址、内容"
  },
  "20019": {
    "showMessage": "请勿提交重复的内容"
  },
  "20020": {
    "showMessage": "请勿包含广告或非法网址、内容"
  },
  "20021": {
    "showMessage": "请勿包含广告或非法网址、内容"
  },
  "20022": {
    "showMessage": "所处网络环境异常"
  },
  "20032": {
    "showMessage": "发布成功，请稍等1-2分钟"
  },
  "20034": {
    "showMessage": "此微博帐号被微博锁定，请前去微博查看"
  },
  "21327": {
    "showMessage": "此微博授权已过期，请重新授权"
  },
  "21332": {
    "showMessage": "此微博授权已过期，请重新授权"
  },
  "21602": {
    "showMessage": "请勿包含广告或非法网址、内容"
  },
  "30001": {
    "showMessage": "获取微博用户信息失败"
  },
  "30005": {
    "showMessage": "图片下载失败"
  },
  "30006": {
    "showMessage": "获取微博用户信息失败"
  },
  "31001": {
    "showMessage": "找不到需要上传的图片"
  },
  "31002": {
    "showMessage": "上传图片失败"
  },
  "31003": {
    "showMessage": "获取短链接失败"
  },
  "31004": {
    "showMessage": "此朋友圈类型暂不支持"
  },
  "100000": {
    "showMessage": "未知错误"
  },
  "100001": {
    "showMessage": "网络连接超时"
  },
  "100002": {
    "showMessage": "用户名或密码错误"
  },
  "100003": {
    "showMessage": "服务器出错"
  },
  "100004": {
    "showMessage": "未登录"
  },
  "100005": {
    "showMessage": "网络连接出错"
  },
  "100006": {
    "showMessage": "AES加密出错"
  },
  "200001": {
    "showMessage": "微博认证出错"
  },
  "200002": {
    "showMessage": "此微博已被其他用户绑定"
  },
  "200003": {
    "showMessage": "此微博与待重新授权的微博不符"
  },
  "200004": {
    "showMessage": "获取微博帐号信息出错"
  },
  "200005": {
    "showMessage": "此微博已绑定，请更换微博后重试"
  },
  "200006": {
    "showMessage": "未知错误"
  },
  "-105": {
    "showMessage": "请求过于频繁"
  },
  "40032": {
    "showMessage": "下载图片错误"
  },
  "1040002": {
    "showMessage": "请求过于频繁"
  },
  "-100": {
    "showMessage": "此微博授权已过期，请重新授权"
  },
  "21301": {
    "showMessage": "认证失败,请重新授权"
  },
  "10014": {
    "showMessage": "应用的接口访问权限受限"
  },
  "20031": {
    "showMessage": "此微博授权已过期，请重新授权"
  },
  "500": {
    "showMessage": "服务器出错"
  }
};

function getErrorDefaultText(code: number | string) {
  if (code && code.toString() in ErrorCodesFromServer) {
    let err = ErrorCodesFromServer[code.toString()];
    if (err.showMessage) {
      return err.showMessage;
    }
  }
  if (code && code.toString() in DefaultErrors) {
    let err = DefaultErrors[code.toString()];
    if (err.showMessage) {
      return err.showMessage;
    }
  }
  return "未知错误！";
}

export const CErrorCodes = {
  Unknow: 100000,
  Base: {
    Timeout: 100001,
    InvalidGrant: 100002,
    ServerError: 100003,
    NoLocalUser: 100004,
    NetworkError: 100005,
    EncryptFailed: 100006
  },
  Weibo: {
    AuthError: 200001,
    BelongToOthers: 200002,
    WrongWeibo: 200003,
    GetInfoFailed: 200004,
    AlreadyBind: 200005,
    NoFailLogs: 200006
  },
  WeiboAPI: {
    SystemError: 10001,
    ServiceUnavailable: 10002,
    RemoteServiceError: 10003,
    JobExpired: 10010,
    InvalidWeiboUser: 10013,
    IPRequestsOutOfRateLimit: 10022,
    UserRequestOutOfRateLimit: 10023,
    UserRequestForSthOutOfRateLimit: 10024,

    UserDoesNotExists: 20003,
    ImageSizeTooLarge: 20006,
    TextTooLong140: 20012,
    TextTooLong300: 20013,
    OutOfLimit: 20016,
    RepeatContent: 20017,
    ContainIllegalWebsite: 20018,
    RepeatConetnt: 20019,
    ContainAds: 20020,
    ContentIllegal: 20021,
    IPBehaveUnruly: 20022,
    SuccessButServerSlow: 20032,
    ContainForbidWorld: 21602,

    MissRequiredParameter: 10016,
    ParameterValueInvalid: 10017,
    UnsupportedImageType: 20005,
    MultipartHasNoImage: 20007,
    ContentIsNull: 20008,
    AccountIsLocked: 20034,
    ExpiredToken: 21327,
    InvalidAccessToken: 21332,

    NoWeiboUser: 30001,
    DownloadImageFailed: 30005,
    ReturnWeiboDataNull: 30006,

    MediasNotFound: 31001,
    UploadImageFailed: 31002,
    GetShortenUrlFailed: 31003,
    UnsupportedWechatType: 31004
  }
};
