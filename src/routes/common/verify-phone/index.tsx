/**
 * 密码登录后，修改密码时点击忘记密码跳转到此页，验证手机号
 */

import * as React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Button, WhiteSpace, WingBlank, List, InputItem, Toast } from 'antd-mobile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import color from '../../../config/color';
import screen from '../../../utils/screen';
import { connect } from 'dva-no-router';
import { Scope } from "../../../constants";
import { encrypt } from '../../../utils/encrypt';
import Separator from '../../../components/common/separator';
import * as _ from 'lodash';
import Icomoon from 'react-native-vector-icons/Icomoon';
import { SafeAreaView } from 'react-navigation';

import indicatorStyles, { IVerifyPhoneStyle } from './style';
import { IVerifyPhoneProps } from './prop-types';
import BackBtn from '../../../components/common/back-btn';
import { buttonStyle, inputItemStyle } from '../../../utils/redefine-antm-style';
import pushController from '../../../lib/jpush';
import mObserver from '../../../lib/mObserver';

function checkValidPhone(phone: string) {
  const re = /^1\d{10}$/;
  return re.test(phone.toString());
}

@connect(({ user, dispatch }: IVerifyPhoneProps) => ({ user, dispatch }))
export default class VerifyPhone extends React.PureComponent<IVerifyPhoneProps, any> {
  static defaultProps = {
  };

  static navigationOptions = ({ navigation }: { navigation: any }) => ({
    title: '验证手机号',
    headerLeft: <BackBtn dispatch navigation={navigation} />,
    headerRight: <View />
  });
  interval: any;

  constructor(props: IVerifyPhoneProps) {
    super(props);
    this.state = {
      verifyCode: '',

      hasSent: false,
      hasSentOnce: false, // 是否发送过一次，用以决定是否自动点击确认登录按钮
      remindTime: 0,
      loginBtnDisable: false,
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  loginWithSMS = async () => {
    if (!this.state.verifyCode) {
      return Toast.info('请输入验证码', 2);
    }
    if (this.state.verifyCode.length !== 6) {
      return Toast.info('请输入6位数验证码', 2);
    }
    const userInfo = {
      username: this.props.user.phone,
      password: `sms_verify_code_${this.state.verifyCode}`,
      grant_type: Scope.PASSWORD,
      scope: Scope.SMS_LOGIN,
    }

    await this.setState({ loginBtnDisable: true });
    const verifyRes = await this.props.dispatch({ type: 'user/login', payload: { userInfo, from: 'verify-phone' } });
    console.log('verifyRes: ', verifyRes);
    await this.setState({ loginBtnDisable: false });
    if (!verifyRes) {
      return;
    } else if (_.get(verifyRes, 'username')) {
      Toast.success('验证手机成功', 2);
      mObserver.setEvent("ResetPasswordWithSMS");
    } else {
      Toast.fail(_.get(verifyRes, 'error.message', '未知错误'), 2);
    }
  }

  // 发送验证码
  sendVerifyCode = async () => {
    // Keyboard.dismiss();  // 收起软键盘
    const res = await this.props.dispatch({ type: 'user/sendLoginVerifyCode', payload: this.props.user.phone });
    console.log('sendLoginVerifyCode res in sigin-sms:', res)
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
        this.setState((prevState: any, props: IVerifyPhoneProps) => ({
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
    const { verifyCode, hasSent, hasSentOnce, loginBtnDisable } = this.state;
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

              {/* 手机号输入框 */}
              <View style={indicatorStyles.inputInner}>
                <List>
                  <InputItem
                    styles={StyleSheet.create(inputItemStyle)}
                    style={indicatorStyles.input}
                    name="phone"
                    labelNumber={2}
                    editable={false}
                    value={this.props.user.phone}
                    extra={sendbtn}
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
                    }}
                    onBlur={() => {
                      if (hasSentOnce && verifyCode.length === 6) {
                        this.loginWithSMS();
                      }
                    }}
                  >{verifyCodeIcon}</InputItem>
                </List>
              </View>
              <WhiteSpace size="lg" />

              {/* 登录按钮 */}
              <Button type="primary"
                styles={StyleSheet.create(buttonStyle)}
                disabled={loginBtnDisable}
                style={verifyCode ? indicatorStyles.loginBtn : indicatorStyles.loginBtnDisable}
                onClick={this.loginWithSMS}
              >确认</Button>
              <WhiteSpace />

            </WingBlank>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
