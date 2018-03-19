import {
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import screen from '../../../utils/screen';

export interface INavigationItemStyle {
  container: ViewStyle;
  icon: ViewStyle;
  title: TextStyle;
}

const style: INavigationItemStyle = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0.03 * screen.width,
  },
  icon: {
    width: 0.055 * screen.width,
    height: 0.055 * screen.width,
  },
  title: {
    fontSize: 0.035 * screen.width,
    color: '#555',
    marginLeft: 0.03 * screen.width,
  },
};

const indicatorStyles = StyleSheet.create<INavigationItemStyle>(style);

export default indicatorStyles;
