import { 
  ViewStyle, 
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface IUserNotificationsStyle {
  container: ViewStyle;
  listTitle: TextStyle;
  brief: TextStyle;
}


const style: IUserNotificationsStyle = {
  container: {
    flex: 1,
    backgroundColor: color.background,
    
  },
  listTitle: {
    // marginTop: 0.005 * screen.width,
    marginBottom: 0.01 * screen.width,
    fontSize: screen.width * 0.04,
    color: color.darkFont,
  },
  brief: {
    fontSize: screen.width * 0.035,
    lineHeight: screen.width * 0.05,
    color: '#888',
  }
};

const indicatorStyles = StyleSheet.create<IUserNotificationsStyle>(style);

export default indicatorStyles;
