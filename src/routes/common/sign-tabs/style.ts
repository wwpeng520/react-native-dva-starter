import {
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';
 
export interface ISignStyle {
  container: ViewStyle;
  tabBarUnderlineStyle: ViewStyle;
  tabBarText: TextStyle;
}

const style: ISignStyle = {
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  // Tab选中时下方横线的样式
  tabBarUnderlineStyle: {
    backgroundColor: color.theme,
    height: 2,
  },
  tabBarText: {
    fontSize: screen.width * 0.04,
    marginTop: screen.width * 0.02,
  },
};

const indicatorStyles = StyleSheet.create<ISignStyle>(style);

export default indicatorStyles;
