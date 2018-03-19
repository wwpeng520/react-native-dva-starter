/**
 * 状态栏上的跳转页面标签
 */

import * as React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'dva-no-router';

import indicatorStyles, { INavigationItemStyle } from './style';
import { INavigationItemProps } from './prop-types';

@connect()
export default class NavigationItem extends React.PureComponent<INavigationItemProps, any> {
  constructor(props: INavigationItemProps) {
    super(props);
  }

  render() {
    const { disabled, onPress, icon, iconStyle, title, titleStyle } = this.props;
    return (
      <TouchableOpacity
        style={indicatorStyles.container}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}>

        {icon && <Image style={[indicatorStyles.icon, iconStyle]} source={icon} />}

        {title && <Text style={[indicatorStyles.title, titleStyle]}>{title}</Text>}

      </TouchableOpacity>
    );
  }
}
