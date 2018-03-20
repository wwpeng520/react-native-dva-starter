import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import { connect } from 'dva-no-router';

import indicatorStyles, { ITabStyle } from './style';
import { ITabProps } from './prop-types';

// import screen from '../../../utils/screen';
// import color from '../../../config/color';
import Separator from '../../../components/common/separator';
import BackBtn from '../../../components/common/back-btn';

@connect()
export default class Tab extends React.Component <ITabProps, any> {
  static defaultProps = {
  };

  static navigationOptions = ({ navigation }: any) => ({
    title: "Tab2",
    headerLeft: <BackBtn dispatch navigation={navigation} />,
    headerRight: <View />
  });

  constructor(props: ITabProps) {
  super(props);
}

componentWillMount() {
  console.log('componentWillMount in tab2/tab')

}

componentDidMount() {

}

componentWillUnmount() {

}

render() {
  return (
    <View style={indicatorStyles.container}>
      {/* <Separator /> */}
      <Text>Tab2</Text>
    </View>
  );
}
}
