import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  Platform,
} from 'react-native';
import { connect } from 'dva-no-router';
import { SafeAreaView } from 'react-navigation';
import moment from "moment";
import * as _ from 'lodash';
import { WhiteSpace, List, Badge, Modal, Toast } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
const Alert = Modal.alert;
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';

import indicatorStyles, { INotificationStyle } from './style';
import { INotificationProps } from './prop-types';
import { INotification, INotificationState } from '../../../models/notifications';

import screen from '../../../utils/screen';
import color from '../../../config/color';
import Separator from '../../../components/common/separator';
import NavigationItem from '../../../components/common/navigation-item';
import { LittleName, Heading1, Heading2, Name, Paragraph } from '../../../components/common/text'
import NotificationsList from '../../../components/common/notifications-list';
import TabBar from '../../../components/common/top-tabbar';
import BackBtn from '../../../components/common/back-btn';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import Icomoon from 'react-native-vector-icons/Icomoon';

@connect(({ config, user, notifications }: INotificationProps) => ({ config, user, notifications }))
export default class Notification extends React.Component<INotificationProps, any> {
  static defaultProps = {
  };

  static navigationOptions = ({ navigation }: any) => ({
    // header: null,
    // headerStyle: { // 设置标题栏的样式对象
    //   backgroundColor: color.banner,
    //   borderBottomWidth: 0,
    //   elevation: 0,
    //   height: 0.065 * screen.height,
    //   marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    //   shadowColor: 'transparent',
    //   shadowRadius: 0,
    // },
    // title: "消息中心",
    // headerLeft: <BackBtn dispatch navigation={navigation} />,
    // headerRight: (
    // <NavigationItem
    //   dispatch
    //   navigation={navigation}
    //   title="一键已读"
    //   onPress={() => navigation.state.params.navigatePress()}
    // />
    // )
  });

  constructor(props: INotificationProps) {
    super(props);
    this.state = {
      currentType: 'user', // 标记全部已读时用
      userAllRead: false,
      systemAllRead: false,
    }
  }

  componentDidMount() {
    // this.props.navigation.setParams({ navigatePress: this.markAllRead });
  }

  markAllRead = async () => {
    const { currentType } = this.state;
    const payload = {
      notification_ids: [],
      type: currentType,
      mark_all: true,
    };
    const res = await this.props.dispatch({ type: 'notifications/markRead', payload });
    if (res && res.result) {
      Toast.info(`已标记所有${currentType === 'user' ? '个人' : '系统'}消息为已读`, 2);
      if (currentType === 'user') {
        this.setState({ userAllRead: true })
      } else {
        this.setState({ systemAllRead: true })
      }
      if (currentType === 'user') this.props.dispatch({ type: 'user/getUserInfo' });
    } else {
      Toast.fail(_.get(res, 'error.message', '未知错误'), 2);
    }
  }

  render() {
    const { dispatch, navigation, notifications, config } = this.props;
    // console.log('navigation: ', navigation);
    const initType = _.get(navigation, 'state.params.type', 'user'); // 进入页面可选择默认激活选项
    const initTitle = _.get(navigation, 'state.params.title'); // 进入页面可选择默认显示一条消息：标题
    const initContent = _.get(navigation, 'state.params.content'); // 进入页面可选择默认显示一条消息：内容

    return (
      <SafeAreaView style={indicatorStyles.container}>

        <View style={indicatorStyles.container}>
          {/* <Separator /> */}

          <TouchableHighlight underlayColor="transparent"
            onPress={() => navigation.goBack()}
            style={indicatorStyles.topIcon}
          >
            <SimpleIcon name="arrow-left" size={screen.width * 0.05} color={color.theme} />
          </TouchableHighlight>
          <TouchableHighlight underlayColor="transparent"
            onPress={this.markAllRead}
            style={indicatorStyles.topRight}
          >
            <Text style={{ fontSize: 0.035 * screen.width, color: '#555', marginLeft: 0.03 * screen.width }}>一键已读</Text>
          </TouchableHighlight>

          <ScrollableTabView

            initialPage={initType === 'user' ? 0 : 1}
            onChangeTab={async (opt: any) => {
              const currentIndex = _.get(opt, 'i');
              this.setState({ currentType: currentIndex === 0 ? 'user' : 'system' })
            }}
            renderTabBar={() => <TabBar tabs={['个人消息', '系统消息']} dispatch={dispatch} navigation={navigation}
              style={{ height: 0.06 * screen.height, alignItems: 'center' }} />}
          >
            <NotificationsList
              tabLabel="个人消息"
              markAllRead={this.state.userAllRead}
              notifications={notifications}
              dispatch={dispatch}
              navigation={navigation}
              initTitle={initType === 'user' ? initTitle : null}
              initContent={initType === 'user' ? initContent : null}
              user={this.props.user}
              config={config}
            />
            <NotificationsList
              tabLabel="系统消息"
              markAllRead={this.state.systemAllRead}
              notifications={notifications}
              dispatch={dispatch}
              navigation={navigation}
              initTitle={initType === 'system' ? initTitle : null}
              initContent={initType === 'system' ? initContent : null}
              user={this.props.user}
              config={config}
            />
          </ScrollableTabView>

        </View>
      </SafeAreaView>
    );
  }
}
