/**
 * 获取用户 token
 */

import tokenStore from "./token";
import { mRefreshToken } from "../services/auth";

interface Tokens {
  accessToken?: string;
  refreshToken?: string;
}

// 处理需要 token 的网络请求，access_token 过期时自动用 refresh_token 自动重新获取 token，再重新进行数据请求
export function requestWithToken(promiseFunc: any) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await tokenStore.getSessionToken();
      let accessToken = token && token.accessToken ? token.accessToken : "";
      try {
        let res = await promiseFunc(accessToken);
        return resolve(res);
      } catch (e) {
        console.log('error: ', e);
        // 如果 http 请求抛出的异常是个正常的 json， 就直接把它抛出，否则更新 token
        if (typeof (e) === "object" &&
          Object.prototype.toString.call(e).toLowerCase() === "[object object]" && !e.length) {
          return reject(e);
        }

        //accessToken 过期时重新获取
        if (token && token.refreshToken) {
          try {
            let newTokens = await mRefreshToken(token.refreshToken);
            tokenStore.storeSessionToken({
              accessToken: newTokens.access_token,
              refreshToken: newTokens.refresh_token
            });

            let promiseRes = await promiseFunc(newTokens.access_token);
            console.log('promiseRes: ', promiseRes);
            return resolve(promiseRes);
          } catch (e) {
            return reject(e);
          }
        } else {
          return reject(e);
        }
      }
    } catch (e) {
      console.log('GET USER TOKEN ERROR: ', e);
      return reject(e);
    }
  });
}

// export function requestWithToken(promiseFunc: any) {
//   return new Promise((resolve, reject) => {
//     // 从本地获取 accessToken
//     tokenStore.getSessionToken()
//       .then((tokens: Tokens) => {
//         let accessToken = tokens ? tokens.accessToken : "";
//         promiseFunc(accessToken)
//           .then((res: any) => {
//             console.log(res);
//             resolve(res);
//           })
//           .catch((error: any) => {
//             console.log('error: ', error);
//             // 如果 http 请求抛出的异常是个正常的 json， 就直接把它抛出，否则更新 token
//             if (typeof (error) === "object" &&
//               Object.prototype.toString.call(error).toLowerCase() === "[object object]" && !error.length) {
//               console.log('error1: ', error);
//               reject(error);
//             }

//             //accessToken 过期时重新获取
//             if (tokens && tokens.refreshToken) {
//               mRefreshToken(tokens.refreshToken)
//                 .then((newTokens: any) => {
//                   console.log('refreshToken: ');
//                   // 保存到本地 localStorage
//                   tokenStore.storeSessionToken({
//                     accessToken: newTokens.access_token,
//                     refreshToken: newTokens.refresh_token
//                   });
//                   // global.accessToken = newTokens.access_token;
//                   return promiseFunc(newTokens.access_token)
//                     .then((promiseRes: any) => {
//                       resolve(promiseRes);
//                     })
//                     .catch((error: any) => {
//                       reject(error);
//                     })
//                 })
//                 .catch((error: any) => {
//                   reject(error);
//                 })
//             } else {
//               reject(error);
//             }
//           })
//       })
//       .catch((error: any) => {
//         reject(error);
//       });
//   });
// }
