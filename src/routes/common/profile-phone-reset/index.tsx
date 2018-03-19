/**
 * 修改手机号页面
 */

import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  InteractionManager,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'dva-no-router';
import { WhiteSpace, Toast, InputItem, List, Button, WingBlank } from 'antd-mobile';
import * as _ from 'lodash';
import Icomoon from 'react-native-vector-icons/Icomoon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import indicatorStyles, { IProfilePhoneResetStyle } from './style';
import { IProfilePhoneResetProps } from './prop-types';

import screen from '../../../utils/screen';
import color from '../../../config/color';
import Separator from '../../../components/common/separator';
import BackBtn from '../../../components/common/back-btn';
import { buttonStyle, inputItemStyle } from '../../../utils/redefine-antm-style';
import { ExtraText, Name } from '../../../components/common/text';
import NavigationItem from '../../../components/common/navigation-item';

function checkValidPhone(phone: string) {
  const re = /^1\d{10}$/;
  return re.test(phone.toString());
}

@connect(({ user }: IProfilePhoneResetProps) => ({ user }))
export default class ProfilePhoneReset extends React.Component<IProfilePhoneResetProps, any> {
  static defaultProps = {
  };

  static navigationOptions = ({ navigation }: any) => ({
    title: "修改手机号",
    headerLeft: <BackBtn dispatch navigation={navigation} />,
    headerRight: (
      // <Button size='small' type='primary'
      //   styles={StyleSheet.create(buttonStyle)}
      //   style={{ marginRight: 0.03 * screen.width }}
      //   disabled={!navigation.state.params.btnTouchable}
      //   onClick={() => {
      //     navigation.state.params.navigatePress();
      //   }}
      // >完成</Button>
      <NavigationItem
        dispatch
        navigation={navigation}
        title='完成'
        disabled={!navigation.state.params.btnTouchable}
        titleStyle={{ color: navigation.state.params.btnTouchable ? color.rightsBlue : '#999' }}
        onPress={() => navigation.state.params.navigatePress()}
      />
    )
  });

  interval: any;

  constructor(props: IProfilePhoneResetProps) {
    super(props);
    this.state = {
      newPhone: '',
      verifyCode: '',

      hasSent: false,
      hasSentOnce: false, // 是否发送过一次，用以决定是否自动点击确认登录按钮
      remindTime: 0,
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      InteractionManager.runAfterInteractions(() => this.props.navigation.setParams({ navigatePress: this._confirm }))
    } else {
      this.props.navigation.setParams({ navigatePress: this._confirm });
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  _confirm = async () => {
    if (!this.state.newPhone || !checkValidPhone(this.state.newPhone)) {
      return Toast.info('请输入正确的手机号', 2);
    }
    if (!this.state.hasSentOnce) {
      return Toast.info('请点击发送按钮并输入手机验证码', 2);
    }
    if (this.state.verifyCode.length !== 6) {
      return Toast.info('请输入6位数验证码', 2);
    }

    const newProfile = {
      new_phone: this.state.newPhone,
      verify_code: this.state.verifyCode,
      type: 'patch_phone',
    };
    console.log('patch phone newProfile: ', newProfile);
    const res = await this.props.dispatch({ type: 'user/editUserInfo', payload: newProfile });
    console.log('patch phone res: ', res);
    if (res && res.data && res.data.result) {
      Toast.success('修改成功', 2, () => { }, true);
      this.props.dispatch({ type: 'user/getUserInfo' }); // 重新获取个人信息
      this.props.navigation.goBack();
    } else {
      const msg = _.get(res, 'data.error.message', '修改手机失败，请稍后重试');
      Toast.fail(msg, 2);
    }
  }

  // 发送验证码
  sendVerifyCode = async () => {
    if (!this.state.newPhone || !checkValidPhone(this.state.newPhone)) {
      return Toast.info('请输入正确的手机号', 2);
    }
    const res = await this.props.dispatch({ type: 'user/sendPatchPhoneVerifyCode', payload: this.state.newPhone });
    console.log(res)
    if (res && res.data && res.data.result) {
      Toast.success('发送验证码成功', 2, () => { }, true);
      this.setState({
        hasSent: true,
        hasSentOnce: true,
        remindTime: 60,
      });
      this.interval = setInterval(() => {
        if (this.state.remindTime === 0) {
          this.setState({ hasSent: false });
          if (this.interval) {
            clearInterval(this.interval);
          }
          return;
        }
        this.setState((prevState: any, props: IProfilePhoneResetProps) => ({
          remindTime: prevState.remindTime - 1
        }));
      }, 1000)
    } else {
      this.setState({ hasSent: false });
      const msg = _.get(res, 'data.error.message', '未知错误');
      Toast.fail(msg, 2);
    }
  }

  render() {
    const { user, navigation } = this.props;
    const { newPhone, verifyCode, hasSent } = this.state;
    let phoneEditable: boolean = true;  // 手机号码输入框是否可编辑
    if (user.isFetching || hasSent) {
      phoneEditable = false;
    }

    // 发送验证码按钮
    const sendbtn = <Button type="ghost" inline size="small"
      styles={StyleSheet.create(buttonStyle)}
      style={hasSent ? indicatorStyles.verifyCodeBtnDisable : indicatorStyles.verifyCodeBtn}
      onClick={this.sendVerifyCode}
      disabled={hasSent}
    >
      <Text style={hasSent ? indicatorStyles.loginBtnTextDisable : indicatorStyles.loginBtnText}>
        {this.state.remindTime === 0 ? '发送' : `${this.state.remindTime}秒后重试`}
      </Text>
    </Button>
    const phoneIcon = <Icomoon name="phone" size={screen.width * 0.06} color={color.offBlue} />
    const verifyCodeIcon = <Icomoon name="verify" size={screen.width * 0.05} color={color.offBlue} />

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={indicatorStyles.container}>
          <Separator />
          <KeyboardAwareScrollView
            style={{ backgroundColor: color.background }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={indicatorStyles.scrollView}
            scrollEnabled={true}
          >
            <WingBlank size='lg'>
              <WhiteSpace size="xl" />

              <View style={indicatorStyles.inputInner}>
                <List>
                  <InputItem
                    styles={StyleSheet.create(inputItemStyle)}
                    style={indicatorStyles.input}
                    labelNumber={2}
                    editable={false}
                    placeholder={user.phone}
                  >{phoneIcon}</InputItem>
                </List>
              </View>
              <WhiteSpace size="lg" />

              {/* 手机号输入框 */}
              <View style={indicatorStyles.inputInner}>
                <List>
                  <InputItem
                    styles={StyleSheet.create(inputItemStyle)}
                    style={indicatorStyles.input}
                    type="number"
                    name="newPhone"
                    labelNumber={2}
                    editable={phoneEditable}
                    placeholder="输入新的手机号码"
                    extra={sendbtn}
                    onChange={(val: string) => {
                      this.setState({ newPhone: val });
                    }}
                    onBlur={() => {
                      if (checkValidPhone(newPhone)) {
                        this.sendVerifyCode();
                      }
                    }}
                  >{phoneIcon}</InputItem>
                </List>
              </View>
              <WhiteSpace size="lg" />

              {/* 验证码输入框 */}
              <View style={indicatorStyles.inputInner}>
                <List>
                  <InputItem
                    styles={StyleSheet.create(inputItemStyle)}
                    style={indicatorStyles.input}
                    name="verifyCode"
                    labelNumber={2}
                    type="number"
                    placeholder="输入验证码"
                    onChange={(val: string) => {
                      this.setState({ verifyCode: val });
                      this.props.navigation.setParams({ btnTouchable: true });
                    }}
                  >{verifyCodeIcon}</InputItem>
                </List>
              </View>
              <WhiteSpace size="lg" />

            </WingBlank>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
