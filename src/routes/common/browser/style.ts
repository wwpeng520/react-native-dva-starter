/**
 * 访问 web 页面
 */

import {
  ViewStyle,
  TextStyle,
  StyleSheet,
  WebView,
} from 'react-native';
import * as _ from 'lodash';
import screen from '../../../utils/screen';
import color from '../../../config/color';

export interface IBrowserStyle {
  container: ViewStyle;
  error: ViewStyle;
  errorText: TextStyle;
}


const style: IBrowserStyle = {
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  error: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    width: screen.width,
  },
  errorText: {
    textAlign: 'center',
    color: '#222',
    fontSize: 16,
  },
};

const indicatorStyles = StyleSheet.create<IBrowserStyle>(style);

export default indicatorStyles;
