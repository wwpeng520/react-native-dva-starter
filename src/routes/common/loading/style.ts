import { 
  ViewStyle, 
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
// import screen from '../../../utils/screen';

export interface ILoadingStyle {
  container: ViewStyle;
}


const style: ILoadingStyle = {
  container: {
    flex: 1,
    backgroundColor: color.background,
    
  },
};

const indicatorStyles = StyleSheet.create<ILoadingStyle>(style);

export default indicatorStyles;
