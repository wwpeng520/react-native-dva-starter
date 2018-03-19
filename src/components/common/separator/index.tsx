import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import indicatorStyle, { ISeparatorStyle } from './style';
import PropTypes from './prop-types';

export interface ISeparatorProps extends PropTypes {
}

const indicatorStyles = StyleSheet.create<any>(indicatorStyle);

/**
 * 分割线
 * 
 * @export
 * @class Separator
 * @extends {React.PureComponent<ISeparatorProps, any>}
 */
export default class Separator extends React.PureComponent<ISeparatorProps, any> {
  static defaultProps = {
  };

  constructor(props: ISeparatorProps) {
    super(props);
  }

  render() {
    return (
      <View style={[indicatorStyles.line, this.props.style]} />
    );
  }
}
