import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  Linking,
} from 'react-native';
import { connect } from 'dva-no-router';
import { SafeAreaView } from 'react-navigation';
import { ActivityIndicator, Button, WingBlank, WhiteSpace, Modal, List, Toast } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
const Alert = Modal.alert;

import indicatorStyles, { ISettingStyle } from './style';
import { ISettingProps } from './prop-types';
import { NavigationActions } from 'react-navigation';
import VersionModal from '../../../components/common/modal-version';
import CONFIG from '../../../config/config';
import { API_URL } from '../../../constants';
import { listStyle, buttonStyle } from '../../../utils/redefine-antm-style';
import mObserver from '../../../lib/mObserver';

import screen from '../../../utils/screen';
import color from '../../../config/color';
import Separator from '../../../components/common/separator';
import BackBtn from '../../../components/common/back-btn';

const appVersion = {
  version: CONFIG.APP_VERSION,
  platform: Platform.OS,
  auto: false
};

@connect(({ user }: ISettingProps) => ({ user }))
export default class Setting extends React.PureComponent<ISettingProps, any> {
  static defaultProps = {
  };

  static navigationOptions = ({ navigation }: any) => ({
    title: "设置",
    headerLeft: <BackBtn dispatch navigation={navigation} />,
    headerRight: <View />
  });

  constructor(props: ISettingProps) {
    super(props);
    this.state = {
      versionUpdate: null,
      modalVisible: false,
      hasChecked: false, // 判断是否检查更新过，如已检查过则不再做 api 请求
    }
  }

  logout = () => {
    console.log('退出登录');
    this.props.dispatch({ type: 'user/logout' });
    this.props.navigation.navigate('Sign', { from: 'Setting' });
    mObserver.setEvent("logout");
  }

  colseModal = () => {
    this.setState({ modalVisible: false });
  }

  render() {
    const { dispatch, navigation } = this.props;
    const { versionUpdate, modalVisible } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={indicatorStyles.container}>
          <Separator />
          <WhiteSpace />

          {/* 更新提示 modal */}
          {!!versionUpdate && !!versionUpdate.version && modalVisible && <VersionModal dispatch={dispatch} navigation={navigation} style={{}}
            version={versionUpdate} onClose={this.colseModal}
          />}

          <List>
            <Item arrow="horizontal"
              styles={StyleSheet.create(listStyle)}
              onClick={() => {
                if (!this.props.user.username) {
                  this.props.navigation.navigate('Sign', {});
                } else {
                  this.props.navigation.navigate('ResetPassword', {});
                }
              }}
            >修改密码</Item>
            {/* <Item arrow="horizontal"
            styles={StyleSheet.create(listStyle)}
            onClick={() => {

            }}
          >清理缓存</Item> */}
            <Item arrow="horizontal"
              styles={StyleSheet.create(listStyle)}
              onClick={() => {
                Alert('提示', <Text style={{ lineHeight: screen.width * 0.06, fontSize: screen.width * 0.04 }}>多数问题都已在帮助中心有解决方法，您可以先在帮助中心查看。</Text>, [
                  {
                    text: '去看帮助', style: { fontSize: screen.width * 0.04 },
                    onPress: () =>
                      this.props.navigation.navigate('Browser', {
                        title: '帮助中心',
                        url: API_URL.HELP_URL
                      })
                  },
                  {
                    text: '看过了，还没解决', style: { color: '#333', fontSize: screen.width * 0.04 },
                    onPress: () =>
                      this.props.navigation.navigate('Browser', {
                        title: '意见反馈',
                        url: API_URL.FEEDBACK_URL
                      })
                  },
                  {
                    text: '取消', style: { color: '#333', fontSize: screen.width * 0.04 },
                    onPress: () => console.log('cancel')
                  },
                ])
              }}
            >问题反馈</Item>
          </List>
          <WhiteSpace />

          <List>
            <Item arrow="horizontal"
              styles={StyleSheet.create(listStyle)}
              onClick={async () => {
                let versionUpdate;
                if (!this.state.hasChecked) {
                  versionUpdate = await this.props.dispatch({ type: 'version/check', payload: appVersion });
                } else {
                  versionUpdate = this.state.versionUpdate;
                }
                if (versionUpdate && versionUpdate.version) {
                  this.setState({ versionUpdate, modalVisible: true, hasChecked: true });
                } else {
                  Toast.info('当前已是最新版本', 2);
                  this.setState({ hasChecked: true });
                }
              }}
            >检查更新</Item>
            <Item arrow="horizontal"
              styles={StyleSheet.create(listStyle)}
              onClick={() => {
                this.props.navigation.navigate('About', {});
                mObserver.setEvent("About");
              }}
            >关于xxx</Item>
          </List>
          <WhiteSpace />

          {!!this.props.user.username && this.props.user.logAction !== 'logout' && <Button type="warning"
            styles={StyleSheet.create(buttonStyle)}
            style={{ borderRadius: 0, position: 'absolute', bottom: 0, width: screen.width, height: screen.width * 0.15 }}
            onClick={this.logout}
          >退出登录</Button>}
        </View>
      </SafeAreaView>
    );
  }
}
