/**
 * 屏幕属性：高度，宽度，1像素，顶部状态栏高度
 */

import { Dimensions, Platform, PixelRatio } from 'react-native'

export default {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    onePixel: 1 / PixelRatio.get(),
    statusBarHeight: (Platform.OS === 'ios' ? 20 : 0),
    padding: 0.03 * Dimensions.get('window').width  // 统一设置页面的边距
}
