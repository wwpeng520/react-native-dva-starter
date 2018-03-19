/**
 * 版本更新检查
 */

import * as DataAPI from "./data";
import { DataName, API_URL,ApiType } from "../constants";

export async function check(option: Object) {
  try {
    return await DataAPI.getDataWithParams(DataName.VERSION, option);
  } catch (e) {
    console.log('SERVICES check version ERROR: ', e);
    return e;
  }
}
