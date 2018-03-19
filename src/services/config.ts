/**
 * 获取 config 配置信息
 */

import * as DataAPI from "./data";
import { DataName } from "../constants";

export async function getMemberTypes(type: string) {
  try {
    const res = await DataAPI.getData(DataName.MEMBER_TYPE);
    console.log('getMemberTypes: ', res)

    let types: any = {};
    let members: any = res.data ? res.data : [];
    for (let key in members) {
      const member = members[key];
      if (member.slugName) {
        types[member.slugName] = member;
      }
    }
    return types;
  } catch (e) {
    console.log('SERVICES getConfig ERROR: ', e);
    return e;
  }
}

export async function getShopCategories(type: string) {
  try {
    return await DataAPI.getData(DataName.SHOP_CATEGORY);
  } catch (e) {
    console.log('SERVICES getShopCategory ERROR: ', e);
    return e;
  }
}

export async function getIndexCarousel(type: string) {
  try {
    return await DataAPI.getData(DataName.INDEX_CAROUSEL);
  } catch (e) {
    console.log('SERVICES getIndexCarousel ERROR: ', e);
    return e;
  }
}

export async function getIOSVersionSh(type: string) {
  try {
    return await DataAPI.getData(DataName.IOS_VERSION_SH);
  } catch (e) {
    console.log('SERVICES getIndexCarousel ERROR: ', e);
    return e;
  }
}
