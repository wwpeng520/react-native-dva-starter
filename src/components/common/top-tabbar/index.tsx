/**
 * 定制顶部导航按钮
 */

import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'dva-no-router';
import { WhiteSpace } from 'antd-mobile';

import indicatorStyles, { ITabBarStyle } from './style';
import { ITabBarProps } from './prop-types';

import screen from '../../../utils/screen';
import color from '../../../config/color';
import { Heading1, Heading2, Name, ExtraText } from '../text';

@connect()
export default class TabBar extends React.PureComponent<ITabBarProps, any> {
  constructor(props: ITabBarProps) {
    super(props);
  }

  componentDidMount() {
    // this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
  }

  setAnimationValue({ value }: any) {
    console.log('value ->', value)
  }

  render() {
    const { tabs, activeTab, goToPage, scrollValue, style } = this.props;
    // console.log(activeTab, scrollValue);
    return (
      <View style={[indicatorStyles.tabs, style]}>
        {tabs.map((tab: string, i: number) => {
          let borderLeftWidth, borderRightWidth;
          if (i === 0) {
            borderLeftWidth = screen.onePixel * 2;
            borderRightWidth = 0;
          } else if (i === tabs.length - 1) {
            borderLeftWidth = 0;
            borderRightWidth = screen.onePixel * 2;
          } else {
            borderLeftWidth = i === 1 ? screen.onePixel * 2 : 0;
            borderRightWidth = screen.onePixel * 2;
          }

          const tabStyles = {
            borderTopLeftRadius: i === 0 ? 10 : 0,
            borderBottomLeftRadius: i === 0 ? 10 : 0,
            borderTopRightRadius: i === tabs.length - 1 ? 10 : 0,
            borderBottomRightRadius: i === tabs.length - 1 ? 10 : 0,
            backgroundColor: activeTab === i ? color.theme : 'transparent',
            // 在真机是有bug：阴影
            // borderLeftWidth: i === tabs.length - 1 ? 0 : screen.onePixel * 2,
            // borderRightWidth: i !== 0 ? screen.onePixel * 2 : 0,

            borderRightWidth: borderRightWidth,
            borderLeftWidth: borderLeftWidth,
            // marginRight: 10
          }
          const tabTextStyles = {
            color: activeTab === i ? '#fff' : color.theme,
            fontSize: screen.width * 0.033,
          }

          return (
            <TouchableOpacity key={tab}
              onPress={() => this.props.goToPage(i)}
              style={[indicatorStyles.tab, tabStyles]} >
              <Text style={[tabTextStyles,]}>{tab}</Text>
            </TouchableOpacity>
          )
        })}
        <WhiteSpace style={{ backgroundColor: '#fff' }} />
      </View>
    );
  }
}
