import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'dva-no-router';
import TabNavigator from 'react-native-tab-navigator';
import * as _ from 'lodash';

import indicatorStyles, { IMainTabsStyle } from './style';
import { IMainTabsProps } from './prop-types';

import screen from '../../utils/screen';
import color from '../../config/color';
import Separator from '../../components/common/separator';
import BackBtn from '../../components/common/back-btn';
import Icomoon from 'react-native-vector-icons/Icomoon';
import { API_URL } from '../../constants'
import NavigationItem from '../../components/common/navigation-item'

const tab1Icon = require("../../../assets/images/tabbar/xifen.png");
const tab1ActiveIcon = require("../../../assets/images/tabbar/xifen-active.png");
const tab2Icon = require("../../../assets/images/tabbar/hufen.png");
const tab2ActiveIcon = require("../../../assets/images/tabbar/hufen-active.png");
const tab3Icon = require("../../../assets/images/tabbar/mine.png");
const tab3ActiveIcon = require("../../../assets/images/tabbar/mine-active.png");
import Tab1 from '../tab1/tab';
import Tab2 from '../tab2/tab';
import Tab3 from '../tab2/tab';

const basePx = 375
function px2dp(px: number) {
  return px * screen.width / basePx
}
const iconStyle = { width: px2dp(25), height: px2dp(25) };

@connect()
export default class MainTabs extends React.Component<IMainTabsProps, any> {

  static navigationOptions = ({ navigation }: any) => ({
    // header: null,
    title: _.get(navigation, 'state.params.title', 'TAB1'),
    headerLeft: <View />,
    headerRight: <NavigationItem
      dispatch
      navigation={navigation}
      IcomoonName={_.get(navigation, 'state.params.rightIconName')}
      IcomoonSize={screen.width * 0.06}
      IcomoonColor={'#fff'}
      onPress={_.get(navigation, 'state.params.iconOnPress')}
    />
  });

  state = {
    selectedTab: 'TAB1',
    badgeText3: 1,
  };

  constructor(props: IMainTabsProps) {
    super(props);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      title: 'TAB1',
      rightIconName: 'ask',
      iconOnPress: () => {
        
      }
    })
  }

  render() {
    return (
      <TabNavigator style={indicatorStyles.container}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'TAB1'}
          title="TAB1"
          titleStyle={{ color: color.tabbarInactiveColor }}
          selectedTitleStyle={{ color: color.tabbarActiveColor }}
          renderIcon={() => <Image source={tab1Icon} style={iconStyle} />}
          renderSelectedIcon={() => <Image source={tab1ActiveIcon} style={iconStyle} />}
          onPress={() => {
            this.setState({ selectedTab: 'TAB1' })
            this.props.navigation.setParams({
              title: 'TAB1',
              rightIconName: 'ask',
              iconOnPress: () => {
                
              }
            })
          }}>
          <Tab1 />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'TAB2'}
          title="TAB2"
          titleStyle={{ color: color.tabbarInactiveColor }}
          selectedTitleStyle={{ color: color.tabbarActiveColor }}
          renderIcon={() => <Image source={tab2Icon} style={iconStyle} />}
          renderSelectedIcon={() => <Image source={tab2ActiveIcon} style={iconStyle} />}
          onPress={() => {
            this.setState({ selectedTab: 'TAB2' })
            this.props.navigation.setParams({
              title: 'TAB2',
              rightIconName: 'share',
              iconOnPress: () => {
                
              }
            })
          }}>
          <Tab2 />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'TAB3'}
          title="TAB3"
          badgeText={this.state.badgeText3}
          titleStyle={{ color: color.tabbarInactiveColor }}
          selectedTitleStyle={{ color: color.tabbarActiveColor }}
          renderIcon={() => <Image source={tab3Icon} style={iconStyle} />}
          renderSelectedIcon={() => <Image source={tab3ActiveIcon} style={iconStyle} />}
          onPress={() => {
            this.setState({
              selectedTab: 'TAB3',
              badgeText3: null,
            })
            this.props.navigation.setParams({
              title: 'TAB3',
              rightIconName: 'setting',
              iconOnPress: () => {
              
              }
            })
          }}>
          <Tab2 />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}
