import * as React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
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

import indicatorStyles, { ISigninPwdStyle } from './style';
import { ISigninPwdProps } from './prop-types';
import BackBtn from '../../../components/common/back-btn';
import { buttonStyle, inputItemStyle } from '../../../utils/redefine-antm-style';
import pushController from '../../../lib/jpush';
import mObserver from '../../../lib/mObserver';
import tokenStore from "../../../lib/token";

function checkValidPhone(phone: string) {
  const re = /^1\d{10}$/;
  return re.test(phone.toString());
}

@connect(({ user, dispatch }: ISigninPwdProps) => ({ user, dispatch }))
export default class SigninPwd extends React.PureComponent<ISigninPwdProps, any> {
  static defaultProps = {
  };

  static navigationOptions = ({ navigation }: { navigation: any }) => ({
    title: '密码登录',
    headerLeft: <BackBtn dispatch navigation={navigation} />,
    headerRight: <View />
  });

  constructor(props: ISigninPwdProps) {
    super(props);
    this.state = {
      phone: '',
      password: '',
    }
  }

  async componentDidMount() {
    const userPhone = await tokenStore.getSessionUserPhone();
    console.log('userPhone: ', userPhone)
    if (userPhone) this.setState({ phone: userPhone });
  }

  login = async () => {
    if (!this.state.phone || !checkValidPhone(this.state.phone)) {
      return Toast.info('请输入正确的手机号', 2);
    }
    if (!this.state.password) {
      return Toast.info('密码为空', 2);
    }

    const password = await encrypt(this.state.password);
    const userInfo = {
      username: this.state.phone,
      password: this.state.password,
      grant_type: Scope.PASSWORD,
      scope: Scope.PASSWORD_LOGIN,
    }

    await this.props.dispatch({ type: 'user/login', payload: { userInfo, from: 'password-login' } });
    const { user } = this.props;
    if (user.userId || user.username) {
      Toast.success('登录成功', 2, () => { }, true);

      pushController.setUser(user);
      mObserver.setEvent("Login", { type: "password" });
    } else {
      const errCode = _.get(user, 'errCode');
      if (errCode === 400) {
        return Toast.fail('帐号或密码错误', 2);
      }
      const msg = _.get(user, 'errMsg', '未知错误');
      Toast.fail(msg, 2);
    }
  }

  render() {
    const { phone, password } = this.state;
    const { user, navigation } = this.props;
    const btnActive = phone && password;
    const phoneIcon = <Icomoon name="phone" size={screen.width * 0.05} color={color.offBlue} />
    const passwordIcon = <Icomoon name="lock" size={screen.width * 0.05} color={color.offBlue} />
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={indicatorStyles.container}>
          <Separator />
          <KeyboardAwareScrollView
            style={{ backgroundColor: color.background }}
            resetScrollToCoords={{ x: 0, y: 0 }}
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
                    labelNumber={2}
                    placeholder="输入手机号码"
                    value={phone}
                    onChange={(val: string) => {
                      this.setState({ phone: val });
                    }}
                  >{phoneIcon}</InputItem>
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
                    placeholder="输入密码"
                    onChange={(val: string) => {
                      this.setState({ password: val });
                    }}
                  >{passwordIcon}</InputItem>
                </List>
              </View>
              <WhiteSpace size="lg" />

              {/* 登录按钮 */}
              <Button type="primary"
                styles={StyleSheet.create(buttonStyle)}
                disabled={user.isFetching}
                style={btnActive ? indicatorStyles.loginBtn : indicatorStyles.loginBtnDisable}
                onClick={this.login}
              >
                {user.isFetching ? '登录中' : '登录'}
              </Button>
              <WhiteSpace />

            </WingBlank>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
