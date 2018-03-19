/**
 * app 更新下载，打开 app store 或应用商店
 */

import {
  NativeModules,
  Platform,
  Linking,
} from "react-native";
import { getSystemVersion } from "./device";
import CONFIG from '../config/config';
import { Toast } from 'antd-mobile';
import { IVersion } from '../models/version';

export function getAppStoreUrl(appid: string, forRate?: boolean) {
  if (Platform.OS === "ios") {
    let sysVersion = getSystemVersion();
    if (sysVersion.startsWith("11.")) {
      // 'itms://itunes.apple.com/us/app/apple-store/myiosappid?mt=8'
      const uri = `itms-apps://itunes.apple.com/cn/app/id${appid}?mt=8${forRate ? '&action=write-review' : ''}`;
      return uri;
    } else if (sysVersion.startsWith("7.")) {
      return `itms-apps://itunes.apple.com/app/id${appid}`;
    } else {
      return `itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=${appid}`;
    }
  } else {
    return `market://details?id=${appid}`;
  }
}

export function update(updateInfo: IVersion) {
  const platform = updateInfo && updateInfo.platform;

  if (Platform.OS === 'android' && (platform === 'all' || platform === 'android')) {
    if (updateInfo && updateInfo.androidStoreLink) {
      NativeModules.upgrade.upgrade(updateInfo.androidStoreLink);
      return true;
    }
    return false;
  } else if (Platform.OS === 'ios' && (platform === 'all' || platform === 'ios')) {
    if (updateInfo && updateInfo.iosStoreLink) {
      // Linking.openURL(updateInfo.iosStoreLink || "http://www.tongbuquan.com/");
      // NativeModules.upgrade.openAPPStore(CONFIG.APP_STORE_ID);

      Linking.openURL(getAppStoreUrl(CONFIG.APP_STORE_ID))
        .catch((err: any) => {
          Toast.fail('无法打开App Store', 2);
          console.log('An error occurred', err)
        });

      // const uri = `itms-apps://itunes.apple.com/cn/app/id${CONFIG.APP_STORE_ID}?mt=8`;
      // const uri2 = `itms-apps://itunes.apple.com/app/id${CONFIG.APP_STORE_ID}`;
      // console.log('uri: ', uri)
      // Linking.openURL(uri)
      //   .catch((err: any) => {
      //     Toast.fail('无法打开App Store', 2);
      //     console.log('An error occurred', err)
      //   });

      return true;
    }
    return false;
  }
  return false;
}
