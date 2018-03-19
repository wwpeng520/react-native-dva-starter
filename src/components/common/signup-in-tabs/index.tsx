import * as React from 'react';
import {
  View,
  Text,
  Image,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { List, Button, WhiteSpace, WingBlank, Toast, InputItem } from 'antd-mobile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'dva-no-router';
import { NavigationActions } from 'react-navigation';

import indicatorStyles, { ISignupStyle } from './style';
import { ISignProps } from '../../../routes/common/sign-tabs/prop-types';

import color from '../../../config/color';
import screen from '../../../utils/screen';
import * as _ from 'lodash';
import { encrypt } from '../../../utils/encrypt';
import { Scope, API_URL } from "../../../constants";
import Icomoon from 'react-native-vector-icons/Icomoon';
import { buttonStyle, inputItemStyle } from '../../../utils/redefine-antm-style';
import pushController from '../../../lib/jpush';
import mObserver from '../../../lib/mObserver';

function checkValidPhone(phone: string) {
  const re = /^1\d{10}$/;
  return re.test(phone.toString());
}

@connect(({ user, dispatch }: ISignProps) => ({ user, dispatch }))
export default class Signup extends React.PureComponent<ISignProps, any> {
  static defaultProps = {
  };
  interval: any;

  constructor(props: ISignProps) {
    super(props);
    this.state = {
      phone: "",
      verifyCode: "",
      password: "",
      inviteCode: "",

      hasSent: false, // 发送成功后 60s 后才可以重发
      remindTime: 0,
      signupBtnDisable: false,
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  // 发送验证码
  sendVerifyCode = async () => {
    // Keyboard.dismiss();  // 收起软键盘
    if (!this.state.phone || !checkValidPhone(this.state.phone)) {
      return Toast.info('请输入正确的手机号', 2);
    }

    const res = await this.props.dispatch({ type: 'user/sendSignupVerifyCode', payload: this.state.phone })
    const { user } = this.props;
    if (res && res.data && res.data.result) {
      Toast.success('发送验证码成功', 2, () => { }, true);
      this.setState({
        hasSent: true,
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
        this.setState((prevState: any, props: ISignProps) => ({
          remindTime: prevState.remindTime - 1
        }));
      }, 1000)
    } else {
      this.setState({ hasSent: false });
      const msg = _.get(res, 'data.error.message', '未知错误');
      Toast.fail(msg, 2);
    }

  }

  // 注册
  register = async () => {
    // console.log(this.state);
    if (!this.state.phone) {
      return Toast.info("手机号不能为空", 2);
    }
    if (!this.state.verifyCode) {
      return Toast.info("请输入验证码", 2);
    }
    if (!this.state.password) {
      return Toast.info("密码不能为空", 2);
    }
    if (this.state.password.length < 6) {
      return Toast.info("您设置的密码太过简单", 2);
    }

    const password = await encrypt(this.state.password);
    const signupInfo = {
      phone: this.state.phone,  // phone
      password: this.state.password,
      verify_code: this.state.verifyCode,
      invite_code: this.state.inviteCode,
      type: Scope.SMS_REGISTER,
    }
    await this.setState({ signupBtnDisable: true });
    const registerRes = await this.props.dispatch({ type: 'user/signup', payload: signupInfo });
    await this.setState({ signupBtnDisable: false });
    const { user } = this.props;
    console.log('registerRes in signup page: ', registerRes);
    if (registerRes && registerRes.data && registerRes.data.result) {
      mObserver.setEvent("Register");
      Toast.success('注册成功', 2, () => { }, true);
      const userInfo = {
        username: this.state.phone,  // username
        password: this.state.password,
        grant_type: Scope.PASSWORD,
        scope: Scope.PASSWORD_LOGIN,
      }
      // 注册后自动登录 
      await this.props.dispatch({ type: 'user/login', payload: { userInfo } });
      // this.props.dispatch({ type: 'user/init' });

      if (user && user.userId) {
        pushController.setUser(user);
      }
    } else {
      const errMsg = _.get(registerRes, 'data.error.message', '未知错误');
      Toast.fail(errMsg, 2);
    }
  }

  render() {
    const { user } = this.props;

    const { phone, verifyCode, password, remindTime, hasSent, signupBtnDisable } = this.state;
    const btnActive = phone && verifyCode && password;

    // 发送验证码按钮
    const sendbtn = <Button type="ghost" inline size="small"
      styles={StyleSheet.create(buttonStyle)}
      style={hasSent ? indicatorStyles.verifyCodeBtnDisable : indicatorStyles.verifyCodeBtn}
      onClick={this.sendVerifyCode}
      disabled={hasSent}
    >
      <Text style={hasSent ? indicatorStyles.verifyCodeBtnTextDisable : indicatorStyles.verifyCodeBtnText}>
        {remindTime === 0 ? '发送' : `${remindTime}秒后重试`}
      </Text>
    </Button>
    // 手机标识 common
    const phoneIcon = <Icomoon name="phone" size={screen.width * 0.055} color={color.offBlue} />
    const verifyCodeIcon = <Icomoon name="verify" size={screen.width * 0.05} color={color.offBlue} />
    const passwordIcon = <Icomoon name="lock" size={screen.width * 0.05} color={color.offBlue} />
    const inviteCodeIcon = <Icomoon name="invitation" size={screen.width * 0.045} color={color.offBlue} />

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: color.background }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={indicatorStyles.container}
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
                type="number"
                name="phone"
                editable={!hasSent}
                labelNumber={2}
                placeholder="输入手机号码"
                extra={sendbtn}
                onChange={(val: string) => {
                  this.setState({ phone: val });
                }}
                onBlur={() => {
                  if (checkValidPhone(phone)) {
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
                type="number"
                name="verifyCode"
                labelNumber={2}
                placeholder="输入验证码"
                onChange={(val: string) => {
                  this.setState({ verifyCode: val });
                }}
              >{verifyCodeIcon}</InputItem>
            </List>
          </View>
          <WhiteSpace size="lg" />

          {/* 密码输入框 */}
          <View style={indicatorStyles.inputInner}>
            <List>
              <InputItem
                styles={StyleSheet.create(inputItemStyle)}
                style={indicatorStyles.input}
                name="password"
                type="password"
                labelNumber={2}
                placeholder="输入密码(至少6位)"
                onChange={(val: string) => {
                  this.setState({ password: val });
                }}
              >{passwordIcon}</InputItem>
            </List>
          </View>
          <WhiteSpace size="lg" />

          {/* 邀请码输入框 */}
          <View style={indicatorStyles.inputInner}>
            <List>
              <InputItem
                styles={StyleSheet.create(inputItemStyle)}
                style={indicatorStyles.input}
                name="inviteCode"
                labelNumber={2}
                placeholder="输入邀请码(可不填)"
                onChange={(val: string) => {
                  this.setState({ inviteCode: val });
                }}
              >{inviteCodeIcon}</InputItem>
            </List>
          </View>

          {/* 注册问题 */}
          <View style={{ alignItems: 'flex-end' }}>
            <Button type="ghost" inline size="small"
              styles={StyleSheet.create(buttonStyle)}
              style={{ borderWidth: 0, width: 80 }}
              onClick={() => {
                this.props.navigation.navigate('Browser', {
                  title: '创建关联',
                  url: API_URL.REGISTER_HELP
                })
              }}
            >
              <Text>注册问题</Text>
            </Button>
          </View>
          <WhiteSpace size="lg" />

          {/* 注册按钮 */}
          <Button type="primary"
            styles={StyleSheet.create(buttonStyle)}
            disabled={signupBtnDisable}
            style={btnActive ? indicatorStyles.signupBtn : indicatorStyles.signupBtnDisable}
            onClick={this.register}
          >注册</Button>
          <WhiteSpace />

        </WingBlank>
      </KeyboardAwareScrollView>

    );
  }
}
