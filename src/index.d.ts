declare module 'dva-no-router';
declare module 'dva-core';
declare module 'react-native-tab-navigator';
declare module 'react-redux';
declare module 'react-native-image-gallery';
declare module 'react-native-scrollable-tab-view';
declare module 'react-native-textinput-effects';
declare module 'react-native-vector-icons/MaterialIcons';
declare module 'react-native-vector-icons/FontAwesome';
declare module 'react-native-vector-icons/Ionicons';
declare module 'react-native-vector-icons/SimpleLineIcons';
declare module 'react-native-vector-icons/Icomoon';
declare module 'rn-umeng';
declare module 'react-native-wechat';
declare module 'react-native-simple-store';
declare module 'react-navigation-redux-helpers';
declare module 'react-native-image-progress';
declare module 'react-native-progress/Bar';

interface IBaseAction {
  type: string;
}

// ???
interface INavigation extends NavigationScreenProp<any, NavigationInitAction | NavigationNavigateAction | NavigationBackAction | NavigationSetParamsAction | NavigationResetAction | NavigationPopAction | NavigationPopToPopAction | NavigationPushAction | NavigationReplaceAction | NavigationCompleteTransitionAction> {
  state: NavigationParams;
  dispatch: NavigationDispatch;
  goBack: (routeKey?: (string | null)) => boolean;
  navigate: (
    routeName: string,
    params?: NavigationParams,
    action?: NavigationAction
  ) => boolean;
  setParams: (newParams: NavigationParams) => boolean;
  addListener: (
    eventName: string,
    callback: NavigationEventCallback
  ) => NavigationEventSubscription;
  push: (
    routeName: string,
    params?: NavigationParams,
    action?: NavigationNavigateAction
  ) => boolean;
  replace: (
    routeName: string,
    params?: NavigationParams,
    action?: NavigationNavigateAction
  ) => boolean;
  pop: (n?: number, params?: { immediate?: boolean }) => boolean;
  popToTop: (params?: { immediate?: boolean }) => boolean;
}