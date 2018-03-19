import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  Clipboard,
  StyleSheet,
} from 'react-native';
import { connect } from 'dva-no-router';
import { SafeAreaView } from 'react-navigation';

import indicatorStyles, { IAboutStyle } from './style';
import { IAboutProps } from './prop-types';
import Icomoon from 'react-native-vector-icons/Icomoon';
import screen from '../../../utils/screen';
import color from '../../../config/color';
import CONFIG from '../../../config/config';
import Separator from '../../../components/common/separator';
import { LittleName } from '../../../components/common/text';
import { ActivityIndicator, Button, WhiteSpace, Modal, List, Toast } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
import { API_URL } from '../../../constants';
import BackBtn from '../../../components/common/back-btn';
import { listStyle } from '../../../utils/redefine-antm-style';

@connect()
export default class About extends React.PureComponent<IAboutProps, any> {
  static defaultProps = {
  };

  static navigationOptions = ({ navigation }: any) => ({
    title: "关于同步圈",
    headerLeft: <BackBtn dispatch navigation={navigation} />,
    headerRight: <View />
  });

  constructor(props: IAboutProps) {
    super(props);
  }

  wechatIcon = <Icomoon name="wechat" size={0.055 * screen.width} color={color.wechatGreen} />
  licenseIcon = <Icomoon name="license" size={0.055 * screen.width} color={color.wechatOrange} />

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={indicatorStyles.container}>
          <Separator />

          <View>
            <View style={indicatorStyles.logoBox}>
              <Image
                source={require('../../../../assets/images/common/logo.png')}
                resizeMode='contain'
                style={indicatorStyles.logo}
              />
              <View style={indicatorStyles.versionBox}>
                <Icomoon name="paopao" size={0.18 * screen.width} color={color.theme} />
                <Text style={indicatorStyles.version}>{CONFIG.APP_VERSION}</Text>
              </View>
            </View>
          </View>

          <List>
            <Item thumb={this.wechatIcon}
              styles={StyleSheet.create(listStyle)}
              onClick={() => {
                Clipboard.setString('tongbuquany');
                Toast.info('已复制微信号', 2);
              }}
              extra={<Text style={{ fontSize: screen.width * 0.035, color: '#999' }}>tongbuquany</Text>}
            >  微信客服</Item>
          </List>

          <WhiteSpace />
          <List>
            <Item thumb={this.licenseIcon} arrow="horizontal"
              styles={StyleSheet.create(listStyle)}
              onClick={() => {
                this.props.navigation.navigate('Browser', {
                  title: '使用协议',
                  url: API_URL.PRICARY
                })
              }}
            >  使用服务协议</Item>
          </List>

          <LittleName style={indicatorStyles.copyright}>Copyright © 2018 同步圈 All Rights Reserved</LittleName>

        </View>
      </SafeAreaView>
    );
  }
}
