/**
 * 修改 !单条! 属性时跳转的页面，类似微信修改昵称跳转的页面
 * 该页面需要 api 支持单条属性修改
 */

import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  InteractionManager,
  Platform,
} from 'react-native';
import { connect } from 'dva-no-router';
import { SafeAreaView } from 'react-navigation';
import * as _ from 'lodash';
import { WhiteSpace, Toast, InputItem, List, Button } from 'antd-mobile';

import indicatorStyles, { IValueSetStyle } from './style';
import { IValueSetProps } from './prop-types';

import screen from '../../../utils/screen';
import color from '../../../config/color';
import Separator from '../../../components/common/separator';
import NavigationItem from '../../../components/common/navigation-item';
import BackBtn from '../../../components/common/back-btn';
import { buttonStyle, inputItemStyle } from '../../../utils/redefine-antm-style';

@connect()
export default class ValueSet extends React.PureComponent<IValueSetProps, any> {
  static defaultProps = {
  };

  static navigationOptions = ({ navigation }: any) => ({
    title: `修改${_.get(navigation, 'state.params.title', '')}`,
    headerLeft: <BackBtn dispatch navigation={navigation} />,
    headerRight: (
      <NavigationItem
        dispatch
        navigation={navigation}
        title='完成'
        disabled={!navigation.state.params.btnTouchable}
        titleStyle={{ color: navigation.state.params.btnTouchable ? color.rightsBlue : '#999' }}
        onPress={() => navigation.state.params.navigatePress()}
      />
      // <Button size='small' type='primary'
      //   styles={StyleSheet.create(buttonStyle)}
      //   style={{ marginRight: 0.03 * screen.width }}
      //   disabled={!navigation.state.params.btnTouchable}
      //   onClick={() => {
      //     navigation.state.params.navigatePress();
      //   }}
      // >完成</Button>
    )
  });

  constructor(props: IValueSetProps) {
    super(props);
    this.state = {
      value: '',
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      InteractionManager.runAfterInteractions(() => {
        this.props.navigation.setParams({ navigatePress: this._confirm });
        // console.log('this.refs.inputItem: ', this.refs.inputItem);
        const ref = _.get(this, 'refs.inputItem.inputRef.inputRef');
        if (ref && ref.focus && typeof ref.focus === 'function') ref.focus()
      })
    } else {
      this.props.navigation.setParams({ navigatePress: this._confirm });
      const ref = _.get(this, 'refs.inputItem.inputRef.inputRef');
      if (ref && ref.focus && typeof ref.focus === 'function') ref.focus()
    }
  }

  _confirm = async () => {
    const params = this.props.navigation.state.params;
    switch (params.title) {
      case '昵称':
        // console.log(this.state.value);
        if (!this.state.value) {
          Toast.info('输入为空', 2);
        } else {
          const newProfile = {
            name: this.state.value,
            type: 'patch_info',
          };
          const res = await this.props.dispatch({ type: 'user/editUserInfo', payload: newProfile });
          if (res && res.data && res.data.result) {
            Toast.success('修改成功', 2, () => { }, true);
            this.props.dispatch({ type: 'user/getUserInfo' }); // 重新获取个人信息
            this.props.navigation.goBack();
          } else {
            const msg = _.get(res, 'data.error.message', '修改呢称失败，请稍后重试');
            Toast.fail(msg, 2);
          }
        }
        break;
    }
  }

  render() {
    const { value, title, header, footerText } = this.props.navigation.state.params;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={indicatorStyles.container}>
          <Separator />
          <WhiteSpace size="xl" />

          <List
            renderHeader={header}
            renderFooter={footerText ? () => <Text style={{ color: '#666', padding: 0.025 * screen.width }}>{footerText}</Text> : () => null}
          >
            <InputItem
              styles={StyleSheet.create(inputItemStyle)}
              defaultValue={value}
              clear
              placeholder="请输入昵称"
              ref='inputItem'
              onChange={(val: string) => {
                // console.log('onChange', val);
                this.setState({ value: val });
                this.props.navigation.setParams({ btnTouchable: true });
              }}

            />
          </List>

        </View>
      </SafeAreaView>
    );
  }
}
