import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import { connect } from 'dva-no-router';

import indicatorStyles, { I{{classBaseName}}Style } from './style';
import { I{{classBaseName}}Props } from './prop-types';

// import screen from '../../../utils/screen';
// import color from '../../../config/color';
import Separator from '../../../components/common/separator';
import BackBtn from '../../../components/common/back-btn';

@connect()
export default class {{classBaseName}} extends React.Component <I{{classBaseName}}Props, any> {
  static defaultProps = {
  };

  static navigationOptions = ({ navigation }: any) => ({
    title: "{{classBaseName}}",
    headerLeft: <BackBtn dispatch navigation={navigation} />,
    headerRight: <View />
  });

  constructor(props: I{{classBaseName}}Props) {
  super(props);
}

componentWillMount() {

}

componentDidMount() {

}

componentWillUnmount() {

}

render() {
  return (
    <View style={indicatorStyles.container}>
      {/* <Separator /> */}
      <Text>{{classBaseName}}</Text>
    </View>
  );
}
}
