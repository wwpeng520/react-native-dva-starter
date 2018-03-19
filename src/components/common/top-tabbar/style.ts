import {
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface ITabBarStyle {
  tabs: ViewStyle;
  tab: ViewStyle;
}

const style: ITabBarStyle = {
  tabs: {
    height: screen.width * 0.1,
    flexDirection: 'row',
    borderWidth: 0,
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    borderBottomWidth: screen.onePixel,
    borderBottomColor: '#ccc',
  },
  tab: {
    minWidth: screen.width * 0.2,
    height: screen.width * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: screen.width * 0.05,
    paddingRight: screen.width * 0.05,
    borderWidth: screen.onePixel * 2,
    overflow: 'hidden',
  },
};

const indicatorStyles = StyleSheet.create<ITabBarStyle>(style);

export default indicatorStyles;
