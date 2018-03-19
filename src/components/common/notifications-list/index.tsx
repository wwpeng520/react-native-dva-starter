import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { connect } from 'dva-no-router';
import * as _ from 'lodash';
import moment from "moment";
import 'moment/locale/zh-cn';
const plusString = require('node-plus-string');
import mObserver from '../../../lib/mObserver';

import { ActivityIndicator, WhiteSpace, List, Toast, Button, Modal, Badge } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
import { INotificationState, INotification } from '../../../models/notifications';

import indicatorStyles, { IUserNotificationsStyle } from './style';
import { INotificationProps } from '../../../routes/common/notifications/prop-types';
import { Heading2, Name, Paragraph, ExtraText } from '../text';
import { listStyle, modalStyle } from '../../../utils/redefine-antm-style';

import screen from '../../../utils/screen';
import color from '../../../config/color';
import { NotificationType, SnsType } from "../../../constants";

@connect(({ user, config }: INotificationProps) => ({ user, config }))
export default class UserNotifications extends React.Component<INotificationProps, any> {
  static defaultProps = {
  };

  constructor(props: INotificationProps) {
    super(props);
    this.state = {
      isFetching: false,
      userNotificationsData: [],
      links: null, // links.next: 下一次请求的地址
      markRead: [],
      footerText: '正在加载...',
      modalVisible: _.get(props, 'initTitle') || _.get(props, 'modalContent'),
      modalTitle: '',
      modalContent: '',
    }
  }

  async componentDidMount() {
    this._init(true);
  }

  async componentWillReceiveProps(nextProps: INotificationProps) {
    if (nextProps.user.logAction === 'login' && nextProps.user.username !== this.props.user.username) {
      this._init();
    }
  }

  _init = async (init?: boolean) => {
    // this._onLoadingMore();
    await this.setState({ isFetching: true });

    const { initTitle, initContent, tabLabel, dispatch } = this.props;

    // 针对推送消息，有text类型消息推送时，进入Notifications页面，并Alert一个消息
    if (initTitle || initContent) {
      this.setState({
        modalVisible: true,
        modalTitle: initTitle,
        modalContent: initContent
      });
    }

    try {
      const type = tabLabel === '个人消息' ? 'user' : 'system';
      const last_id = -1;
      const payload = {
        last_id, type
      }
      const notifications = await dispatch({ type: 'notifications/getNotificationsWithPage', payload });
      // console.log('userNotificationsData: ', userNotifications);
      if (notifications) {
        this.setState({
          isFetching: false,
          userNotificationsData: [..._.get(notifications, 'data', [])],
          links: _.get(notifications, 'links'),
          footerText: _.get(notifications, 'links.next') ? '正在加载...' : '- 我是有底线的 -',
        });
      }
    } catch (e) {
      console.log('Home _onEndReached error: ', e);
      this.setState({ isFetching: false });
    }
  }

  _onLoadingMore = async () => {
    const { isFetching, links } = this.state
    if (isFetching || this.state.userNotificationsData.length < 10) { // 正在获取数据时返回或者展示数量少于服务器每次返回数量
      return;
    }

    if (links && !links.next) {
      return Toast.info('已加载全部', 2);
    }

    await this.setState({ isFetching: true });

    try {
      const payload = {
        next_link: _.get(this.state.links, 'next')
      }
      const notifications = await this.props.dispatch({ type: 'notifications/getNotificationsWithPage', payload });
      // console.log('userNotificationsData: ', userNotifications);
      if (notifications) {
        this.setState({
          isFetching: false,
          userNotificationsData: [...this.state.userNotificationsData, ..._.get(notifications, 'data', [])],
          links: _.get(notifications, 'links'),
          footerText: _.get(notifications, 'links.next') ? '正在加载...' : '- 我是有底线的 -',
        });
      }
    } catch (e) {
      console.log('Natifications _onEndReached error: ', e);
      this.setState({ isFetching: false });
    }
  }

  markRead = async (id: number, index: number) => {
    const type = _.get(this.props, 'tabLabel') === '个人消息' ? 'user' : 'system';
    const payload = {
      notification_ids: [id],
      type,
      mark_all: false,
    };
    const res = await this.props.dispatch({ type: 'notifications/markRead', payload });
    const markRead = this.state.markRead;
    markRead[index] = true;
    this.setState({ markRead });
    this.props.dispatch({ type: 'user/getUserInfo' });
  }

  _renderItem = ({ item, index }: { item: INotification, index: number }) => {
    // console.log(index, item)
    const { navigation, markAllRead } = this.props;
    return (
      <Item arrow="horizontal"
        styles={StyleSheet.create(listStyle)}
        style={{ paddingTop: screen.width * 0.01, paddingBottom: screen.width * 0.01, }}
        extra={<ExtraText>{moment(item.createdAt).fromNow()}</ExtraText>}
        onClick={() => {
          // 已读的消息不请求
          if (!item.isRead && !this.state.markRead[index]) {
            this.markRead(item.id, index);
          }

          console.log('####### item', item);
          switch (item.type) {
            case NotificationType.WechatBindSuccess: {
              const params = {
                type: 'wechat',
                account_id: _.get(item, 'content.id'),
              }
              navigation.navigate('LinkAccount', params);
              break;
            }
            case NotificationType.WeiboAuthExpiresoon:
            case NotificationType.WeiboAuthExpired: {
              const params = {
                type: 'weibo',
                account_id: _.get(item, 'content.id'),
              }
              navigation.navigate('LinkAccount', params);
              break;
            }
            case NotificationType.VipExpireSoon:
            case NotificationType.VipExpired: {
              if (!this.props.config.iOSVersionShResult || Platform.OS === 'android') {
                navigation.navigate('Pay', {});
                mObserver.setEvent("PayEntry");
              }
              break;
            }
            case NotificationType.SyncFailed: {
              navigation.navigate('Tweets', { type: 'fail' });
              break;
            }
            case 'webview':
            case NotificationType.GlobalLinkNotice: {
              navigation.navigate('Browser', {
                title: item.title || '浏览器',
                url: _.get(item, 'content.url'),
              })
              break;
            }
            case 'page': {
              const params = _.get(item, 'content.params');
              let page = _.get(item, 'content.page');
              if (page) page = plusString.classify(page); // 将字符串转换为"类名式"
              navigation.navigate(page, params);
              break;
            }
            default:
              let modalContent;
              if (typeof item.content === 'string') {
                modalContent = item.content;
              } else {
                modalContent = item.summary;
              }
              this.setState({
                modalVisible: true,
                modalTitle: item.title,
                modalContent
              });
          }
        }}
      >
        <Badge dot={!item.isRead && !this.state.markRead[index] && !markAllRead} style={{ marginTop: screen.width * 0.01 }}>
          <Text style={indicatorStyles.listTitle}>{item.title}</Text>
        </Badge>
        <Brief><Text style={indicatorStyles.brief}>{item.summary}</Text></Brief>
      </Item>
    );
  }

  _keyExtractor = (item: any, index: number) => item.id;

  onClose = () => {
    this.setState({ modalVisible: false });
  }

  render() {
    const { modalContent, modalTitle, modalVisible, isFetching, userNotificationsData, footerText } = this.state;
    // console.log('userNotificationsData: ', userNotificationsData);
    return (
      <View style={indicatorStyles.container}>

        {isFetching && <ActivityIndicator toast text="正在加载" />}

        {!!userNotificationsData.length && <FlatList
          data={userNotificationsData}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          refreshing={isFetching}
          onEndReached={this._onLoadingMore}
          onEndReachedThreshold={0.5}
          windowSize={4}
          ListFooterComponent={() => <Name style={{ fontSize: screen.width * 0.035, textAlign: 'center', lineHeight: screen.width * 0.06, marginBottom: screen.width * 0.01 }}>{footerText}</Name>}
        />}

        {!userNotificationsData.length && <List renderHeader={() => <WhiteSpace style={{ backgroundColor: color.background }} />}>
          <Item>
            <Text style={[indicatorStyles.listTitle, { marginTop: 0.01 * screen.width }]}>无消息</Text>
          </Item>
        </List>}

        <Modal
          styles={StyleSheet.create(modalStyle)}
          visible={modalVisible}
          transparent
          closable
          maskClosable={true}
          onClose={this.onClose}
          title={modalTitle}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <WhiteSpace size="lg" />
            <Name style={{ lineHeight: screen.width * 0.06, fontSize: screen.width * 0.038 }}>{modalContent}</Name>
          </ScrollView>
        </Modal>

      </View>
    );
  }
}
