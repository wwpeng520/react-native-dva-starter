import { ViewStyle, TextStyle } from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';


export interface ISeparatorStyle {
  line: ViewStyle,
}

export default {
  line: {
    width: screen.width,
    height: screen.onePixel,
    backgroundColor: color.lightBorder,
  },
};
