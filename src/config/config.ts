/**
 * 项目配置文件
 */

const config = {
    APP_VERSION: "4.0.0",
    API_HOST: "http://api.tongbuquan.com", // http://api-test.tongbuquan.com;http://api2.tongbuquan.com http://192.168.0.103:7001;http://127.0.0.1:7001
    WEB_HOST:  "http://www.tongbuquan.com",
    CLIENT: {
        ID: "app",
        SECRET: "USrorqoYWMRVYwBncHZpPE6RPtUf7OUUgIllaaiA8CzSzLpu4WTJ3DRkAax7ILZU"
    },
    FEEDBACK_EMAIL: "feedback_app@tongbuquan.com",
    APP_STORE_ID: "1166066162",
    APP_SCHEME: "tongbuquan432",
    ANDROID_PACKAGE: "com.gootile.tongbuquan",
    // SHARE_TEXT: "#同步圈# 安利一个朋友圈自动同步微博神器，从此解放双手，再也不用复制粘贴了！",
    SHARE_TEXT: "只需两分钟设置，便可全自动同步朋友圈到微博。",
    QINIU_AK: "kokCFz1Wb7RLNjtBYFp-S2pkFfeC_M13acHHZlhP",
    QINIU_SK: "LYpiclG2oeue3i2jitr8xR_Y0j0lXBHgG8AiQ62J",
    QINIU_BUCKET: "tongbuquan",
    QINIU_BASE_URL: "http://cdn.tongbuquan.com/",
    SOCKET: {
        HOST: "http://10.3.21.207:3030",
        CONFIG: {
            path: "/socket"
        }
    },
};

export default config;
