import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableHighlight,
  Platform,
  StyleSheet,
} from 'react-native';
import { connect } from 'dva-no-router';
import Modal from 'react-native-modal';
import { Button, Toast } from 'antd-mobile';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import indicatorStyles, { IModalVersionStyle, CONTENT_WIDTH, CONTENT_HEIGHT } from './style';
import { IModalVersionProps } from './prop-types';
import { IVersion } from '../../../models/version'
import * as _ from 'lodash';
import { update } from '../../../utils/app';

import screen from '../../../utils/screen';
import color from '../../../config/color';
import Separator from '../../../components/common/separator';
import { Heading1, Heading2, Name } from '../../../components/common/text';
import { buttonStyle } from '../../../utils/redefine-antm-style';

@connect()
export default class ModalVersion extends React.PureComponent<IModalVersionProps, any> {
  constructor(props: IModalVersionProps) {
    super(props);
    this.state = {
      btnDisabled: false,
      btnText: '立即更新'
    }
  }

  _onUpdateClick = () => {
    const { version, onClose } = this.props;
    const res = update(version);
    if (res && Platform.OS === 'android') {
      console.log('### TONGBUQUAN LOG update 开始下载 ### ', res);
      if (version.isForceUpdate) {
        this.setState({
          btnDisabled: true,
          btnText: '正在下载，请稍等...'
        })
      } else {
        onClose();
        setTimeout(() => {
          Toast.info('正在下载，稍后更新...', 1);
        }, 500);
      }
    } else {
      onClose();
      Toast.fail('更新出错，请手动更新', 2);
    }
  }

  render() {
    const { style, version, onClose } = this.props;
    const arr = version.releaseNote ? version.releaseNote.split('\\n') : [];
    const lists = arr.map((item: string, i: number) => (
      <Name key={i}>-{item}</Name>
    ));
    return (
      <Modal isVisible={true}
        style={[indicatorStyles.container, style]}>

        <View style={indicatorStyles.modalContent}>
          <View style={indicatorStyles.titleArea}>
            <Heading1 style={{ padding: screen.width * 0.02 }}>{_.get(version, 'releaseTitle', '更新提示')}</Heading1>
          </View>
          <Separator style={{ width: CONTENT_WIDTH }} />


          <ScrollView contentContainerStyle={indicatorStyles.scrollView}>
            <Heading2 style={version.isForceUpdate ? indicatorStyles.forceUpdateTip : { display: 'none' }}>您需要更新版本才能继续使用！</Heading2>
            <Heading2>更新日志</Heading2>
            <Name>v{version.version}</Name>
            {lists}
          </ScrollView>

          <Button type="primary"
            styles={StyleSheet.create(buttonStyle)}
            style={indicatorStyles.footerBtn}
            onClick={this._onUpdateClick}
            disabled={this.state.btnDisabled}
          >{this.state.btnText}</Button>

        </View>

        {/* 关闭按钮 */}
        {!version.isForceUpdate && <TouchableHighlight style={{ marginTop: 20, padding: 10 }}
          underlayColor={'transparent'}
          onPress={onClose}
        >
          <SimpleIcon name="close" size={screen.width * 0.06} color={'#ddd'} />
        </TouchableHighlight>}
      </Modal>
    );
  }
}