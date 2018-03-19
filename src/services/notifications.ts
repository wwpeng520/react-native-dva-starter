/**
 * 消息
 */

import * as DataAPI from "./data";
import { DataName, LAST_CURSOR_INIT, DEFAULT_PAGE_SIZE, ApiType } from "../constants";
import CONFIG from '../config/config'

interface GetNotificationsOption {
  type?: string;
  last_id?: number;
  next_link?: string;
}

// 获取消息
export async function getNotificationsWithPage(option: GetNotificationsOption) {
  try {
    if (option.next_link) {
      const fullUrl = CONFIG.API_HOST + option.next_link
      return await DataAPI.getDataWithParams(DataName.NOTIFICATION, {}, fullUrl);
    }
    return await DataAPI.getDataWithParams(DataName.NOTIFICATION, option);
  } catch (e) {
    console.log("SERVIECES getNotificationsWithPage ERROR: ", e);
    return e;
  }
}

export async function markRead(option: Object) {
  try {
    return await DataAPI.patchData(DataName.NOTIFICATION, option, ApiType.API_JSON);
  } catch (e) {
    console.log("SERVIECES readNotifications ERROR: ", e);
    return e;
  }
}
