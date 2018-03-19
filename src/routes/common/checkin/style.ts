import {
  ViewStyle,
  TextStyle,
  StyleSheet,
  Platform,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

// const mapColor = 'rgba(236,30,98,0.2)';
const mapColor = 'rgba(255, 153, 102, 0.3)';

export interface ICheckinStyle {
  container: ViewStyle;
  banner: ViewStyle;
  bannerBox: ViewStyle;
  signImage: ViewStyle;
  bigNumber: TextStyle;
  smallNumber: TextStyle;
  mapIcon: ViewStyle;
  descBox: ViewStyle;
  desc: TextStyle;
  calendarBox: ViewStyle;
  calendarLine: ViewStyle;
  lineBg: ViewStyle;
  rightBg: ViewStyle;
  leftBg: ViewStyle;
  calendarItem: ViewStyle;
  calendarSelectedTitle: TextStyle;
  calendarUnSelectedTitle: TextStyle;
  recommendHeader: ViewStyle;
  aboutItem: ViewStyle;
}

const style: ICheckinStyle = {
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  banner: {
    width: screen.width,
    height: 0.6086956 * screen.width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerBox: {
    position: 'absolute',
    top: 0.1 * 0.6086956 * screen.width,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screen.width,
    height: 0.75 * 0.6086956 * screen.width,
    overflow: 'hidden',
  },
  signImage: {
    width: 0.56 * screen.width,
    height: 0.172 * 0.56 * screen.width,
  },
  bigNumber: {
    fontSize: 0.12 * screen.width,
    fontWeight: 'bold',
    color: "#fff",
    backgroundColor: 'transparent',
  },
  smallNumber: {
    fontSize: 0.043 * screen.width,
    color: "#fff",
    backgroundColor: 'transparent',
  },
  mapIcon: {
    width: screen.width * 0.05,
    height: screen.width * 0.05,
    borderRadius: screen.width * 0.025,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  descBox: {
    backgroundColor: '#fff',
    width: screen.width,
    borderBottomWidth: screen.onePixel,
    borderColor: color.border,
    justifyContent: 'center',
    alignItems: 'center',
    height: 0.1 * screen.width,
  },
  desc: {
    fontSize: 0.033 * screen.width,
    color: color.theme,
  },
  calendarBox: {
    backgroundColor: '#fff',
    width: screen.width,
    // height: screen.height - 0.1 * screen.width - 0.6086956 * screen.width - 120,
    height: screen.width * 0.83,
    borderColor: color.border,
    borderBottomWidth: screen.onePixel,
    padding: screen.width * 0.03,
  },
  calendarLine: {
    flexDirection: 'row',
    width: screen.width * 0.94,
    // height: (screen.height - 0.1 * screen.width - 0.6086956 * screen.width - 140) / 5,
    height: screen.width * 0.165,
    justifyContent: 'space-between',
    position: 'relative',
  },
  lineBg: {
    position: 'absolute',
    height: screen.width * 0.025,
    backgroundColor: mapColor,
    left: 0.05 * screen.width,
    right: 0.05 * screen.width,
    top: 0.015 * screen.width,
  },
  rightBg: {
    position: 'absolute',
    width: screen.width * 0.025,
    backgroundColor: mapColor,
    right: 0.04 * screen.width,
    top: 0.03 * screen.width,
    bottom: -0.03 * screen.width,
  },
  leftBg: {
    position: 'absolute',
    width: 0.025 * screen.width,
    backgroundColor: mapColor,
    left: 0.04 * screen.width,
    top: 0.015 * screen.width,
    bottom: -0.03 * screen.width,
  },
  calendarItem: {
    alignItems: "center",
    width: 0.1 * screen.width,
    // borderWidth: 1, 
  },
  calendarSelectedTitle: {
    color: '#FF9900',
    fontSize: 0.036 * screen.width,
    fontWeight: 'bold',
    marginTop: screen.width * 0.015,
    backgroundColor: 'transparent',
  },
  calendarUnSelectedTitle: {
    color: '#ddd',
    fontSize: 0.036 * screen.width,
    fontWeight: 'bold',
    marginTop: screen.width * 0.015,
    backgroundColor: 'transparent',
  },
  recommendHeader: {
    backgroundColor: '#fff',
    height: screen.width * 0.12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: screen.onePixel,
    borderColor: color.border,
    paddingVertical: screen.width * 0.025,
    paddingLeft: screen.width * 0.03,
  },
  aboutItem: {
    backgroundColor: '#fff',
    padding: screen.width * 0.03,
    borderBottomWidth: screen.onePixel,
    borderColor: color.border,
  },
};

const indicatorStyles = StyleSheet.create<ICheckinStyle>(style);

export default indicatorStyles;
