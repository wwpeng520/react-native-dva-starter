import {
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface IResetPasswordStyle {
  container: ViewStyle;
  scrollView: ViewStyle;
  inputInner: ViewStyle;
  input: ViewStyle;
  resetBtn: ViewStyle;
  resetBtnDisable: ViewStyle;
  ignoreResetContainer: ViewStyle;
  ignoreResetBtn: ViewStyle;
  ignoreResetText: TextStyle;
}

const style: IResetPasswordStyle = {
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
  resetBtn: {
    height: screen.width * 0.12,
    // backgroundColor: color.btn,
    borderWidth: 0,
  },
  resetBtnDisable: {
    height: screen.width * 0.12,
    backgroundColor: color.btnDisable,
    borderWidth: 0,
  },
  ignoreResetContainer: {
    alignItems: 'flex-end',
  },
  ignoreResetBtn: {
    borderWidth: 0,
    width: 80,
  },
  ignoreResetText: {
    // color: color.theme,
  }
};

const indicatorStyles = StyleSheet.create<IResetPasswordStyle>(style);

export default indicatorStyles;
