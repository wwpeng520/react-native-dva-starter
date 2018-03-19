import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  WebView,
  Platform,
} from 'react-native';
import { connect } from 'dva-no-router';
import { SafeAreaView } from 'react-navigation';
import * as _ from 'lodash';
import NavigationItem from '../../../components/common/navigation-item';
// import authTokenStore from '../../../lib/token';
import indicatorStyles, { IBrowserStyle } from './style';
import { IBrowserProps } from './prop-types';
const Share = require("react-native-share");
import CONFIG from '../../../config/config';
const plusString = require('node-plus-string');

import color from '../../../config/color';
import screen from '../../../utils/screen';
import Separator from '../../../components/common/separator';
import BackBtn from '../../../components/common/back-btn';

const WEBVIEW_REF = 'webview';

@connect()
export default class Browser extends React.Component<IBrowserProps, any> {

  static navigationOptions = ({ navigation }: any) => ({
    title: _.get(navigation, 'state.params.title', '浏览器'),
    headerLeft: <BackBtn dispatch navigation={navigation} iconColor={_.get(navigation, 'state.params.params.iconColor', color.theme)} />,
    headerRight: (
      <NavigationItem
        dispatch
        navigation={navigation}
        icon={require('../../../../assets/images/common/share.png')}
        onPress={() => {
          console.log('分享链接给好友');
          const shareOptions = {
            title: _.get(navigation, 'state.params.title'),
            message: `分享链接：#同步圈# 「${_.get(navigation, 'state.params.title')}」 `,
            url: _.get(navigation, 'state.params.url', CONFIG.WEB_HOST),
            subject: "分享链接" //  for email 
          };
          Share.open(shareOptions).catch((err: any) => { err && console.log(err); });
        }}
      />
    ),
    headerStyle: { // 设置标题栏的样式对象
      backgroundColor: _.get(navigation, 'state.params.params.headerColor', '#fff'),
      borderBottomWidth: 0,
      elevation: 0,
      height: 0.065 * screen.height,
      marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      shadowColor: 'transparent',
      shadowRadius: 0,
    },
    headerTitleStyle: { // 设置返回标题(back title)的样式
      alignSelf: 'center', // 安卓上顶部标题居中
      fontSize: screen.height * 0.025,
      color: _.get(navigation, 'state.params.params.headerTitleColor', '#333'),
      fontWeight: '400',
    },
  });

  constructor(props: IBrowserProps) {
    super(props);
  }

  // componentDidMount() {
  //   this.state = {
  //     canGoForward: false,
  //     canGoBack: false,
  //     url: "about:blank",
  //     title: "about:blank",
  //     loading: false
  //   };
  // }

  _navigationStateChange = (navState: any) => {
    console.log('_navigationStateChange: ', navState);
    const title = _.get(this.props.navigation, 'state.params.title')
    if (!title) {
      this.props.navigation.setParams({ title: _.get(navState, 'title', '浏览器') });
    } else {
      this.props.navigation.setParams({ title });
    }

    // this.setState({
    //   canGoForward: navState.canGoForward || false,
    //   canGoBack: navState.canGoBack || false,
    //   url: navState.url || "about:blank",
    //   title: navState.title || "about:blank",
    //   loading: navState.loading || false
    // });
  }

  _renderError = () => {
    return (
      <View style={indicatorStyles.error}>
        {/* <Text style={indicatorStyles.errorText}>网络出现异常</Text> */}
      </View>
    )
  }

  // async getToken() {
  //   const res = await authTokenStore.getSessionToken();
  //   const result = _.get(res, 'accessToken', '')
  //   return result;
  // } 

  handleMessage = (e: any) => {
    const data = _.get(e, 'nativeEvent.data');
    const jsonData = JSON.parse(data);
    const { toPage, params } = jsonData;

    console.log('toPage, params: ', toPage, params);
    if (toPage) {
      // this.props.navigation.goBack();
      this.props.navigation.navigate(plusString.classify(toPage), params);
    }
  }

  render() {
    const { url, withAuth, method, body, params } = _.get(this, 'props.navigation.state.params');
    let barStyle, headerColor;
    if (params) {
      barStyle = _.get(params, 'barStyle');
      headerColor = _.get(params, 'headerColor');
    };

    // interface Source {
    //   uri: string;
    //   method?: string;
    //   body?: any;
    //   headers?: any;
    // }

    // let source = {} as Source;
    // let token = 'anonymous';
    // if (withAuth) {
    //   token = this.getToken()
    // }
    // source.uri = url;
    // if (method === "POST") {
    //   source.method = "POST";
    //   source.body = body;
    // }
    // if (withAuth) {
    //   source.headers = {
    //     Authorization: `Bearer ${token}`
    //   };
    // }
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar
          backgroundColor={headerColor ? headerColor : color.banner}
          translucent={true}
          barStyle={barStyle && barStyle === "light-content" ? "light-content" : "dark-content"}
        />
        <View style={indicatorStyles.container}>
          <Separator />
          <WebView
            source={{ uri: url }}
            onMessage={this.handleMessage}
            onNavigationStateChange={this._navigationStateChange}
            renderError={this._renderError}
            onError={(err: any) => {
              console.log('loading error: ', err)
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
