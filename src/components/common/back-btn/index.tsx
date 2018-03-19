/**
 * 顶部后退按钮
 */

import * as React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'dva-no-router';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

import indicatorStyles, { IBackBtnStyle } from './style';
import { IBackBtnProps } from './prop-types';

import screen from '../../../utils/screen';
import color from '../../../config/color';

@connect()
export default class BackBtn extends React.PureComponent<IBackBtnProps, any> {
  constructor(props: IBackBtnProps) {
    super(props);
  }

  goBack = () => this.props.navigation.goBack();

  render() {
    const { onPress, title, titleStyle, iconColor, navigation } = this.props;
    return (
      <TouchableOpacity
        style={indicatorStyles.container}
        onPress={onPress ? onPress : this.goBack}>

        <SimpleIcon name="arrow-left" size={screen.width * 0.05} color={iconColor ? iconColor : color.theme} />

        {title && <Text style={[indicatorStyles.title, titleStyle]}>{title}</Text>}

      </TouchableOpacity>
    );
  }
}
