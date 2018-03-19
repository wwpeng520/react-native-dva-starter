import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import indicatorStyle, { ITextStyle } from './style';
import PropTypes from './prop-types';

export interface ITextProps extends PropTypes {
}

const indicatorStyles = StyleSheet.create<any>(indicatorStyle);

export function Heading1({style, ...props}: any): any {
  return <Text style={[indicatorStyles.Heading1, style]} {...props} />
}

export function Heading2({style, ...props}: any): any {
  return <Text style={[indicatorStyles.Heading2, style]} {...props} />
}

export function Name({style, ...props}: any): any {
  return <Text style={[indicatorStyles.name, style]} {...props} />
}

export function Name1({style, ...props}: any): any {
  return <Text style={[indicatorStyles.name1, style]} {...props} />
}

export function LittleName({style, ...props}: any): any {
  return <Text style={[indicatorStyles.littleName, style]} {...props} />
}

export function ExtraText({style, ...props}: any): any {
  return <Text style={[indicatorStyles.extraText, style]} {...props} />
}

export function PersonDateBig({style, ...props}: any): any {
  return <Text style={[indicatorStyles.person1, style]} {...props} />
}

export function PersonDateSmall({style, ...props}: any): any {
  return <Text style={[indicatorStyles.person2, style]} {...props} />
}

export function FliterSelected({style, ...props}: any): any {
  return <Text style={[indicatorStyles.fliterSelected, style]} {...props} />
}

export function FliterUnSelected({style, ...props}: any): any {
  return <Text style={[indicatorStyles.fliterUnSelected, style]} {...props} />
}

export function Paragraph({style, ...props}: any): any {
  return <Text style={[indicatorStyles.p, style]} {...props} />
}

export function Tip({style, ...props}: any): any {
  return <Text style={[indicatorStyles.tip, style]} {...props} />
}

export function AboutBig({style, ...props}: any): any {
  return <Text style={[indicatorStyles.aboutBig, style]} {...props} />
}

export function AboutSmall({style, ...props}: any): any {
  return <Text style={[indicatorStyles.aboutSmall, style]} {...props} />
}
