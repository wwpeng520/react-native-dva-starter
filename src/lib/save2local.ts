/**
 * 保存一些信息到本地，除 token 外
 */

const store = require('react-native-simple-store');
import { StoreKey } from "../constants";

class UserDataStore {
  SESSION_SIGN_CHECK: string;
  signCheck: any;
  constructor() {
    this.SESSION_SIGN_CHECK = StoreKey.SESSION_SIGN_CHECK;
    this.signCheck = {};
    this.initSignCheck();
  }

  async initSignCheck() {
    const checks = await store.get(this.SESSION_SIGN_CHECK)
    this.signCheck = checks || {};
  }

  // 签到时保存当前日期
  storeSessionSignCheck(userId: string, value: string, ) {
    this.signCheck[userId] = value;
    console.log(value);
    store.save(this.SESSION_SIGN_CHECK, this.signCheck);
    return null;
  }

  async getSessionSignCheck(userId: string) {
    console.log(userId, this.signCheck[userId]);
    if (this.signCheck && this.signCheck[userId]) {
      return this.signCheck[userId];
    }
    const checks = await store.get(this.SESSION_SIGN_CHECK);
    return checks;
  }

  deleteSessionSignCheck() {
    this.signCheck = {};
    store.delete(this.SESSION_SIGN_CHECK);
    return null;
  }

}

const userDataStore = new UserDataStore();

export default userDataStore;
