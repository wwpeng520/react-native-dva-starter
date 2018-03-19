import { 
  ViewStyle, 
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface IBackBtnStyle {
  container: ViewStyle;
  title: TextStyle;
}

const style: IBackBtnStyle = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0.03 * screen.width,
  },
  title: {
    fontSize: 0.035 * screen.width,
    color: '#555',
  },
};

const indicatorStyles = StyleSheet.create<IBackBtnStyle>(style);

export default indicatorStyles;
