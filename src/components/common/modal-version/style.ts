import {
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface IModalVersionStyle {
  container: ViewStyle;
  modalContent: ViewStyle;
  scrollView: ViewStyle;
  titleArea: ViewStyle;
  forceUpdateTip: TextStyle;
  footerBtn: ViewStyle;
}

export const CONTENT_WIDTH = 0.8 * screen.width;
export const CONTENT_HEIGHT = 0.45 * screen.width;

const style: IModalVersionStyle = {
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: CONTENT_WIDTH,
    // height: CONTENT_HEIGHT,
    maxHeight: CONTENT_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: screen.width * 0.03,
    overflow: 'hidden',
  },
  scrollView: {
    width: CONTENT_WIDTH,
    height: CONTENT_HEIGHT,
    padding: screen.width * 0.03,
    paddingTop: 0,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  titleArea: {
    width: CONTENT_WIDTH,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  forceUpdateTip: {
    color: 'orange',
    fontStyle: 'italic',
  },
  footerBtn: {
    width: CONTENT_WIDTH,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
};

const indicatorStyles = StyleSheet.create<IModalVersionStyle>(style);

export default indicatorStyles;
