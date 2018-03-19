import {
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface ISigninStyle {
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

  forgetContainer: ViewStyle;
  forgetBtn: ViewStyle;
  forgetBtnText: TextStyle;
}

const style: ISigninStyle = {
  container: {
    // flex: 1,
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
  forgetContainer: {
    alignItems: 'flex-end',
  },
  forgetBtn: {
    borderWidth: 0,
    width: 80,
  },
  forgetBtnText: {
    // color: color.theme,
  }
  
};

const indicatorStyles = StyleSheet.create<ISigninStyle>(style);

export default indicatorStyles;
