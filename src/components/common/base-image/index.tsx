/**
 * 用于加载远程图片失败时
 */

import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import { connect } from 'dva-no-router';
import * as _ from 'lodash';
import ProgressImage from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Bar';

import indicatorStyles, { IBaseImageStyle } from './style';
import { IBaseImageProps } from './prop-types';
import Icomoon from 'react-native-vector-icons/Icomoon';

import screen from '../../../utils/screen';
import color from '../../../config/color';

@connect()
export default class BaseImage extends React.PureComponent<IBaseImageProps, any> {
  constructor(props: IBaseImageProps) {
    super(props);
    this.state = {
      error: false,
    }
  }

  // componentDidMount() {
  //   const { source } = this.props;
  //   Image.getSize(_.get(source, 'uri'),
  //     (width, height) => {
  //       console.log('width, height: ', width, height, screen.width * 0.24)
  //     },
  //     (error: any) => console.log('Image.getSize error', error)
  //   );
  // }

  render() {
    const { style, source, imgSize, resizeMode, resizeMethod, indicator, indicatorProps } = this.props;
    const defaultIndicatorProps = {
      width: screen.width * 0.15,
      color: color.filledcolor,
      unfilledColor: color.unfilledColor
    }
    return (
      <View>
        {!this.state.error
          ? <ProgressImage
            style={[{ backgroundColor: color.imageBg }, style]}
            source={source}
            resizeMethod={resizeMethod ? resizeMethod : 'resize'}
            resizeMode={resizeMode ? resizeMode : "cover"}
            onError={async () => {
              this.setState({ error: true });
            }}

            indicator={indicator ? indicator : ProgressPie}
            indicatorProps={indicatorProps ? indicatorProps : defaultIndicatorProps}
          />
          : <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
            <Icomoon name="img-error" size={imgSize ? imgSize : screen.width * 0.2} color={'#ddd'} />
            <Text style={{ position: 'absolute', backgroundColor: 'transparent', color: '#777' }}>图片加载失败</Text>
          </View>
        }

      </View>
    );
  }
}
