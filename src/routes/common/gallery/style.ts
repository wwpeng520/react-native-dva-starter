import { 
  ViewStyle, 
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface IGalleryStyle {
  container: ViewStyle;
}


const style: IGalleryStyle = {
  container: {
    flex: 1,
    backgroundColor: color.background,
    
  },
};

const indicatorStyles = StyleSheet.create<IGalleryStyle>(style);

export default indicatorStyles;
