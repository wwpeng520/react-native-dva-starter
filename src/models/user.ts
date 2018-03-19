// import { fromJS } from "immutable";
import { NavigationActions } from 'react-navigation';
import * as _ from 'lodash';
import * as user from '../services/user';
import { Scope } from "../constants";

// export interface Membership {
//   id: number;
//   userId: number;
//   expiredAt: string; // 会员到期时间？
//   pairCount: number; // 可绑定个数
//   syncCount: number; // 可同步数量
//   isDistributor: boolean; // 是否是分销用户
//   memberType: string; // 会员类型
//   memberRights: string[]; // 会员权利
// }

export interface Checkins {
  checkSumCoin: number;
  continuousCheckDays: number;
  checkStartDate?: string;
  checkDays: any[];
}

// 签到返回结构
export interface CheckinRes {
  result: boolean;
  awardCoin?: number;
  checkins?: Checkins;
  currentCoin?: number;
  totalCoin?: number;
}

export interface IUserState {
  logAction: string; // 登录或登出动作,有login/logout两种情况，
  // 主要是用于1、切换用户重新加载数据
  // 2、验证码登录时由于 reset 路由，componentWillReceiveProps和componentDidMount会同时作用

  username: string;
  name: string;
  gender: string;
  userId: number;
  phone: string;
  avatar: string;
  isDistributor: boolean;
  isPayVip: boolean; // 是否付费会员
  memberType: string;
  memberRights: string[];
  createdAt?: string;
  updatedAt?: string;
  expiredAt: string; // 会员到期时间
  failedCount: number; // 同步失败数量
  successCount: number; // 同步成功数量
  syncCount: number; // 每天可同步的条数
  tweetCount: number; // 发布的消息总数
  pairCount: number; // 当前可关联的帐号数
  notificationUnreadCount: number;
  checkins: Checkins;
  currentCoin: number;
  totalCoin: number;

  // membership: Membership;

  isFetching: boolean;
  errMsg: string;
  errCode: number;
}

export interface IUserAction {
  payload?: any;
}

const init = {
  logAction: '',

  username: '',
  name: '',
  gender: '',
  userId: null,
  phone: '',
  avatar: '',
  isDistributor: false,
  isPayVip: false,
  memberType: '',
  memberRights: [],
  expiredAt: '',
  failedCount: null,
  successCount: null,
  syncCount: null,
  tweetCount: null,
  pairCount: null,
  notificationUnreadCount: null,
  checkins: null,
  currentCoin: null,
  totalCoin: null,

  isFetching: false,
  errMsg: "",
  errCode: null,
}
export default {
  namespace: 'user',
  state: init,
  reducers: {
    updateState(state: IUserState, { payload }: IUserAction) {
      return { ...state, ...payload }
    },
    // 退出时清空用户信息
    clearState(state: IUserState, { payload }: IUserAction) {
      return { ...init, logAction: 'logout' }
    },
  },
  effects: {
    *login({ payload }: IUserAction, { call, put }: any) {
      yield put({ type: 'updateState', payload: { isFetching: true, errMsg: '', errCode: null } });
      const res = yield call(user.signin, payload.userInfo);
      console.log('login effects res: ', res);
      if (res && res.data && res.data.userId) {
        if (payload.from && payload.from === 'password-login') { // 默认验证码登录，修改验证码登录后不跳转修改密码页面
          yield put({ type: 'updateState', payload: { ...res.data, isFetching: false, logAction: 'login' } });
          // yield put( // 使用 tabBarOnPress 懒加载时不能使用 reset 方法
          // NavigationActions.reset({
          //   index: 1,
          //   actions: [
          //     NavigationActions.navigate({ routeName: 'Main' }),
          //     NavigationActions.navigate({ routeName: 'ResetPassword' })
          //   ],
          // })
          // )
          yield put(NavigationActions.pop({ n: 2 }));
        } else if (payload.from && payload.from === 'verify-phone') { // 忘记密码后验证手机号
          // 只验证手机号，不保存到 store
          // 验证手机号后跳转重置密码页面
          yield put(NavigationActions.pop({ n: 2 }));
          yield put(NavigationActions.navigate({ routeName: 'ResetPassword', params: { from: 'signin-with-sms' } }));
          return res.data; // 验证手机号成功，返回结果
        } else {
          yield put({ type: 'updateState', payload: { ...res.data, isFetching: false, logAction: 'login' } });
          yield put(NavigationActions.back());
          // 手机验证码登录后不跳转重置密码页面
          // yield put(NavigationActions.navigate({ routeName: 'ResetPassword', params: { from: 'signin-with-sms' } }));
        }
      } else {
        if (payload.from && payload.from === 'verify-phone') {
          // 只验证手机号，不保存到 store
          return res.data;
        }
        yield put({ type: 'updateState', payload: { isFetching: false, errMsg: _.get(res, 'data.error.message'), errCode: _.get(res, 'status') } });
      }
    },

    *logout(action: IUserAction, { call, put }: any) {
      yield call(user.logout);
      yield put({ type: 'clearState', payload: {} });
    },

    *sendSignupVerifyCode({ payload }: IUserAction, { call, put }: any) {
      const res = yield call(user.sendSignupVerifyCode, payload);
      console.log('sendSignupVerifyCode effects res: ', res);
      return res;
    },

    *sendLoginVerifyCode({ payload }: IUserAction, { call, put }: any) {
      const res = yield call(user.sendLoginVerifyCode, payload);
      console.log('sendLoginVerifyCode effects res: ', res);
      return res;
    },

    *sendPatchPhoneVerifyCode({ payload }: IUserAction, { call, put }: any) {
      const res = yield call(user.sendPatchPhoneVerifyCode, payload);
      console.log('sendPatchPhoneVerifyCode effects res: ', res);
      return res;
    },

    *signup({ payload }: IUserAction, { call, put }: any) {
      const res = yield call(user.signup, payload);
      console.log('signup effects res: ', res);
      return res;
    },

    *resetPassword({ payload }: IUserAction, { call, put }: any) {
      const res = yield call(user.resetPassword, payload);
      console.log('resetPassword effects res: ', res);
      return res;
    },

    *getUserInfo(action: IUserAction, { call, put }: any) {
      try {
        yield put({ type: 'updateState', payload: { isFetching: true, errMsg: '', errCode: null } });
        const res = yield call(user.getUserInfo);
        console.log('getUserInfo effects res: ', res);
        if (res && res.data && res.data.userId || res.data.username) {
          yield put({ type: 'updateState', payload: { isFetching: false, ...res.data } });
        } else {
          yield put({ type: 'updateState', payload: { isFetching: false, errMsg: _.get(res, 'data.error.message'), errCode: _.get(res, 'status') } });
        }
      } catch (e) {
        console.log('### TONGBUQUAN getUserInfo ERROR: ', e);
        yield put({ type: 'updateState', payload: { isFetching: false, errMsg: _.get(e, 'data.error.message'), errCode: _.get(e, 'status') } });
      }
    },

    *editUserInfo({ payload }: IUserAction, { call, put }: any) {
      const res = yield call(user.editUserInfo, payload);
      console.log('editUserInfo effects res: ', res);
      return res;
    },

    // 注册后首次登录
    *init(action: IUserAction, { call, put }: any) {
      const res = yield call(user.init);
      console.log('init effects res: ', res);
      return res;
    },

    // 签到
    *checkin(action: IUserAction, { call, put }: any) {
      const res = yield call(user.checkin);
      console.log('checkin effects res: ', res);
      if (res && res.data && res.data.result) {
        const checkins = res.data.checkins ? res.data.checkins : null;
        const totalCoin = res.data.totalCoin ? res.data.totalCoin : null;
        const currentCoin = res.data.currentCoin ? res.data.currentCoin : null;
        if (checkins && totalCoin && currentCoin) {
          yield put({ type: 'updateState', payload: { checkins, totalCoin, currentCoin } });
        }
      }
      return res
    },
  },
}
