import {
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface IInputWithButtonStyle {
  inputOutter: ViewStyle;
  input: TextStyle;
  btn: ViewStyle;
  btnTitle: TextStyle;
}

const style: IInputWithButtonStyle = {
  inputOutter: {
    overflow: 'hidden',
    borderRadius: screen.width * 0.02,
    borderWidth: screen.onePixel,
    borderColor: color.theme,
    height: screen.height * 0.065,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 4,
    padding: 0,
    paddingLeft: screen.width * 0.03,
    paddingRight: screen.width * 0.03,
    textAlign: 'center',
    fontSize: screen.width * 0.05,
    color: '#333',
  },
  btn: {
    flex: 1,
    borderRadius: 0,
    borderWidth: 0,
  },
  btnTitle: {
    fontSize: screen.width * 0.045,
    color: '#fff',
  }
};

const indicatorStyles = StyleSheet.create<IInputWithButtonStyle>(style);

export default indicatorStyles;
