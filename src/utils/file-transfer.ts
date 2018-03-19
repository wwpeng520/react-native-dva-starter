import * as _ from 'lodash';
import { CError, CErrorCodes } from './CError';
var FileTransfer = require("@remobile/react-native-file-transfer");

export function downloadFile(url: string, filePath: string){
    return new Promise((resolve, reject) => {
        let fileTransfer = new FileTransfer();
        let uri = encodeURI(url);
        fileTransfer.onprogress = (progress: any) => console.log("1",progress.loaded+"/"+progress.total);
        fileTransfer.download(
            uri,
            filePath, //Platform.OS === "android" ? "/sdcard/data/" + fileName:"/Users/fang/oldwork/client/server/" + fileName,
            function(result: any) {
                resolve(result);
            },
            function(error: any) {
                reject(new CError(CErrorCodes.WeiboAPI.DownloadImageFailed));
            },
            true
        );
    });
}


export function uploadFile(url: any, filePath: any, options: any) {
    return new Promise((resolve, reject) => {
        var fileTransfer = new FileTransfer();
        fileTransfer.onprogress = (progress: any) => console.log("uploadFile ", progress);
        fileTransfer.upload(
            filePath, 
            encodeURI(url),
            (result: any)=>{
                resolve(result);
            }, 
            (error: any)=>{
                reject(error);
            }, 
            options, true);
    });
}
