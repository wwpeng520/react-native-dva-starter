import moment from "moment";
const { Auth, ImgOps, Conf, Rs, Rpc } = require("react-native-qiniu");
import CONFIG from "../config/config";
import ImageResizer from "react-native-image-resizer";

Conf.ACCESS_KEY = CONFIG.QINIU_AK;
Conf.SECRET_KEY = CONFIG.QINIU_SK;
Conf.UP_HOST = "http://up-z2.qiniu.com";

interface Image {
    width: number;
    height: number;
    uri: string;
    fileName?: string;
}
export async function uploadImage(filename: string, image: Image, compressHeight: number) {
    console.log(image)
    const timeStamp = moment().valueOf();
    const key = `${filename}_${timeStamp}.jpg`;
    const putPolicy = new Auth.PutPolicy2({ scope: `${CONFIG.QINIU_BUCKET}:${key}` });
    const uptoken = putPolicy.token();
    const formInput = {
        key,
        // formInput对象如何配置请参考七牛官方文档“直传文件”一节 
    };
    let compressWidth = -1;
    if (image.width && image.height) {
        compressWidth = (compressHeight / image.height) * image.width;
    }


    console.log('### image.uri ###', image);
    let resizedImageUri;

    try {
        console.log('ImageResizer')
        console.log(ImageResizer)
        resizedImageUri = await ImageResizer.createResizedImage(image.uri, compressWidth, compressHeight, "JPEG", 80);
    } catch (error) {
        console.log("compress error");
        return null;
    }

    try {
        await Rpc.uploadFile(resizedImageUri.uri, uptoken, formInput);
        console.log("upload success", CONFIG.QINIU_BASE_URL + key)
        return CONFIG.QINIU_BASE_URL + key;
    } catch (e) {
        console.log('upload failed', e);
        return null;
    }
}
