import { Buffer } from 'buffer';

export function parseJwtPayload(token: string) {
  if (!token) {
    return null;
  }
  let splits = token.split(".")
  if (splits.length < 3) {
    return null;
  }
  let tmp = new Buffer(splits[1], 'base64').toString();
  try {
    return JSON.parse(tmp)
  } catch (e) {
    return null;
  }
}
