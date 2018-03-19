import * as WeChat from 'react-native-wechat';
import { Toast } from 'antd-mobile';
let resolveAssetSource = require('resolveAssetSource');

export enum ShareType {
    WechatSession = 1,
    WechatTimeline,
}

WeChat.registerApp('wx6c1dc17af8ab4dcb').then((res: any) => {
    console.log('### TONGBUQUAN ### registerApp', res);
}).catch((e: any) => {
    console.log('### TONGBUQUAN ### registerApp error', e);
})

// Code example to share text notifications:
export async function shareText(content: string, type: ShareType) {
    try {
        const isWXAppInstalled = await WeChat.isWXAppInstalled();
        if (!isWXAppInstalled) {
            return Toast.fail('请先安装微信', 2);
        }
        let shareObj = {
            type: 'text',
            description: content,
        }
        if (type == ShareType.WechatSession) {
            const result = await WeChat.shareToSession(shareObj);
        } else if (type == ShareType.WechatTimeline) {
            const result = await WeChat.shareToTimeline(shareObj);
        }
        setTimeout(function () {
            Toast.success('分享成功', 2);
        }, 500);
    } catch (e) {
        setTimeout(function () {
            Toast.success('分享失败', 2);
        }, 500);
    }
}

//shareImage(require("../../../../assets/weibo_logo.png"), ShareType.WechatSession)
export async function shareImage(imageResource: any, type: ShareType) {
    try {
        const isWXAppInstalled = await WeChat.isWXAppInstalled();
        if (!isWXAppInstalled) {
            return Toast.fail('请先安装微信', 2);
        }
        let shareObj = {
            type: 'imageResource',
            imageUrl: resolveAssetSource(imageResource).uri
        }
        if (type == ShareType.WechatSession) {
            const result = await WeChat.shareToSession(shareObj);
        } else if (type == ShareType.WechatTimeline) {
            const result = await WeChat.shareToTimeline(shareObj);
        }
        setTimeout(function () {
            Toast.success('分享成功', 2);
        }, 500);
    } catch (e) {
        setTimeout(function () {
            Toast.success('分享失败', 2);
        }, 500);
    }
}

//imageResource 是否自带网页缩略图 可为null
export async function shareWebPage(title: string, desc: string, url: string, type: ShareType, imageResource?: any) {
    console.log('ShareType -->:', ShareType)
    try {
        const isWXAppInstalled = await WeChat.isWXAppInstalled();
        if (!isWXAppInstalled) {
            return Toast.fail('请先安装微信', 2);
        }
        let shareObj = {
            type: 'news',
            title: title,
            description: desc,
            webpageUrl: url,
            thumbImage: null
        }
        if (imageResource) {
            shareObj.thumbImage = resolveAssetSource(imageResource).uri
        }
        if (type == ShareType.WechatSession) {
            console.log('### TONGBUQUAN before WeChat.shareToSession: ');
            const result = await WeChat.shareToSession(shareObj);
            console.log('### TONGBUQUAN WeChat.shareToSession successful:', result);
        } else if (type == ShareType.WechatTimeline) {
            console.log('### TONGBUQUAN before WeChat.shareToTimeline: ');
            const result = await WeChat.shareToTimeline(shareObj);
            console.log('### TONGBUQUAN WeChat.shareToTimeline successful:', result);
        }
        setTimeout(function () {
            Toast.success('分享成功', 2);
        }, 500);
    } catch (e) {
        console.log('### TONGBUQUAN shareWebPage error: ', e);
        setTimeout(function () {
            Toast.success('分享失败', 2);
        }, 500);
    }
}
