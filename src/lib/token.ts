/**
 * 保存用户 token
 *
 */
const store = require('react-native-simple-store');
import { StoreKey } from "../constants";

interface Tokens {
  accessToken?: string;
  refreshToken?: string;
}

class AuthTokenStore {
  SESSION_TOKEN_KEY: string;
  SESSION_USER_PHONE: string;
  tokens: Tokens;
  userPhone: string;
  constructor() {
    this.SESSION_TOKEN_KEY = StoreKey.NEW_SESSION_TOKEN_KEY;
    this.SESSION_USER_PHONE = StoreKey.SESSION_USER_PHONE;
    this.tokens = {};
    this.userPhone = '';
    this.initSessionToken();
  }

  async initSessionToken() {
    const tokens = await store.get(this.SESSION_TOKEN_KEY);
    const userPhone = await store.get(this.SESSION_USER_PHONE);
    this.tokens = tokens || {};
    this.userPhone = userPhone || '';
  }

  async storeSessionToken(sessionToken: Tokens) {
    this.tokens = {
      accessToken: sessionToken.accessToken,
      refreshToken: sessionToken.refreshToken
    };
    await store.save(this.SESSION_TOKEN_KEY, this.tokens);
    return null;
  }

  // 保存用户标识符：手机号
  async storeSessionUserPhone(phone: string) {
    this.userPhone = phone;
    await store.save(this.SESSION_USER_PHONE, this.userPhone);
    return null;
  }

  /**
   * ### getSessionToken
   * @param {Object} sessionToken the currentUser object from Parse.com
   *
   * When Hot Loading, the sessionToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */
  async getSessionToken() {
    if (this.tokens && this.tokens.accessToken && this.tokens.refreshToken) {
      return this.tokens;
    }
    const tokens = await store.get(this.SESSION_TOKEN_KEY);
    // console.log('getSessionToken: ', tokens);
    return tokens;
  }

  async getSessionUserPhone() {
    if (this.userPhone) {
      return this.userPhone;
    }
    const userPhone = await store.get(this.SESSION_USER_PHONE);
    return userPhone;
  }

  deleteSessionToken() {
    this.tokens = {};
    store.delete(this.SESSION_TOKEN_KEY);
    return null;
  }
}

const authTokenStore = new AuthTokenStore();

export default authTokenStore;
