/**
 * 消息：不保存在全局
 */

import * as notifications from '../services/notifications';
import * as _ from 'lodash';

export interface INotification {
  id: number;
  userId: number;
  title: string;
  type: string; // text/page/webview
  scene: string;
  summary: string;
  content: string;
  isRead: boolean;
  priority?: number;
  createdAt: number;
  updatedAt?: number;
}

export interface INotificationState {
  isFetching: false;
  // userData: INotification[],
  // userLinks: { next: string },
  // systemData: INotification[],
  // systemLinks: { next: string },
}

export interface INotificationAction {
  type: string;
  data: any;
  payload: any;
}

export default {
  namespace: 'notifications',
  state: {
    isFetching: false,
    // userData: [],
    // userLinks: { next: '' },
    // systemData: [],
    // systemLinks: { next: '' },
  },
  reducers: {
    // updateState(state: INotificationState, { payload }: INotificationAction) {
    //   if (payload.userData && payload.userData.length) {
    //     const userData = [...state.userData, ...payload.userData];
    //     return { ...state, ...payload, userData }
    //   } else if (payload.systemData && payload.systemData.length) {
    //     const systemData = [...state.systemData, ...payload.systemData];
    //     return { ...state, ...payload, systemData }
    //   } else {
    //     return { ...state, ...payload }
    //   }
    // },
  },
  effects: {
    *getNotificationsWithPage({ payload }: INotificationAction, { call, put }: { call: any, put: any }) {
      // yield put({ type: 'updateState', payload: { isFetching: true } });
      const res = yield call(notifications.getNotificationsWithPage, payload);
      console.log("getNotificationsWithPage effects res: ", res);
      // const defaultData = {
      //   data: [],
      //   links: { next: '' },
      // };
      // const resData = _.get(res, 'data', defaultData);
      // if (payload.type === 'user' && resData.data.length) {
      //   yield put({ type: 'updateState', payload: { userData: resData.data, userLinks: resData.links, isFetching: false } });
      // } else if (payload.type === 'system' && resData.data.length) {
      //   yield put({ type: 'updateState', payload: { systemData: resData.data, systemLinks: resData.links, isFetching: false } });
      // }
      if (res && res.data) return res.data;
      return null;
    },
    *markRead({ payload }: INotificationAction, { call, put }: { call: any, put: any }) {
      // yield put({ type: 'updateState', payload: { isFetching: true } });
      const res = yield call(notifications.markRead, payload);
      console.log("markRead effects res: ", res);
      if (res && res.data) return res.data;
      return null;
    },
  }
}
