import { 
  ViewStyle, 
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../config/color';
// import screen from '../../../utils/screen';

export interface IMainTabsStyle {
  container: ViewStyle;
}

const style: IMainTabsStyle = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
};

const indicatorStyles = StyleSheet.create<IMainTabsStyle>(style);

export default indicatorStyles;
