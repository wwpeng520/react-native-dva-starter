import {
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface ISigninPwdStyle {
  container: ViewStyle;
  inputInner: ViewStyle;
  input: ViewStyle;
  loginBtn: ViewStyle;
  loginBtnDisable: ViewStyle;
  
}

const style: ISigninPwdStyle = {
  container: {
    flex: 1,
    backgroundColor: color.background
  },
  inputInner: {
    flex: 1,
    height: screen.width * 0.12,
    borderRadius: 5,
    borderColor: color.inputBorder,
    borderWidth: screen.onePixel,
    overflow: "hidden",
    padding: 0,
  },
  input: {
    height: screen.width * 0.12,
    alignItems: 'center',
    // padding: 0,
    // margin: 0,
  },
  loginBtn: {
    height: screen.width * 0.12,
    // backgroundColor: color.btn,
    borderWidth: 0,
  },
  loginBtnDisable: {
    height: screen.width * 0.12,
    backgroundColor: color.btnDisable,
    borderWidth: 0,
  },
  
};

const indicatorStyles = StyleSheet.create<ISigninPwdStyle>(style);

export default indicatorStyles;
