import * as React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native';
import * as _ from 'lodash';
import { SafeAreaView } from 'react-navigation';

import indicatorStyles, { IResetPasswordStyle } from './style';
import { IResetPasswordProps } from './prop-types';

import { Button, WhiteSpace, WingBlank, List, InputItem, Toast } from 'antd-mobile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import color from '../../../config/color';
import screen from '../../../utils/screen';
import { NavigationActions } from 'react-navigation';
import { connect } from 'dva-no-router';
import { Scope } from "../../../constants"
import { encrypt } from '../../../utils/encrypt';
import Separator from '../../../components/common/separator';
import Icomoon from 'react-native-vector-icons/Icomoon';
import tokenStore from "../../../lib/token";
import CONFIG from '../../../config/config';
import { parseJwtPayload } from '../../../utils/parse-jwt';
import BackBtn from '../../../components/common/back-btn';
import { buttonStyle, inputItemStyle } from '../../../utils/redefine-antm-style';
import mObserver from '../../../lib/mObserver';

@connect(({ user, dispatch }: IResetPasswordProps) => ({ user, dispatch }))
export default class ResetPassword extends React.PureComponent<IResetPasswordProps, any> {
  static defaultProps = {
  };

  static navigationOptions = ({ navigation }: any) => ({
    title: "修改密码",
    headerLeft: <BackBtn dispatch navigation={navigation} />,
    headerRight: <View />
  });

  constructor(props: IResetPasswordProps) {
    super(props);
    this.state = {
      newPassword: '',
      oldPassword: '',
      scope: '', // 验证上一次登录的方式： password_login/sms_login
    }
  }

  async componentWillMount() {
    const token = await tokenStore.getSessionToken();
    let accessToken = token && token.accessToken ? token.accessToken : '';
    const jwt = parseJwtPayload(accessToken);

    if (!jwt && !jwt.scope) {
      this.props.navigation.navigate('Sign', {});
      return;
    }

    this.setState({ scope: jwt.scope })
  }

  ResetPassword = async () => {
    // const token = await tokenStore.getSessionToken();
    // let accessToken = token && token.accessToken ? token.accessToken : '';
    // const jwt = parseJwtPayload(accessToken);

    // if (!jwt && !jwt.scope) {
    //   this.props.navigation.navigate('Sign', {});
    //   return;
    // }

    if (this.state.scope === 'password_login' && !this.state.oldPassword) {
      return Toast.info("您还未输入原密码", 2);
    }

    if (this.state.newPassword.length < 6) {
      return Toast.info("新密码太过简单，不能少于6位", 2);
    }

    let userInfo;
    if (this.state.scope === "password_login") {
      userInfo = {
        login_type: Scope.PASSWORD_LOGIN,
        new_password: this.state.newPassword,
        old_password: this.state.oldPassword
      }
    } else {
      userInfo = {
        login_type: Scope.SMS_LOGIN,
        new_password: this.state.newPassword,
      }
    }

    const result = await this.props.dispatch({ type: 'user/resetPassword', payload: userInfo });
    if (result && result.data && result.data.result) {
      Toast.success('修改密码成功', 2, () => { }, true);
      this.props.navigation.goBack();
      mObserver.setEvent("ResetPassword");
    } else {
      const msg = _.get(result, 'data.error.message', '未知错误');
      Toast.fail(msg, 2);
    }
  }

  render() {
    // console.log(this.props.navigation.state)
    const { newPassword, oldPassword, scope } = this.state;
    const passwordIcon = <Icomoon name="lock" size={screen.width * 0.05} color={color.offBlue} />
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

              {/* 原密码输入框(验证码登录跳转修改页面或验证码登录后手动修改时都不显示) */}
              {scope === "password_login" && <View>
                <View style={indicatorStyles.inputInner}>
                  <List>
                    <InputItem
                      styles={StyleSheet.create(inputItemStyle)}
                      style={indicatorStyles.input}
                      type="password"
                      name="password"
                      labelNumber={2}
                      placeholder="原密码"
                      onChange={(val: string) => {
                        this.setState({ oldPassword: val });
                      }}
                    >{passwordIcon}</InputItem>
                  </List>
                </View>
                <WhiteSpace size="lg" />
              </View>}

              {/* 密码输入框 */}
              <View style={indicatorStyles.inputInner}>
                <List>
                  <InputItem
                    styles={StyleSheet.create(inputItemStyle)}
                    style={indicatorStyles.input}
                    type="password"
                    name="password"
                    labelNumber={2}
                    placeholder="新密码 不少于6位"
                    onChange={(val: string) => {
                      this.setState({ newPassword: val });
                    }}
                  >{passwordIcon}</InputItem>
                </List>
              </View>
              <WhiteSpace size="lg" />

              {/* 确认修改按钮 */}
              <Button type="primary"
                styles={StyleSheet.create(buttonStyle)}
                style={newPassword && (scope === 'password_login' ? oldPassword : true) ? indicatorStyles.resetBtn : indicatorStyles.resetBtnDisable}
                onClick={this.ResetPassword}
              >确认修改</Button>
              <WhiteSpace />

              {/* 忘记密码(手机验证码登录时不显示) */}
              {scope === "password_login" && <View style={indicatorStyles.ignoreResetContainer}>
                <Button type="ghost" inline size="small"
                  styles={StyleSheet.create(buttonStyle)}
                  style={indicatorStyles.ignoreResetBtn}
                  onClick={() => {
                    this.props.navigation.navigate('VerifyPhone', {});
                  }}
                >
                  <Text style={indicatorStyles.ignoreResetText}>忘记密码？</Text>
                </Button>
              </View>}

              {/* 跳过修改(手机验证码登录时显示) */}
              {scope === "sms_login" && _.get(this.props.navigation, 'state.params.from') === 'signin-with-sms' && <View style={indicatorStyles.ignoreResetContainer}>
                <Button type="ghost" inline size="small"
                  styles={StyleSheet.create(buttonStyle)}
                  style={indicatorStyles.ignoreResetBtn}
                  onClick={() => {
                    this.props.navigation.goBack();
                  }}
                >
                  <Text style={indicatorStyles.ignoreResetText}>跳过修改</Text>
                </Button>
              </View>}

            </WingBlank>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
