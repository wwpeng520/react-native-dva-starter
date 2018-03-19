/**
 * 处理登录注册等用户相关请求
 */

import * as AuthAPI from "./auth";
import * as DataAPI from "./data";
import tokenStore from "../lib/token";
import { CError, CErrorCodes } from "../utils/CError";
import { DataName, Scope, API_URL, ApiType } from "../constants";
import CONFIG from '../config/config';
import { Platform } from 'react-native';
import * as _ from 'lodash';

// 获取个人信息
export async function getUserInfo() {
  try {
    return await DataAPI.getData(DataName.USER_PROFILE);
  } catch (e) {
    console.log('SERVICES initUserDataWithToken ERROR:', e);
    return e;
  }
}

// 用户密码或验证码登录
export async function signin(loginInfo: Object) {
  try {
    const result = await AuthAPI.mGetToken(loginInfo);
    console.log("SERVICES LOGIN result: ", result);
    // console.log("SERVICES LOGIN loginInfo: ", loginInfo);
    if (_.get(result, 'status') === 400 && _.get(result, 'data.error_description') === "Invalid grant: user credentials are invalid") {
      const data = {
        status: 400,
        error: {
          message: '用户名或密码错误'
        }
      }
      return data;
    } else if (result && !result.access_token) {
      return result
    }

    // 保存 token 到本地
    tokenStore.storeSessionToken({
      accessToken: result.access_token,
      refreshToken: result.refresh_token
    });
    tokenStore.storeSessionUserPhone(_.get(loginInfo, 'username'));

    return getUserInfo();
  } catch (e) {
    console.log('SERVICES LOGIN ERROR: ', e);
    return e;
  }
}

// 用户登出
export async function logout() {
  try {
    await tokenStore.deleteSessionToken();
    return true;
  } catch (e) {
    console.log('SERVICES LOGIN ERROR: ', e);
    return e;
  }
}

// 发送注册验证码
export async function sendSignupVerifyCode(phone: string) {
  try {
    return await DataAPI.postData(DataName.VERIFY_CODE, {
      phone: phone,
      type: Scope.SMS_REGISTER
    });
  } catch (e) {
    console.log('SERVICE sendSignupVerifyCode error: ', e);
    return e;
  }
}

// 发送登录验证码
export async function sendLoginVerifyCode(phone: string) {
  try {
    return await DataAPI.postData(DataName.VERIFY_CODE, {
      phone: phone,
      type: Scope.SMS_LOGIN
    });
  } catch (e) {
    console.log('SERVICE sendLoginVerifyCode error: ', e);
    return e;
  }
}

// 发送修改手机号验证码
export async function sendPatchPhoneVerifyCode(phone: string) {
  try {
    return await DataAPI.postData(DataName.VERIFY_CODE, {
      phone: phone,
      type: Scope.PATCH_PHONE
    });
  } catch (e) {
    console.log('SERVICE sendPatchPhoneVerifyCode error: ', e);
    return e;
  }
}

// 注册
export async function signup(signupInfo: any) {
  try {
    return await DataAPI.postData(DataName.USER, signupInfo);
  } catch (e) {
    console.log('SERVICES SIGNUP ERROR:', e);
    return e;
  }
}

// 重置密码
export async function resetPassword(resetObj: Object) {
  try {
    return await DataAPI.patchApiWithStoredToken(API_URL.CHANGE_PWD_URL, resetObj, ApiType.API_JSON);
  } catch (e) {
    console.log('SERVICES RESET PWD ERROR:', e)
    return e;
  }
}

// 修改个人信息
export async function editUserInfo(newInfo: Object) {
  try {
    return await DataAPI.patchUserData(newInfo, ApiType.API_JSON);
  } catch (e) {
    console.log('SERVICES editUserInfo ERROR:', e)
    return e;
  }
}

// 获取个人会员信息
// export function getMembership() {
//   return DataAPI.getApiWithStoredToken(API_URL.USER_MEMBERSHIP_URL);
// }

// 初始化调用
export async function init() {
  try {
    return await DataAPI.postData(DataName.USER_INIT, {
      lastVersion: CONFIG.APP_VERSION,
      deviceInfo: {
        os: Platform.OS
      }
    }, ApiType.API_JSON);
  } catch (e) {
    console.log('SERVICES user init ERROR:', e);
    return e;
  }
}

// 签到
export async function checkin() {
  try {
    return await DataAPI.getData(DataName.USER_CKENCKIN);
  } catch (e) {
    console.log('SERVICES checkin ERROR:', e);
    return e;
  }
}
