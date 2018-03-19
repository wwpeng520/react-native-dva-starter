import {
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface IAboutStyle {
  container: ViewStyle;
  logoBox: ViewStyle;
  logo: ViewStyle;
  versionBox: ViewStyle;
  versionBg: ViewStyle;
  version: TextStyle;
  listIcon: ViewStyle;
  listTitle: TextStyle;
  copyright: TextStyle;
}


const style: IAboutStyle = {
  container: {
    flex: 1,
    backgroundColor: color.background,

  },
  logoBox: {
    width: screen.width,
    height: screen.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 0.3 * screen.width,
    height: 0.3 * screen.width,
  },
  versionBox: {
    width: 0.18 * screen.width,
    height: 0.18 * screen.width,
    position: 'absolute',
    top: 0.2 * screen.width,
    right: 0.22 * screen.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionBg: {
    width: 0.18 * screen.width,
    height: 0.18 * screen.width,
  },
  version: {
    position: 'absolute',
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
  },
  listIcon: {
    width: 0.055 * screen.width,
    height: 0.055 * screen.width,
  },
  listTitle: {
    marginLeft: 0.03 * screen.width,
    fontSize: 0.04 * screen.width,
    color: color.darkFont,
  },
  copyright: {
    width: screen.width,
    textAlign: 'center',
    position: "absolute",
    bottom: 0.03 * screen.width,
  }
};

const indicatorStyles = StyleSheet.create<IAboutStyle>(style);

export default indicatorStyles;
