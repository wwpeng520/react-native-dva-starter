import { ViewStyle, TextStyle, Platform } from 'react-native';
import screen from '../../../utils/screen';

export interface IDetailCellStyle {
  container: ViewStyle,

}

export default {
  container: {
    backgroundColor: 'white',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 24,
    paddingRight: 24,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  arrow: {
    width: 5,
    marginLeft: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 7,
    marginTop: 7,
    marginBottom: 7,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        borderRadius: 25,
      },
      android: {
        borderRadius: screen.width,
      },
    }),
  },
  subimage: {
    width: 50,
    height: 50,
    marginRight: 7,
    marginTop: 7,
    marginBottom: 7,
  }
};
