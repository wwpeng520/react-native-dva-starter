import { 
  ViewStyle, 
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
// import screen from '../../../utils/screen';

export interface IBaseImageStyle {
  container: ViewStyle;
}


const style: IBaseImageStyle = {
  container: {
    flex: 1,
    backgroundColor: color.background,
    
  },
};

const indicatorStyles = StyleSheet.create<IBaseImageStyle>(style);

export default indicatorStyles;
