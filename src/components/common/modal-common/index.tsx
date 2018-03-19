import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'dva-no-router';
import Modal from 'react-native-modal';
import { Button } from 'antd-mobile';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import indicatorStyles, { IModalBoxStyle, CONTENT_WIDTH, CONTENT_HEIGHT } from './style';
import { IModalBoxProps } from './prop-types';

import screen from '../../../utils/screen';
import color from '../../../config/color';
import Separator from '../../../components/common/separator';
import { Heading1, Heading2, Name } from '../../../components/common/text';

@connect()
export default class ModalBox extends React.PureComponent<IModalBoxProps, any> {
  constructor(props: IModalBoxProps) {
    super(props);
    this.state = {
      isVisible: true,
    }
  }

  render() {
    const { style, title } = this.props;
    return (
      <Modal isVisible={this.state.isVisible}
        style={[indicatorStyles.container, style]}>

        <View style={indicatorStyles.modalContent}>
          <Heading1>{title}</Heading1>
          <Separator style={{ width: CONTENT_WIDTH }} />

          <ScrollView contentContainerStyle={{}}
            showsVerticalScrollIndicator={true}>
          </ScrollView>

        </View>

        {/* 关闭按钮 */}
        <TouchableHighlight style={{ marginTop: 20, padding: 10 }}
          underlayColor={'transparent'}
          onPress={() => {
            this.setState({ isVisible: false })
          }}
        >
          <SimpleIcon name="close" size={screen.width * 0.06} color={'#ddd'} />
        </TouchableHighlight>
      </Modal>
    );
  }
}
