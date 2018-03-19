import {
  ViewStyle,
  TextStyle,
  StyleSheet,
  Platform,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface INotificationStyle {
  container: ViewStyle;
  topIcon: ViewStyle;
  topRight: ViewStyle;
}

const PADDING = screen.width * 0.025;

const style: INotificationStyle = {
  container: {
    flex: 1,
    // backgroundColor: color.background,
    backgroundColor: '#fff',
    // paddingTop: 10,
    // marginTop: 0.02 * screen.height,
    ...Platform.select({
      ios: {
        marginTop: 0,
      },
      android: {
        marginTop: 12,
      },
    }),
  },
  topIcon: {
    position: 'absolute',
    // top: 0.03 * screen.height,
    height: 0.065 * screen.height,
    width: 0.065 * screen.height,
    zIndex: 9,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'transparent',
  },
  topRight: {
    position: 'absolute',
    // top: 0.03 * screen.height,
    right: 0,
    padding: screen.padding,
    zIndex: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const indicatorStyles = StyleSheet.create<INotificationStyle>(style);

export default indicatorStyles;
