import {
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface ISettingStyle {
  container: ViewStyle;
  listTitle: TextStyle;
  logoutBtn: ViewStyle;
  logoutBtnText: TextStyle;
}

const style: ISettingStyle = {
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  listTitle: {
    fontSize: screen.width * 0.04,
    color: color.darkFont,
  },
  logoutBtn: {
    marginTop: screen.width * 0.06,
    backgroundColor: color.btn,
    borderWidth: 0,
    height: screen.width * 0.12,
  },
  logoutBtnText: {
    // color: color.theme,
    fontSize: screen.width * 0.045,
  },
};

const indicatorStyles = StyleSheet.create<ISettingStyle>(style);

export default indicatorStyles;
