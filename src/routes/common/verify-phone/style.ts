import {
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface IVerifyPhoneStyle {
  container: ViewStyle;
  scrollView: ViewStyle;
  inputInner: ViewStyle;
  input: ViewStyle;
  verifyCodeBtn: ViewStyle;
  verifyCodeBtnDisable: ViewStyle;
  loginBtn: ViewStyle;
  loginBtnDisable: ViewStyle;
  loginBtnText: TextStyle;
  loginBtnTextDisable: TextStyle;
}

const style: IVerifyPhoneStyle = {
  container: {
    flex: 1,
    backgroundColor: color.background
  },
  scrollView: {

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
    padding: 0,
    margin: 0,
  },
  verifyCodeBtn: {
    borderColor: color.theme,
  },
  verifyCodeBtnDisable: {
    borderColor: color.lightFont,
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
  loginBtnText: {
    color: color.theme,
  },
  loginBtnTextDisable: {
    color: color.lightFont,
  },
};

const indicatorStyles = StyleSheet.create<IVerifyPhoneStyle>(style);

export default indicatorStyles;
