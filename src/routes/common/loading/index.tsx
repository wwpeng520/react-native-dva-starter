import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import { connect } from 'dva-no-router';

import indicatorStyles, { ILoadingStyle } from './style';
import { ILoadingProps } from './prop-types';

// import screen from '../../../utils/screen';
// import color from '../../../config/color';
import Separator from '../../../components/common/separator';
import BackBtn from '../../../components/common/back-btn';

@connect()
export default class Loading extends React.Component<ILoadingProps, any> {
  static defaultProps = {
  };

  static navigationOptions = ({ navigation }: any) => ({
    title: "Loading",
    headerLeft: <BackBtn dispatch navigation={navigation} />,
    headerRight: <View />
  });

  constructor(props: ILoadingProps) {
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
        <Text>Loading</Text>
      </View>
    );
  }
}
