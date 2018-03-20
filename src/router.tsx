import * as React from 'react';
import {
  TabNavigator,
  StackNavigator,
  addNavigationHelpers,
  TabBarBottom,
  NavigationActions,
  NavigationScreenProps
} from 'react-navigation';
import {
  initializeListeners,
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import {
  BackHandler,
  Animated,
  Easing,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { Toast } from 'antd-mobile';
import { connect } from 'dva-no-router';

import * as _ from 'lodash';
import color from './config/color';
import screen from './utils/screen';
import MainTabs from './routes/main-tabs';

// import Setting from './routes/common/setting';
// import About from './routes/common/about';
// import Profile from './routes/common/profile';
// import ValueSet from './routes/common/value-set';
// import ProfilePhoneReset from './routes/common/profile-phone-reset';
// import Checkin from './routes/common/checkin';
// import Notifications from './routes/common/notifications';

// import Browser from './routes/common/browser';
import Loading from './routes/common/loading';

const xifenIcon = require("../assets/images/tabbar/xifen.png");
const xifenActiveIcon = require("../assets/images/tabbar/xifen-active.png");
const hufenIcon = require("../assets/images/tabbar/hufen.png");
const hufenActiveIcon = require("../assets/images/tabbar/hufen-active.png");
const mineIcon = require("../assets/images/tabbar/mine.png");
const mineActiveIcon = require("../assets/images/tabbar/mine-active.png");

const anyEasing: any = Easing;

const MainNavigator = StackNavigator(
  {
    Main: { screen: MainTabs },
    // Browser: { screen: Browser },

    // Setting: { screen: Setting },
    // About: { screen: About },
    // Profile: { screen: Profile },
    // Distribution: {
    //   screen: Distribution,
    //   navigationOptions: {
    //     header: null
    //   }
    // },

    // Checkin: { screen: Checkin },
  },
  {
    // mode: "card", // 'card'默认效果；'modal'使屏幕从底部滑入,只适用于iOS
    initialRouteName: 'Main', // 初始化app默认路由
    // 设置所有页面的options，也可在每个页面的navigationOptions设置 
    navigationOptions: {
      headerStyle: { // 设置标题栏的样式对象
        backgroundColor: color.banner,
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
        color: '#fff',
        fontWeight: '400',
        flexGrow: 1,
        textAlign: 'center',
      },
      headerBackTitle: null, // 跳转页面左侧返回箭头后面的文字
      // headerTintColor: color.tabbarActiveColor, // 设置标题颜色
      gesturesEnabled: false, // defaults to true on iOS, false on Android.
    },
  }
)
const RootNavigator = StackNavigator(
  {
    Root: { screen: MainNavigator },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    transitionConfig: () => ({  // 定义一个返回覆盖默认屏幕的换场动画的对象的函数.
      transitionSpec: {
        duration: 300,
        easing: anyEasing.out(anyEasing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  }
)

function getCurrentScreen(navigationState: any): string | null {
  // console.log('router: getCurrentScreen');
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentScreen(route)
  }
  return route.routeName
}

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  (state: any) => state.router
)
const addListener = createReduxBoundAddListener('root')

interface IDvaRouterPropTypes {
  dispatch?: any;
  router?: any;
  app?: any;
}

@connect(({ app, router }: any) => ({ app, router }))
export default class DvaRouter extends React.PureComponent<IDvaRouterPropTypes, any> {
  constructor(props: IDvaRouterPropTypes) {
    super(props);
    StatusBar.setBarStyle('light-content')
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(color.banner, false);
      StatusBar.setTranslucent(true); // 否则点击系统通知进入app时顶部会有留白
    }
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentDidMount() {
    initializeListeners('root', this.props.router)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getCurrentScreen(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  render() {
    const { dispatch, app, router } = this.props
    if (app && app.loading) return <Loading />

    const navigation = addNavigationHelpers({
      dispatch,
      state: router,
      addListener,
    })
    return <RootNavigator navigation={navigation} screenProps={{ routeName: getCurrentScreen(this.props.router) }} />
  }
}

export function routerReducer(state: any, action: any) {
  // 拦截路由: 自定义回退页面函数 dispatch({ type: 'GoBack', backIndex: 2 }) -- 回退两个页面
  // 新版 react-navigation 有 NavigationActions.pop({ n: 2 }) 方法，不需自定义了
  // if (state && action.type === 'GoBack') {
  //   let innerRoutes = state.routes[0].routes;
  //   const backIndex = _.get(action, 'backIndex', 1); // 传递需要回退页面数量
  //   innerRoutes = innerRoutes.slice(0, state.routes[0].routes.length - backIndex);
  //   let routes = [{
  //     index: state.routes[0].index - backIndex,
  //     routes: innerRoutes,
  //     key: state.routes[0].key,
  //     routeName: state.routes[0].routeName
  //   }]
  //   return {
  //     routes,
  //     index: state.index,
  //   };
  // }

  // 避免快速点击时重复跳转
  if (state && action.type === NavigationActions.NAVIGATE) {
    if (routeIsInCurrentState(state, action.routeName)) {
      return state
    }
  }

  return RootNavigator.router.getStateForAction(action, state);
};

function routeIsInCurrentState(state: any, routeName: string): any {
  if (state && state.routeName === routeName) {
    return true
  }
  if (state && state.routes) {
    return routeIsInCurrentState(state.routes[state.index], routeName)
  }
  return false
}
