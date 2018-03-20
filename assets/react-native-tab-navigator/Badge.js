'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

import Layout from './Layout';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Badge extends React.Component {
  static propTypes = Text.propTypes;

  constructor(props, context) {
    super(props, context);

    this._handleLayout = this._handleLayout.bind(this);
  }

  state = {
    computedSize: null,
  };

  render() {
    let { computedSize } = this.state;
    let style = {};
    if (!computedSize) {
      style.opacity = 0;
    } else {
      style.width = Math.max(computedSize.height, computedSize.width);
    }

    return (
      <Text
        {...this.props}
        numberOfLines={1}
        onLayout={this._handleLayout}
        style={[styles.container, this.props.style, style]}>
        {this.props.children}
      </Text>
    );
  }

  _handleLayout(event) {
    let { width, height } = event.nativeEvent.layout;
    let { computedSize } = this.state;
    if (computedSize && computedSize.height === height &&
      computedSize.width === width) {
      return;
    }

    this.setState({
      computedSize: { width, height },
    });

    if (this.props.onLayout) {
      this.props.onLayout(event);
    }
  }
}

let styles = StyleSheet.create({
  container: {
    // fontSize: 12,
    color: '#fff',
    // backgroundColor: 'rgb(0, 122, 255)',
    // lineHeight: 15,
    textAlign: 'center',
    // borderWidth: 1 + Layout.pixel,
    borderColor: '#fefefe',
    // borderRadius: 17 / 2,
    overflow: 'hidden',

    fontSize: WIDTH * 0.02,
    backgroundColor: '#ff6600',
    lineHeight: WIDTH * 0.034,
    borderRadius: WIDTH * 0.018,
    borderWidth: Layout.pixel,
    width: WIDTH * 0.036,
    height: WIDTH * 0.036,
  },
});
