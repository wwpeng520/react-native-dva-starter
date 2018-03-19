import {
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface IProfileStyle {
  container: ViewStyle;
  modalContent: ViewStyle;
  modalContentInner: ViewStyle;
  modalContainer: ViewStyle;
}


const style: IProfileStyle = {
  container: {
    flex: 1,
    backgroundColor: color.background,

  },
  modalContent: {
    width: 0.6 * screen.width,
    height: 0.6 * screen.width,
    borderWidth: screen.onePixel,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentInner: {
    width: 0.6 * screen.width,
    height: 0.6 * screen.width,
    borderWidth: screen.onePixel,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 0,
  },
};

const indicatorStyles = StyleSheet.create<IProfileStyle>(style);

export default indicatorStyles;
