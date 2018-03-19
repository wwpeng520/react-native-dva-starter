
// 隐藏手机号中间4位
export function hidePhone(phone: string | number) {
  let str = typeof phone === 'number' ? phone.toString() : phone;
  return `${str.substr(0, 3)}****${str.substr(7, 4)}`;
};
