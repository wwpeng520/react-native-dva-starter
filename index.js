import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './build/app';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
  };
}
console.log('__DEV__: ', __DEV__);

AppRegistry.registerComponent('RNDvaTSBoilerplate', () => App);
