import {
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface ISignupStyle {
  container: ViewStyle;
  inputInner: ViewStyle;
  input: ViewStyle;
  verifyCodeBtn: ViewStyle;
  verifyCodeBtnText: TextStyle;
  verifyCodeBtnDisable: ViewStyle;
  verifyCodeBtnTextDisable: TextStyle;
  signupBtn: ViewStyle;
  signupBtnDisable: ViewStyle;
  signupBtnTextActive: TextStyle;
  signupBtnTextInactive: TextStyle;
}

const style: ISignupStyle = {
  container: {
    // flex: 1,
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
  verifyCodeBtnText: {
    color: color.theme,
  },
  verifyCodeBtnDisable: {
    borderColor: color.lightFont,
  },
  verifyCodeBtnTextDisable: {
    color: color.lightFont,
  },
  signupBtn: {
    height: screen.width * 0.12,
    // backgroundColor: color.btn,
    borderWidth: 0,
  },
  signupBtnDisable: {
    height: screen.width * 0.12,
    backgroundColor: color.btnDisable,
    borderWidth: 0,
  },
  signupBtnTextActive: {
    color: color.btnTextActive,
  },
  signupBtnTextInactive: {
    color: color.btnTextInactive,
  },
};

const indicatorStyles = StyleSheet.create<ISignupStyle>(style);

export default indicatorStyles;
