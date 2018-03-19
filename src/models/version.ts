/**
 * 版本更新检查
 */
import * as version from '../services/version';

export interface IVersion {
  id?: number;
  version: string;
  releaseTitle?: string;
  releaseNote: string;
  platform: string;
  androidStoreLink: string;
  iosStoreLink: string;
  isForceUpdate: boolean; // 是否强制更新
  isNotice?: boolean; // 是否提示用户
  isOnline?: boolean; // 是否已上线
  createdAt?: string;
  updatedAt?: string;
}

export interface IVersionState {
  isFetching: false;
}

export interface IVersionAction {
  type: string;
  data: any;
  payload: any;
}

export default {
  namespace: 'version',
  state: {
    isFetching: false,
  },
  reducers: {
    updateState(state: IVersionState, { payload }: IVersionAction) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *check({ payload }: IVersionAction, { call, put }: { call: any, put: any }) {
      // yield put({ type: 'updateState', payload: { isFetching: true } });
      const res = yield call(version.check, payload);
      console.log('version check model res: ', res);
      if (res && res.data) return res.data;
      return null;
    },
  }
}
