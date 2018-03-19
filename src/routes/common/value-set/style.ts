import {
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface IValueSetStyle {
  container: ViewStyle;
  navTitle: TextStyle;
}


const style: IValueSetStyle = {
  container: {
    flex: 1,
    backgroundColor: color.background,

  },
  navTitle: {
    backgroundColor: color.wechatGreen, 
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 3,
    color: '#fff',
    
  },
};

const indicatorStyles = StyleSheet.create<IValueSetStyle>(style);

export default indicatorStyles;
