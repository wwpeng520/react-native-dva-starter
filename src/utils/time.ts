import moment from "moment";

export function formatTime(time: string) {
  let now = moment();
  let toFormat = moment(time);
  if (toFormat.year() !== now.year()) {
      return toFormat.format("YYYY-MM-DD");
  }
  if (toFormat.dayOfYear() !== now.dayOfYear()) {
      return toFormat.format("MM-DD HH:mm");
  }
//   return "今天 " + toFormat.format("HH:mm");
  return toFormat.fromNow();
}

// 会员过期时间
export  function expiredString(expiredAt: string) {
  let expiredTime = moment(expiredAt);
  let expiredString;
  if (expiredTime > moment("2029-01-01")) {
    expiredString = "终身会员";
  } else {
    expiredString = expiredTime.format("LL");
  }
  return expiredString;
}
