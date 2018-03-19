import { ViewStyle, TextStyle } from 'react-native';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface ITextStyle {
  [propName: string]: TextStyle;
}

export default {
  Heading1: {
    fontSize: screen.width * 0.045,
    lineHeight: screen.width * 0.08,
    fontWeight: 'bold',
    color: '#222222',
  },
  Heading2: {
    fontSize: screen.width * 0.04,
    lineHeight: screen.width * 0.08,
    color: '#222222',
  },
  name: {
    fontSize: screen.width * 0.04,
    lineHeight: screen.width * 0.06,
    color: '#474747',
  },
  name1: {
    fontSize: screen.width * 0.035,
    lineHeight: screen.width * 0.06,
    color: '#666',
  },
  littleName: {
    fontSize: screen.width * 0.028,
    lineHeight: screen.width * 0.045,
    color: '#b5b5b5',
    fontWeight: '300',
  },
  extraText: {
    fontSize: screen.width * 0.031,
    lineHeight: screen.width * 0.045,
    color: '#777',
    fontWeight: '300',
  },
  person1: {
    fontSize: 24,
    color: color.banner
  },
  person2: {
    fontSize: 16,
    color: color.banner
  },
  p: {
    fontSize: screen.width * 0.039,
    color: '#222',
    lineHeight: screen.width * 0.05,
    fontWeight: '300'
  },
  tip: {
    fontSize: 13,
    color: '#999999'
  },

  fliterSelected: {
    fontSize: 13,
    color: color.banner,
  },
  fliterUnSelected: {
    fontSize: 13,
    color: '#474747',
  },

  aboutBig: {
    fontSize: 0.058 * screen.width,
    color: '#474747'
  },
  aboutSmall: {
    fontSize: 0.034 * screen.width,
    color: '#474747'
  },
};
