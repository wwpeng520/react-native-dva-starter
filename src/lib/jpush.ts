import * as _ from "lodash"
import {
    Alert,
    Platform,
    NativeAppEventEmitter
} from "react-native"
import JPushModule from "jpush-react-native";
import { NotificationType } from "../constants";
import store from "react-native-simple-store";
import user from "../models/user";
import index from "antd-mobile/lib/toast";
import { fail } from "assert";
import { Number } from "core-js/library/web/timers";
const plusString = require('node-plus-string');

const JPUSH_ALIAS_KEY = 'JPUSH_ALIAS_KEY';

class PushController {
    isRegisted: boolean
    hasSetAlias: boolean
    user: any
    navigation: any
    pushlisteners: any
    constructor() {
        this.isRegisted = false;
        this.hasSetAlias = false;
    }

    setUser(user: any) {
        if (_.get(this, 'user.userId') !== _.get(user, 'userId')) {
            this.user = user;
            if (this.isRegisted) {
                this.setAlias();
                this.hasSetAlias = true;
            }
        }
    }

    setNavigation(navigation: any) {
        this.navigation = navigation;
        if (!this.isRegisted) {
            this.register();
            this.isRegisted = true;
            if (this.user && !this.hasSetAlias) {
                this.setAlias();
                this.hasSetAlias = true;
            }
        }
    }

    setAlias() {
        const userId = _.get(this, 'user.userId', null)
        if (!userId) {
            return;
        }
        let alias = `tongbuquanUser${userId}`;
        console.log("####TONGBUQUANLOGCAT ### SETALIAS ", alias);
        store.get(JPUSH_ALIAS_KEY)
            .then((storedAlias: any) => {
                if (alias === storedAlias) {
                    return;
                }
                console.log("####TONGBUQUANLOGCAT ### SETALIAS ### START ", alias);
                JPushModule.setAlias(alias, () => { });
            });
    }

    register() {
        //test
        console.log("####TONGBUQUANLOGCAT ### register")
        if (Platform.OS == "ios") {
            JPushModule.setBadge(0, () => { });
            // JPushModule.addOpenNotificationLaunchAppListener(notification => {
            //     console.log("####TONGBUQUANLOGCAT ### addOpenNotificationLaunchAppListener:", notification);
            //     if (notification) {
            //         this.onReceiveMessage(notification);
            //     }
            // })
            NativeAppEventEmitter.addListener(
                "OpenNotification",
                (notification) => {
                    if (notification) {
                        this.onReceiveMessage(notification);
                    }
                }
            );

        } else {
            JPushModule.initPush();
            JPushModule.notifyJSDidLoad((data) => {
                console.log("####TONGBUQUANLOGCAT ###  notifyJSDidLoad", data)
            });
            JPushModule.getInfo(function (info) {
                console.log(info);
            });
            // JPushModule.addReceiveCustomMsgListener((message) => {
            //     console.log("####TONGBUQUANLOGCAT ###  addReceiveCustomMsgListener", message)
            //     var data = JSON.parse(message);
            // });

            // JPushModule.addReceiveNotificationListener((notification) => {
            //     console.log("####TONGBUQUANLOGCAT ###  addReceiveNotificationListener", notification)
            //     if (notification) {
            //         this.onReceiveMessage(notification);
            //     }
            // });

            JPushModule.addReceiveOpenNotificationListener((notification) => {
                console.log("####TONGBUQUANLOGCAT ###  addReceiveOpenNotificationListener:", notification);
                if (notification) {
                    this.onReceiveMessage(notification);
                }
            });
        }

    }


    onReceiveMessage(data: any) {
        setTimeout(() => {
            console.log('### TONGBUQUANLOG ### openNotificationHandler ', data);
            let item;
            if (data.extra) {
                try {
                    item = JSON.parse(data.extra);
                } catch (e) {
                    return;
                }
            }
            // if(Platform.OS === "android"){
            // }else{
            //     item = data;
            // }

            console.log("TONGBUQUAN ", item)
            const type = _.get(item, 'type');
            console.log("### TONGBUQUANLOG ### typeee: ", type);
            switch (type) {
                case 'webview':
                    {
                        // this.navigation.navigate('Browser', {
                        //     title: _.get(item, 'title'),
                        //     url: _.get(item, 'contentUrl')
                        // })
                        const content = _.get(item, 'content', {});
                        console.log('WEBVIEW content:', content);
                        this.navigation && this.navigation.navigate('Browser', JSON.parse(content));
                    }
                    break;
                case 'text':
                    {
                        const content = _.get(item, 'content');
                        console.log('TEXT content:', content);
                        this.navigation && this.navigation.navigate('Notifications', JSON.parse(content));
                    }
                    break
                case 'page':
                    {
                        const content = JSON.parse(_.get(item, 'content'))
                        const page = plusString.classify(_.get(content, 'page', 'notifications')); // 将字符串转换为"类名式"
                        const params = _.get(content, 'params', {});

                        // 统一 uri 格式：page://tweets?type=success
                        // interface Params {
                        //     [propName: string]: any;
                        // }
                        // let params: Params = {};

                        // let page;
                        // let uri = JSON.parse(_.get(item, 'content', ''));
                        // uri = uri.replace('page://', '');
                        // page = _.avatar(uri.split('?'));
                        // page = plusString.classify(page); // 将字符串转换为"类名式"
                        // // uri 中带有 '?' 时去 uri 获取参数
                        // if (uri.indexOf("?") !== -1) {
                        //     let str = uri.substr(uri.indexOf("?") + 1); // 剔除第一个'?'前的部分（包括'?'）
                        //     let strs = str.split(/[&?]/);
                        //     for (let i = 0; i < strs.length; i++) {
                        //         params[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
                        //     }
                        // }

                        console.log("PAGE:", page, params);
                        this.navigation && this.navigation.navigate(page, params);
                    }
                    break;
            }
            // if(!_.get(item, 'page')){
            //     const params = _.get(item, 'params');
            //     if (params) {
            //         this.navigation.navigate('MessageScene', params);
            //     } else {
            //         this.navigation.navigate('MessageScene');
            //     }
            //     return;
            // }
            // this.navigation.navigate(_.get(item, 'page'), _.get(item, 'params'));
        }, 200);
    }
}

const pushController = new PushController();
export default pushController;
