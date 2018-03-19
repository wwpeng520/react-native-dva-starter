import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import indicatorStyle, { IDemoScene1Style } from './style';
import PropTypes from './prop-types';
import color from '../../../config/color';
import screen from '../../../utils/screen';

export interface IDemoScene1Props extends PropTypes {
}

const indicatorStyles = StyleSheet.create<any>(indicatorStyle);

export default class DemoScene1 extends React.Component<IDemoScene1Props, any> {
  static defaultProps = {
  };

  constructor(props: IDemoScene1Props) {
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
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={color.banner}
        />
        <Text>DEMO SCENE1</Text>
      </View >
    );
  }
}