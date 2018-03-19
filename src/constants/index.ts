import { Platform } from "react-native";
import CONFIG from '../config/config';
const keyMirror = require('key-mirror');

const API_HOST = CONFIG.API_HOST;

export const ERROR_CODE_FROM_SERVER = "ERROR_CODE_FROM_SERVER";
export const DEFAULT_PAGE_SIZE = 10;
export const LAST_CURSOR_INIT = "init";
export const NATIVE_UPDATE_INFO = "NATIVE_UPDATE_INFO";

function getAppDocWebUrl(key: string): string {
  return API_HOST + "/app/doc/" + key;
}

function getAppWebUrl(key: string): string {
  return API_HOST + "/app/" + key;
}

// function getAppDocWebUrl(key: string): string {
//   return 'http://192.168.0.102:8080/' + key + ".html";
// }
function getShUrl(): string {
  return API_HOST + "/config/" + Platform.OS + "_" + CONFIG.APP_VERSION + "_sh";
}

export const ApiType = keyMirror({
  API_UPLOAD_FILE: null,
  API_JSON: null,
  API_FORM_WWW: null
});

export const Tags = keyMirror({
  FREE_USER: null,
  VIP_USER: null
});

export const UpdateStates = keyMirror({
  DOWNLOAD_ING: null,
  INSTALL_ING: null,
  FINISHED: null,
  DOWNLOAD_ERROR: null,
  INSTALL_ERROR: null
});

// 邀请等级？
export const InvitationType = keyMirror({
  FIRST: null,
  SECOND: null,
  THIRD: null,
});

export const VerifyCodeType = {
  LOGIN: "login",
  REGISTER: "register",
  WECHAT: "wechat"
};

export const Scope = {
  LOGIN: "login",
  PASSWORD: "password",
  SMS: "sms",
  PASSWORD_LOGIN: "password_login",
  SMS_LOGIN: "sms_login",
  ENCRYPTED_LOGIN: "encrypted_login",
  REGISTER: "register",
  SMS_REGISTER: "sms_register",
  PATCH_PHONE: "patch_phone",
};

// 旧版数据消息类型
export const NotificationType = {
  WechatBindSuccess: "WechatBindSuccess",
  WeiboAuthExpiresoon: "WeiboAuthExpiresoon",
  WeiboAuthExpired: "WeiboAuthExpired",
  VipBuySuccess: "VipBuySuccess",
  VipExpireSoon: "VipExpireSoon",
  VipExpired: "VipExpired",
  SyncFailed: "SyncFailed",
  ActivityVote: "ActivityVote",
  GlobalTextNotice: "GlobalTextNotice",
  GlobalLinkNotice: "GlobalLinkNotice"
};

// get/post/patch/delete 等api请求类型
export const DataUseType = keyMirror({
  DATA_GET_ALL: null,
  DATA_GET: null,
  DATA_DELETE: null,
  DATA_PATCH: null,
  DATA_POST: null,
  DATA_SEARCH: null,
  DATA_COUNT: null,
});

// 保存数据到本地
export const StoreKey = keyMirror({
  SESSION_TOKEN_KEY: null,
  NEW_SESSION_TOKEN_KEY: null,
  SESSION_SIGN_CHECK: null,
  SESSION_USER_PHONE: null,
});

// 关联状态
export const PairState = {
  OK: "OK",
  QuotaErr: "QuotaErr",
  Suspended: "Suspended",
};

// 消息同步状态
export const TweetSyncState = {
  Wait: "Wait",
  NoNeed: "NoNeed",
  Ing: "Ing",
  PartOk: "PartOk",
  OK: "OK",
  Fail: "Fail",
  QuotaErr: "QuotaErr"
};

export const SnsType = {
  WeiBo: "weibo",
  WeChat: "wechat"
};

// task 任务同步状态
export const TaskSyncState = {
  Created: "Created",
  Success: "Success",
  Fail: "Fail",
  QuotaErr: "QuotaErr"
};

export const ServerErrorCode = {
  PhoneIsNotExists: 300010,
  SendCodeTooFrequently: 300011,
  SendSMSError: 300012,
  PhoneCannotEmpty: 300013
};

// 根据类型展示消息列表
export const TweetsFilterType = {
  All: "All",
  Fail: "Fail",
  Success: "Success"
};


export const MemberTypeToName: any = {
  "common_user": "普通用户",
  "common_user_v2": "注册用户",
  "temporary_member": "体验vip",
  "super_member": "超级会员",
  "diamond_member": "钻石会员",
  "gold_member": "金牌会员",
  "silver_member": "银牌会员",
  "copper_member": "铜牌会员",
};

export const MemberRightTypes = {
  VIP_SERVICE: "vip_service",
  SYNC_FAIL_AUTO_RETRY: "sync_fail_auto_retry",
  NO_AD: "no_ad",
  BE_DISTRIBUTOR: "be_distributor",
  ADVANCED_SERVER: "advanced_server",
  INSTANT_PUBLISH: "instant_publish",
};

// 购买会员订单状态
export const OrderStatus = {
  WAIT_BUYER_PAY: "WAIT_BUYER_PAY",
  TRADE_CLOSED: "TRADE_CLOSED",
  TRADE_SUCCESS: "TRADE_SUCCESS",
  TRADE_FINISHED: "TRADE_FINISHED",
  NO_ORDER: "NO_ORDER",
  NET_ERROR: "NET_ERROR",
};

export const DurationName = {
  year1: "一年",
  lifetime: "终身"
};

export const AlearConstants = {
  INFO_TITLE: "提 示",
  OK_BUTTON: "好的",
  NOTIFICATION_PERMISSION: "您的推送通知已关闭，为了更好的用户体验，请及时开启。",
};

// Actions 事件
export const Actions = keyMirror({
  SERVER_REQUEST: null,
  SERVER_SUCCESS: null,
  SERVER_FAILURE: null,

  SET_PLATFORM: null,
  SET_VERSION: null,

  SESSION_TOKEN_REQUEST: null,
  SESSION_TOKEN_SUCCESS: null,
  SESSION_TOKEN_FAILURE: null,

  DELETE_TOKEN_REQUEST: null,
  DELETE_TOKEN_SUCCESS: null,

  ON_LOGIN_STATE_CHANGE: null,

  ON_AUTH_FORM_FIELD_CHANGE: null,

  SET_STATE: null,
  GET_STATE: null,
  SET_STORE: null,


  PAIRS_GET: null,
  PAIRS_NEW: null,
  PAIRS_DEL: null,
  PAIRS_DEL_WITH_SNS: null,
  PAIR_SET_IN_USE: null,

  PAIR_SET_FROM: null,
  PAIR_SET_TO: null,

  SNSACCOUNT_GET: null,
  SNSACCOUNT_NEW: null,
  SNSACCOUNT_DEL: null,
  WEIBO_UPDATE: null,

  NOTIFICATION_GET: null,
  NOTIFICATION_DEL: null,
  NOTIFICATION_READ: null,
  NOTIFICATION_RECEIVE: null,
  USER_GET_PROFILE: null,
  USER_CLEAR_PROFILE: null,
  USER_PROMOTION: null,
  USER_MEMBERSHIP: null,
  USER_DISTRIBUTION_CHANGE: null,

  USER_PROFILE_CHANGE: null,

  TWEETS_GET: null,
  TWEETS_DEL_WITH_SNS: null,
  TWEETS_SET_CURRENT: null,
  TWEET_STATE_CHANGE: null,
  FAILED_TWEETS_GET: null,

  UPDATE_INFO: null,

  RESET_PASSWORD: null,
  LOGIN: null,
  LOGOUT: null,
  REGISTER: null,

  SET_USER_WITH_TOKEN: null,

  MESSAGES_GET: null,
  MESSAGE_STATE_CHANGE: null,
  SHOW_VIP: null,

  GOODS_GET: null,
  MALL_ADS_GET: null,

  COUPONS_GET: null,
});

export const DataName = {
  VERIFY_CODE: "verify_code", // verifyCode/sms
  WECHAT_BIND: "verify_code/wechat", // 绑定微信号
  WECHAT_ACCOUNT: "wechat_account",
  TWEETS: "tweet",
  TASKS: "task",
  USER: "user",
  USER_INIT: "user/init",
  USER_PROFILE: "user/profile",
  USER_CKENCKIN: "user/checkin", // 签到
  USER_RENEW_TOKEN: "user/renew_token", // 签到
  NOTIFICATION: "notification",
  DISTRIBUTION: "distribution",
  WITHDRAW: "distribution/withdraw",
  INVATATION: "distribution/invatation",

  ORDER: "order",
  ORDER_NOTIFY: "order/notify",
  COUPONS: "order/coupon", // 优惠券
  UPGRADETYPE: "order/items", // 会员可升级或可购买信息
  ACTIVATION: "order/activation_code", // 激活码激活会员

  ACCOUNT: 'account',
  PAIR: 'account/pair', // 关联
  WECHAT_USER: 'account/wechat_user',
  WEIBO_USER: 'account/weibo_user',
  MEMBER_TYPE: 'member_type', // 会员类型
  SHOP_CATEGORY: 'config/shop_category', // 商盟导航列表
  INDEX_CAROUSEL: 'config/index_carousel', // 首页轮播
  IOS_VERSION_SH: `config/ios_${CONFIG.APP_VERSION}_sh`,
  VERSION: "version/update",  // 版本更新检查
  
  GOODS: "shop_product",
  
  WEIBO_LOGIN: "weiboUser/create",
  USER_INIT_DATA: "user/initData",
  // PAIRS: "pair",
  WEIBO: "weiboUser",
  WECHAT: "wechatUser",
  // TWEETS_FAILED: "tweet/fail",
  // TWEETS_SUCCESS: "tweet/success",
  MEMBERSIP: "membership",
  MEMBERTYPE: "membertype",
  MEMBERRIGHT: "memberright",
  ORDER_RESULT: "order/syncResultCheck",
  ERROR_REPORT: "service/error",
  GOODS_SHOP: "product/shop",
  TOP_GOODS: "topgoods",
  ACTIVITY: "fansactivity/application",
  ALL_ACTIVITY: "fansactivity",
  PRODUCT_TYPES: "product/category",
  ADVANCE_SIGNATRUE: "weiboUser/advanceAuthorization",
};

// API 请求地址
export const API_URL = {
  TOKEN: API_HOST + "/user/token",
  WEISHANG_LEADER_URL: getAppDocWebUrl("weishang_leader"),               // 微商大咖计划（cancel）
  LIFETIME_MEMBER_URL: getAppDocWebUrl("lifetime_member"),               // 关于终身会员
  FANS_ACTIVITY_URL: getAppDocWebUrl("fans_activity_intro"),             // 粉丝计划（not use）
  DISTRIBUTION_WITHDRAW_HELP: getAppDocWebUrl("withdraw_help"),          // 提现说明
  DISTRIBUTION_INFO_HELP: getAppDocWebUrl("distribution_intro_help"),    // 关于推广
  REGISTER_HELP: getAppDocWebUrl("register_help"),                       // 注册问题
  WEIBO_AUTH_HELP: getAppDocWebUrl("weibo_auth_help"),                   // 关于微博授权说明（not use）
  SYNC_FAILED_HELP: getAppDocWebUrl("sync_failed_help"),                 // 同步错误代码
  DISTRIBUTION_INVITE_HELP: getAppDocWebUrl("distribution_invite_help"), // 邀请好友说明
  CREATE_PAIR_HELP: getAppDocWebUrl("create_pair_help"),                 // 创建关联说明
  WEIBO_ADVANCE_AUTH_HELP: getAppDocWebUrl("weibo_advance_auth_help"),   // 微博高级授权（not use）
  HELP_URL: getAppDocWebUrl("help"),                                     // 帮助中心
  CHECK_URL: getAppDocWebUrl("sync_check"),                              // 不能同步怎么办（not use）
  FEEDBACK_URL: getAppDocWebUrl("feedback"),                             // 联系客服方式
  ACTIVATION_CODE_HELP_URL: getAppDocWebUrl("activation_code"),          // 关于激活码
  PRICARY: getAppDocWebUrl("privacy"),                                   // 关于隐私政策
  DISTRIBUTION_RATE: getAppDocWebUrl("distribution_rate"),               // 关于推广提成比例
  MEMBER_TYPE: getAppDocWebUrl("member_type"),                           // 关于会员类型说明
  WEIBO_ASSISTANT: getAppWebUrl("weibo_assistant"),                   // 发现-微博助手
  TIME_MACHINE: getAppWebUrl("time_machine"),                         // 发现-时光机
  WEISHANG_COLLEGE: getAppWebUrl("weishang_college"),                 // 发现-微商学院
  WAIT_NEXT: getAppWebUrl("wait_next"),                               // 发现-敬请期待
  
  SH_URL: getShUrl(),
  DATA_API_URL: API_HOST,
  USER_PROFILE_URL: API_HOST + "/user/profile",
  CHANGE_PWD_URL: API_HOST + "/user/password",
  USER_MEMBERSHIP_URL: API_HOST + "/user/memberShip",
  USER_DISTRIBUTION_URL: API_HOST + "/user/distribution",
  PATCH_DISTRIBUTION_INFO_URL: API_HOST + "/user/distribution",
  VERSION_CHECK_URL: API_HOST + "/version/update",
  REGISTER_URL: API_HOST + "/app/invite",
  ERROR_CODE_INIT: API_HOST + "/app/errorCode",
  CRASH_REPORT_URL: API_HOST + "/app/crashReport",
  WITHDRAW_URL: API_HOST + "/distribution/withdraw",  // 提现
  WITHDRAW_HISTORY_URL: API_HOST + "/distribution/withdraw/history", // 提现历史
  USER_ACTIVECODE_URL: API_HOST + "/order/activationcode",
  UPLOAD_PRODUCT_CHECK: API_HOST + "/product/uploadCheck", // 检查是否有上传商品权限
};
