import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { List, Button, WhiteSpace, WingBlank, Toast, InputItem } from 'antd-mobile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import indicatorStyles, { ISigninStyle } from './style';
import { ISignProps } from '../../../routes/common/sign-tabs/prop-types';

import color from '../../../config/color';
import screen from '../../../utils/screen';
import { NavigationActions } from 'react-navigation';
import { connect } from 'dva-no-router';
import { Scope } from "../../../constants";
import { encrypt } from '../../../utils/encrypt';
import * as _ from 'lodash';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icomoon from 'react-native-vector-icons/Icomoon';
import { Kohana, Hideo } from 'react-native-textinput-effects';
import { buttonStyle, inputItemStyle } from '../../../utils/redefine-antm-style';
import pushController from '../../../lib/jpush';
import mObserver from '../../../lib/mObserver';
import tokenStore from "../../../lib/token";

function checkValidPhone(phone: string) {
  const re = /^1\d{10}$/;
  return re.test(phone);
}

@connect(({ user, dispatch }: ISignProps) => ({ user, dispatch }))
export default class Signin extends React.PureComponent<ISignProps, any> {
  static defaultProps = {
  };

  interval: any;

  constructor(props: ISignProps) {
    super(props);
    this.state = {
      phone: '',
      verifyCode: '',

      hasSent: false,
      hasSentOnce: false,
      remindTime: 0,
      loginBtnDisable: false,
    }
  }

  async componentDidMount() {
    const userPhone = await tokenStore.getSessionUserPhone();
    console.log('userPhone: ', userPhone)
    if (userPhone) this.setState({ phone: userPhone });
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  loginWithSMS = async () => {
    if (!checkValidPhone(this.state.phone)) {
      return Toast.info('请输入正确的手机号', 2);
    }
    if (!this.state.verifyCode) {
      return Toast.info('请输入验证码', 2);
    }
    if (this.state.verifyCode.length !== 6) {
      return Toast.info('请输入6位数验证码', 2);
    }
    const userInfo = {
      username: this.state.phone,
      password: `sms_verify_code_${this.state.verifyCode}`,
      grant_type: Scope.PASSWORD,
      scope: Scope.SMS_LOGIN,
    }

    await this.setState({ loginBtnDisable: true });
    await this.props.dispatch({ type: 'user/login', payload: { userInfo } });
    if (this.props.user && this.props.user.userId) {
      pushController.setUser(this.props.user);
    }
    await this.setState({ loginBtnDisable: false });
    const user = this.props.user;
    if (user.userId || user.username) {
      Toast.success('登录成功', 2, () => { }, true);
      mObserver.setEvent("Login", { type: "sms" });
    } else {
      const errCode = _.get(user, 'errCode');
      if (errCode === 400) {
        return Toast.fail('手机号或验证码错误', 2);
      }
      const msg = _.get(user, 'errMsg', '未知错误');
      Toast.fail(msg, 2);
    }
  }

  // 发送验证码
  sendVerifyCode = async () => {
    // Keyboard.dismiss();  // 收起软键盘
    if (!checkValidPhone(this.state.phone)) {
      return Toast.info('请输入正确的手机号', 2);
    }
    const res = await this.props.dispatch({ type: 'user/sendLoginVerifyCode', payload: this.state.phone });
    const user = this.props.user;
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

  render() {
    const { user, navigation } = this.props;
    const { phone, verifyCode, hasSent, hasSentOnce, loginBtnDisable } = this.state;
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
      <KeyboardAwareScrollView
        style={{ backgroundColor: color.background }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={indicatorStyles.container}
        scrollEnabled={true}
      >
        <WingBlank size='lg'>
          <WhiteSpace size="xl" />

          {/* <Kohana
            style={indicatorStyles.inputInner}
            label={'手机'}
            labelStyle={[indicatorStyles.input, { top: -5, color: color.offBlue, }]}
            iconClass={FontAwesomeIcon}
            iconName={'mobile-phone'}
            iconColor={'#aaa'}
            iconSize={screen.width * 0.05}
            inputStyle={indicatorStyles.input}
            placeholder="输入手机号码"
            keyboardType="numeric"
            useNativeDriver
          />
          <WhiteSpace size="lg" />

          <Hideo
            style={indicatorStyles.inputInner}
            iconClass={FontAwesomeIcon}
            iconName={'mobile-phone'}
            iconColor={'#fff'}
            iconSize={screen.width * 0.08}
            iconBackgroundColor={color.offBlue}
            inputStyle={indicatorStyles.input}
            placeholder="输入手机号码"
            keyboardType="numeric"
          />
          <WhiteSpace size="lg" /> */}

          {/* 手机号输入框 */}
          <View style={indicatorStyles.inputInner}>
            <List>
              <InputItem
                styles={StyleSheet.create(inputItemStyle)}
                style={indicatorStyles.input}
                type="number"
                name="phone"
                labelNumber={2}
                editable={phoneEditable}
                placeholder="输入手机号码"
                value={phone}
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
                name="verifyCode"
                labelNumber={2}
                type="number"
                placeholder="输入验证码"
                onChange={(val: string) => {
                  this.setState({ verifyCode: val });
                }}
                onBlur={() => {
                  console.log('onBlur: ', hasSentOnce, verifyCode.length)
                  if (hasSentOnce && verifyCode.length === 6) {
                    this.loginWithSMS();
                  }
                }}
              >{verifyCodeIcon}</InputItem>
            </List>
          </View>

          {/* 忘记密码 */}
          <View style={indicatorStyles.forgetContainer}>
            <Button type="ghost" inline size="small"
              styles={StyleSheet.create(buttonStyle)}
              style={indicatorStyles.forgetBtn}
              onClick={() => {
                this.props.navigation.navigate('SigninPwd', {});
              }}
            >
              <Text style={indicatorStyles.forgetBtnText}>密码登录</Text>
            </Button>
          </View>
          <WhiteSpace size="lg" />

          {/* 登录按钮 */}
          <Button type="primary"
            styles={StyleSheet.create(buttonStyle)}
            disabled={loginBtnDisable}
            style={phone && verifyCode ? indicatorStyles.loginBtn : indicatorStyles.loginBtnDisable}
            onClick={this.loginWithSMS}
          >验证码登录</Button>
          <WhiteSpace />

        </WingBlank>
      </KeyboardAwareScrollView >
    );
  }
}

// export default Signin;
