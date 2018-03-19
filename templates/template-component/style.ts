import { 
  ViewStyle, 
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
// import screen from '../../../utils/screen';

export interface I{{classBaseName}}Style {
  container: ViewStyle;
}


const style: I{{classBaseName}}Style = {
  container: {
    flex: 1,
    backgroundColor: color.background,
    
  },
};

const indicatorStyles = StyleSheet.create<I{{classBaseName}}Style>(style);

export default indicatorStyles;
