/**
 * 定制自己需要的 antd-mobile 样式
 * 
 * 使用方式：
 * import { Button } from 'antd-mobile';
 * import { inputItemStyle } from '../../../utils/redefine-antm-style';
 * ...
 * render() {
 *  ....
 *  <List renderHeader={() => '基本'}>
 *    <InputItem styles={inputItemStyle} placeholder="自定义 input 样式">Name</InputItem>
 *    <InputItem styles={StyleSheet.create(badgeStyle)} placeholder="自定义 input 样式">Name</InputItem>
 *  </List>
 *}
 */

import { Dimensions, Platform, PixelRatio } from 'react-native'
import ModalStyle from 'antd-mobile/lib/modal/style/index.native';
import ButtonStyle from 'antd-mobile/lib/button/style/index.native';
import InputItemStyle from 'antd-mobile/lib/input-item/style/index.native';
import ListStyle from 'antd-mobile/lib/list/style/index.native';
import BadgeStyle from 'antd-mobile/lib/badge/style/index.native';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ONEPIXEL = 1 / PixelRatio.get();

export const buttonStyle = {
  ...ButtonStyle,
  // primaryHighlight: {
  //   ...ButtonStyle.primaryHighlight,
  //   backgroundColor: 'red',
  // },
  largeRaw: { // 大按钮
    ...ButtonStyle.largeRaw,
    height: HEIGHT * 0.065, // 0.07
  },
  largeRawText: {
    ...ButtonStyle.largeRawText,
    fontSize: WIDTH * 0.045,
  }
}

export const modalStyle = {
  ...ModalStyle,
  header: {
    ...ModalStyle.header,
    fontSize: WIDTH * 0.045,
    // your custom style here
  }
}

export const inputItemStyle = {
  ...InputItemStyle,
  input: {
    ...InputItemStyle.input,
    fontSize: WIDTH * 0.04,
    fontWeight: '300',
  },
  text: {
    ...InputItemStyle.text,
    fontSize: WIDTH * 0.034,
    fontWeight: '300',
    marginRight: WIDTH * 0.02,
  },
  // container的flexDirection和alignItems出错？
  // container: {
  //   ...InputItemStyle.container,
  // flexDirection: 'row',
  // alignItems: 'center'
  // },
}

export const listStyle: any = {
  ...ListStyle,
  Item: {
    ...ListStyle.Item,
    borderBottomWidth: ONEPIXEL,
    borderBottomColor: '#ddd',
  },
  Line: { // 左侧有空隙的下边框
    ...ListStyle.Line,
    borderBottomWidth: 0,
  },
  BriefText: { // Brief 说明文字
    ...ListStyle.BriefText,
    fontSize: WIDTH * 0.035,
  },
  Content: { // 左侧文字
    fontSize: WIDTH * 0.04,
    color: '#333',
  },
}

export const badgeStyle: any = {
  ...BadgeStyle,
  textDom: {
    ...BadgeStyle.textDom,
    top: -8,
  },
  text: {
    ...BadgeStyle.text,
    fontSize: WIDTH * 0.03,
  },
  dot: {
    ...BadgeStyle.dot,
    right: -9,
  }
}

