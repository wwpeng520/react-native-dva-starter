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

import Tab1 from './routes/tab1/tab1';
import Tab2 from './routes/tab1/tab1';
import Tab3 from './routes/tab1/tab1';
import Tab4 from './routes/tab1/tab1';

// import Setting from './routes/common/setting';
// import About from './routes/common/about';
// import Profile from './routes/common/profile';
// import ValueSet from './routes/common/value-set';
// import ProfilePhoneReset from './routes/common/profile-phone-reset';
// import Checkin from './routes/common/checkin';
// import Notifications from './routes/common/notifications';

// import Browser from './routes/common/browser';

const homeActiveIcon = require("../assets/images/tabbar/homeactive.png");
const userActiveIcon = require("../assets/images/tabbar/useractive.png");
const discovery2Icon = require("../assets/images/tabbar/discovery2.png");
const accountIcon = require("../assets/images/tabbar/account.png");

const anyEasing: any = Easing;
let lastBackPressed: number | null;

const tabIconSize = screen.height * 0.03;
const Tab = TabNavigator(
  {
    Tab1: {
      screen: Tab1,
      path: '/home',
      navigationOptions: {
        tabBarLabel: 'Tab1',
        // 注意：默认情况下，该图标仅在iOS上显示
        tabBarIcon: ({ focused, tintColor }: { focused?: boolean, tintColor?: string }) => (
          <Image
            source={homeActiveIcon}
            style={{ width: tabIconSize, height: tabIconSize, tintColor: tintColor }}
          />
        )
      }
    },
    Tab2: {
      screen: Tab2,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Tab2',
        tabBarIcon: ({ focused, tintColor }: { focused?: boolean, tintColor?: string }) => (
          <Image
            source={accountIcon}
            style={{ width: tabIconSize, height: tabIconSize, tintColor: tintColor }}
          />
        ),
        // tabBarOnPress: ({ jumpToIndex, previousScene, scene }: any) => {
        //   jumpToIndex(scene.index);
        // }
      }
    },
    Tab3: {
      screen: Tab3,
      navigationOptions: {
        tabBarLabel: 'Tab3',
        tabBarIcon: ({ focused, tintColor }: { focused?: boolean, tintColor?: string }) => (
          <Image
            source={discovery2Icon}
            style={{ width: tabIconSize, height: tabIconSize, tintColor: tintColor }}
          />
        )
      }
    },
    Tab4: {
      screen: Tab4,
      navigationOptions: {
        // header: null,
        tabBarLabel: 'Tab4',
        tabBarIcon: ({ focused, tintColor }: { focused?: boolean, tintColor?: string }) => (
          <Image
            source={userActiveIcon}
            style={{ width: tabIconSize, height: tabIconSize, tintColor: tintColor }}
          />
        )
      }
    },
  },
  {
    tabBarComponent: TabBarBottom, // 解决安卓上不显示icon
    tabBarPosition: 'bottom',
    swipeEnabled: false, // true
    animationEnabled: false,
    // lazy: true,
    tabBarOptions: {
      //  activeTintColor和inactiveTintColor会传递到上面的tabBarIcon中的tintColor
      activeTintColor: color.tabbarActiveColor,
      inactiveTintColor: color.tabbarInactiveColor,
      // 标签栏样式
      style: {
        backgroundColor: '#ffffff',
        borderTopWidth: screen.onePixel,
        borderTopColor: color.lightBorder,
        height: screen.height * 0.07,
        justifyContent: 'center',
      },
      // 标签标题样式
      labelStyle: {
        fontSize: screen.height * 0.015,
        // lineHeight: screen.height * 0.018,
        marginBottom: screen.height * 0.01,
      },
    },
  }
)

const MainNavigator = StackNavigator(
  {
    Main: { screen: Tab },
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
        color: '#333',
        fontWeight: '400',
      },
      headerBackTitle: null, // 跳转页面左侧返回箭头后面的文字
      // headerTintColor: color.tabbarActiveColor, // 设置标题颜色
      gesturesEnabled: false, // defaults to true on iOS, false on Android.
    },
  }
);
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
);

interface IDvaRouterPropTypes {
  dispatch: any;
  router: any;
}

// const middleware = createReactNavigationReduxMiddleware(
//   "root",
//   (state: any) => state.router
// );
// const addListener = createReduxBoundAddListener("root");

class DvaRouter extends React.PureComponent<IDvaRouterPropTypes, any> {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    lastBackPressed = null;
  }

  _actionEventSubscribers = new Set();

  _addListener = (eventName: string, handler: any) => {
    // console.log('@@@@@@@@@')
    // console.log(eventName) // willFocus,didFocus,willBlur,didBlur,action
    // console.log(handler)

    if (eventName !== 'action') {
      return { remove: () => { } };
    }
    this._actionEventSubscribers.add(handler);
    return {
      remove: () => {
        this._actionEventSubscribers.delete(handler);
      },
    };
  };

  onBackAndroid = () => {
    const routes: any[] = _.get(this.props.router, 'routes[0].routes', []);
    if (routes.length === 1) {
      if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
        BackHandler.exitApp();
        return false;
      }
      lastBackPressed = Date.now();
      Toast.info('再点击一次退出应用', 2);
      return true;
    }

    if (routes.length >= 1) {
      this.props.dispatch(NavigationActions.back());
      return true;
    }
  }

  render() {
    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.router,
      addListener: this._addListener,
    });

    // console.log('navigation -----> ');
    // console.log(navigation);

    const root = _.get(this.props.router, 'routes[0].routes');
    const routes = _.get(root[root.length - 1], 'routes');
    let currentRouteName;

    if (routes && routes.length) {
      const index = _.get(root[root.length - 1], 'index');
      currentRouteName = _.get(routes[index], 'routeName');
    } else {
      currentRouteName = _.get(root[root.length - 1], 'routeName')
    }

    // console.log('root ----- > ', root);

    // index === 3 : 我的页面
    // 动态设置状态栏底色
    if (_.get(root[root.length - 1], 'routeName') === 'Browser') {
      // 由 Browser 参数决定
    } else if ((root.length === 1 && root[0].routeName === 'Main' && root[0].index === 3)
      || _.get(root[root.length - 1], 'routeName') === 'Distribution') {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent', false);
        StatusBar.setTranslucent(true); // 否则点击系统通知进入app时顶部会有留白
      }
      StatusBar.setBarStyle('light-content', false);
    } else {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(color.banner, false);
        StatusBar.setTranslucent(true);
      }
      StatusBar.setBarStyle('dark-content', false)
      // StatusBar.setHidden(false, 'slide');
    }

    return <RootNavigator navigation={navigation} screenProps={{ routeName: currentRouteName }} />
  }
}

export function routerReducer(state: any, action: any) {
  // 拦截路由: 自定义回退页面函数 dispatch({ type: 'GoBack', backIndex: 2 }) -- 回退两个页面
  if (state && action.type === 'GoBack') {
    let innerRoutes = state.routes[0].routes;
    const backIndex = _.get(action, 'backIndex', 1); // 传递需要回退页面数量
    innerRoutes = innerRoutes.slice(0, state.routes[0].routes.length - backIndex);
    let routes = [{
      index: state.routes[0].index - backIndex,
      routes: innerRoutes,
      key: state.routes[0].key,
      routeName: state.routes[0].routeName
    }]
    return {
      routes,
      index: state.index,
    };
  }

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

export default connect((state: any) => ({ router: state.router }))(DvaRouter);
