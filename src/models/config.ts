/**
 * 获取 config 信息: 会员类型等
 */

import * as config from '../services/config';
import * as _ from 'lodash';

interface Price {
  current: number;
  message?: string;
  original?: number;
}
export interface Prices {
  year1?: Price;
  lifetime?: Price;
}

export interface IMemberType {
  id: number;
  name: string;
  isOnTable: false;
  level1Rate: number;
  level2Rate: number;
  level3Rate: number;
  pairCount: number; // 可关联帐号
  syncCount: number; // 可同步消息数
  slugName: string;
  prices: Prices;
  memberRights?: string[];
}

export interface IMemberTypes {
  [propName: string]: IMemberType;
}

// 商盟类别类别
export interface IShopCategory {
  id: string;
  name: string;
  showName: string;
}

// 首页轮播
export interface ICarousel {
  id: number;
  type: string;
  image_url: string;
  uri: string;
  params?: any;
}

export interface IConfigState {
  isFetching: boolean;
  memberTypes: IMemberTypes;
  shopCategories: IShopCategory[];
  indexCarousel: ICarousel[];
  iOSVersionShResult: boolean;
}

export interface IConfigAction {
  type: string;
  data: any;
  payload: any;
}

export default {
  namespace: 'config',
  state: {
    isFetching: false,
    memberTypes: {},
    shopCategories: [],
    indexCarousel: [],
    iOSVersionShResult: true,
  },
  reducers: {
    updateState(state: IConfigState, { payload }: IConfigAction) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *getMemberTypes(action: IConfigAction, { call, put }: { call: any, put: any }) {
      const res = yield call(config.getMemberTypes);
      console.log('getMemberTypes effects res: ', res);
      yield put({ type: 'updateState', payload: { memberTypes: res } });
    },
    *getShopCategories(action: IConfigAction, { call, put }: { call: any, put: any }) {
      const res = yield call(config.getShopCategories);
      console.log('getShopCategories effects res: ', res);
      if (res && res.data && typeof res.data === 'object' && res.data.length) {
        yield put({ type: 'updateState', payload: { shopCategories: res.data } });
      }
    },
    *getIndexCarousel(action: IConfigAction, { call, put }: { call: any, put: any }) {
      const res = yield call(config.getIndexCarousel);
      console.log('getIndexCarousel effects res: ', res);
      if (res && res.data && typeof res.data === 'object' && res.data.length) {
        yield put({ type: 'updateState', payload: { indexCarousel: res.data } });
      }
    },
    *getIOSVersionSh(action: IConfigAction, { call, put }: { call: any, put: any }) {
      const res = yield call(config.getIOSVersionSh);
      console.log('getIOSVersionSh effects res: ', res, _.get(res, 'data.result'));
      yield put({ type: 'updateState', payload: { iOSVersionShResult: _.get(res, 'data.result') } });
    },
  }
}
