/**
 * 右侧带按钮的组件，相连
 */

import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
} from 'react-native';
import { connect } from 'dva-no-router';
import { Button, WhiteSpace, List, InputItem } from 'antd-mobile';

import indicatorStyles, { IInputWithButtonStyle } from './style';
import { IInputWithButtonProps } from './prop-types';

import screen from '../../../utils/screen';
import color from '../../../config/color';
import Separator from '../../../components/common/separator';
import { buttonStyle, inputItemStyle } from '../../../utils/redefine-antm-style';

@connect()
export default class InputWithButton extends React.PureComponent<IInputWithButtonProps, any> {

  constructor(props: IInputWithButtonProps) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const { value, editable, onClick, placeholder, style, btnText, inputStyle, btnStyle, btnTitleStyle } = this.props;
    const copyBtn = <Button type="primary"
      styles={StyleSheet.create(buttonStyle)}
      style={{ flex: 1, width: screen.width * 0.25, borderRadius: 0, borderWidth: 0, borderLeftWidth: 1 }}
      onClick={onClick}
    >{btnText}</Button>
    return (
      <View style={[indicatorStyles.inputOutter, style]}>
        <TextInput
          editable={editable}
          style={[indicatorStyles.input, inputStyle]}
          placeholder={placeholder}
          value={value}
          underlineColorAndroid={'transparent'}
        />
        <Button type="primary"
          styles={StyleSheet.create(buttonStyle)}
          style={[indicatorStyles.btn, btnStyle]}
          onClick={onClick}
        >
          <Text style={[indicatorStyles.btnTitle, btnTitleStyle]}>{btnText}</Text>
        </Button>
      </View>
    );
  }
}
