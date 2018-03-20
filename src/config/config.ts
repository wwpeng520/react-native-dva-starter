/**
 * 项目配置文件
 */

const config = {
    APP_VERSION: "1.0.0",
    API_HOST: "http://api.xxx.com",
    WEB_HOST:  "http://www.xxx.com",
    CLIENT: {
        ID: "app",
        SECRET: "xxxx"
    },
    FEEDBACK_EMAIL: "feedback_app@xxx.com",
    APP_STORE_ID: "xxxx",
    APP_SCHEME: "xxxx",
    ANDROID_PACKAGE: "com.xxx.xxx",
    SHARE_TEXT: "只需两分钟设置，便可全自动同步朋友圈到微博。",
    QINIU_AK: "xxxxxx",
    QINIU_SK: "xxxxxx",
    QINIU_BUCKET: "xxxx",
    QINIU_BASE_URL: "http://cdn.xxx.com/",
    SOCKET: {
        HOST: "http://xxx.xxx.xxx.xxx:3030",
        CONFIG: {
            path: "/socket"
        }
    },
};

export default config;
