import { NavigationActions } from 'react-navigation';
import tokenStore from "../lib/token";
import { Toast } from 'antd-mobile';
import * as _ from 'lodash';
import * as DataAPI from "../services/data";
import { DataName, Scope, API_URL, ApiType } from "../constants";
const store = require('react-native-simple-store');
import { StoreKey } from "../constants";

// 跳转下一个页面时需要用户已登录，未登录时先跳转该页面，然后push一个登录页面，登录后返回该页面（可能需要重新请求API）
export async function navigateAction(userInStore: string | undefined, nextPage: string, params?: any) {
  // console.log('getIfIsLogged:', userInStore, nextPage, params);
  if (userInStore) {
    // return [NavigationActions.navigate({ routeName: nextPage, params })];
    return [{ page: nextPage, params }];
  } else {
    try {
      const token = await tokenStore.getSessionToken();
      if (token && token.accessToken) {
        // return [NavigationActions.navigate({ routeName: nextPage, params })];
        return [{ page: nextPage, params }];
      } else {
        // Toast.info('您还未登录，正在跳转登录页面', 1);
        // return [
        //   NavigationActions.navigate({ routeName: nextPage, params }),
        //   NavigationActions.navigate({ routeName: 'Sign' })
        // ];
        return [
          // { page: nextPage, params },
          { page: 'Sign', params: {} }
        ]
      }
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

// 老版本的 token 更新
export async function replaceOldToken() {
  try {
    const tokens = await store.get(StoreKey.SESSION_TOKEN_KEY);
    if (!tokens) return;

    const oldToken = tokens && tokens.accessToken;
    console.log('oldToken: ', oldToken);

    const accessToken = await DataAPI.postData(DataName.USER_RENEW_TOKEN, { old_token: oldToken }, ApiType.API_JSON);
    console.log('accessToken: ', _.get(accessToken, 'data'));
    
    store.delete(StoreKey.SESSION_TOKEN_KEY);
    await tokenStore.storeSessionToken({ 
      accessToken: _.get(accessToken, 'data.access_token'),
      refreshToken: _.get(accessToken, 'data.refresh_token'),
     });
    return true;
  } catch (e) {
    console.log('replaceOldToken:', e);
    store.delete(StoreKey.SESSION_TOKEN_KEY);
    return false;
  }
}

// 判断当前是否已登录
export async function getIfIsLogged(userInStore: string | undefined) {
  // console.log('getIfIsLogged:', userInStore);
  if (userInStore) {
    return true;
  } else {
    try {
      const token = await tokenStore.getSessionToken();
      if (token && token.accessToken) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
