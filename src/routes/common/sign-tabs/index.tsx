/**
 * 登录/注册页面，顶部有注册和登录的tabs，点击不同tab显示不同
 */

import * as React from 'react';
import {
  View,
  Text,
  Keyboard,
  StatusBar,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import { SafeAreaView } from 'react-navigation';

import indicatorStyles, { ISignStyle } from './style';
import { ISignProps } from './prop-types';

import Signin from '../../../components/common/signin-in-tabs';
import Signup from '../../../components/common/signup-in-tabs';
import Separator from '../../../components/common/separator';
import color from '../../../config/color';
import { connect } from 'dva-no-router';
import BackBtn from '../../../components/common/back-btn';

@connect(({ user, dispatch }: ISignProps) => ({ user, dispatch }))
export default class Sign extends React.PureComponent<ISignProps, any> {
  static defaultProps = {
  };

  static navigationOptions = ({ navigation }: { navigation?: any }) => ({
    title: "同步圈",
    headerLeft: <BackBtn dispatch navigation={navigation} />,
    headerRight: <View />
  });

  constructor(props: ISignProps) {
    super(props);
  }

  render() {
    const { user, dispatch, navigation } = this.props;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={indicatorStyles.container}>
          <Separator />

          <ScrollableTabView
            style={{}}
            initialPage={1}
            tabBarUnderlineStyle={indicatorStyles.tabBarUnderlineStyle}
            tabBarTextStyle={indicatorStyles.tabBarText}
            tabBarBackgroundColor={'#fff'}
            tabBarActiveTextColor={'#333'}
            tabBarInactiveTextColor={'#777'}
            renderTabBar={() => <DefaultTabBar />}>
            <Signup tabLabel="注册" user={user} dispatch={dispatch} navigation={navigation} />
            <Signin tabLabel="登录" user={user} dispatch={dispatch} navigation={navigation} />
          </ScrollableTabView>

        </View>
      </SafeAreaView>
    );
  }
}
