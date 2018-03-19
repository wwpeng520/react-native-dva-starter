/**
 * 照片墙，类似手机相册的浏览相片页面
 */

import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'dva-no-router';
import * as _ from 'lodash';
import { Button } from 'antd-mobile';

import indicatorStyles, { IGalleryStyle } from './style';
import { IGalleryProps } from './prop-types';
import RNGallery from 'react-native-image-gallery';

import screen from '../../../utils/screen';
import color from '../../../config/color';
import Separator from '../../../components/common/separator';
import BackBtn from '../../../components/common/back-btn';

@connect()
export default class Gallery extends React.Component<IGalleryProps, any> {
  static navigationOptions = ({ navigation }: any) => ({
    title: navigation.state.params.title,
    headerLeft: <BackBtn dispatch navigation={navigation} />,
    headerRight: <View />
  });

  constructor(props: IGalleryProps) {
    super(props);
    this.state = {
      cur: props.initialPage + 1
    }
  }

  componentDidMount() {
    const params = _.get(this.props, 'navigation.state.params');
    const { images, index } = params;
    this.props.navigation.setParams({ title: `${index + 1} / ${images.length}` });
  }


  render() {
    const params = _.get(this.props, 'navigation.state.params');
    const { images, index } = params;
    // console.log(images, index);
    let sources: any[] = [];
    images.map((item: string, index: number) => {
      let source = { source: { uri: item } };
      sources.push(source);
    })
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={indicatorStyles.container}>
          <Separator />

          <RNGallery
            style={{ flex: 1, backgroundColor: '#fff' }}
            initialPage={index}
            pageMargin={10}
            images={sources}
            onPageSelected={(page: number) => {
              this.props.navigation.setParams({ title: `${page + 1} / ${images.length}` });
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
