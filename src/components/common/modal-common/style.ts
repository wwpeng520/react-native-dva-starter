import {
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface IModalBoxStyle {
  container: ViewStyle;
  modalContent: ViewStyle;
}

export const CONTENT_WIDTH = 0.8 * screen.width;
export const CONTENT_HEIGHT = 0.5 * screen.width;

const style: IModalBoxStyle = {
  container: {
    // borderWidth: 1,
    // width: screen.width-40,
    // height: screen.height-200,
    // overflow: 'hidden',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: CONTENT_WIDTH,
    height: CONTENT_HEIGHT,
    padding: screen.width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
};

const indicatorStyles = StyleSheet.create<IModalBoxStyle>(style);

export default indicatorStyles;
