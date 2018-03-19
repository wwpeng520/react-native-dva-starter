import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import indicatorStyle, { IDetailCellStyle } from './style';
import PropTypes from './prop-types';
import Separator from '../separator';
import { Heading1, Heading2, Paragraph, Name1, LittleName } from '../text';

export interface IDetailCellProps extends PropTypes {
}

const indicatorStyles = StyleSheet.create<any>(indicatorStyle);

/**
 * 列表单项组件
 * 
 * @export
 * @class DetailCell
 * @extends {React.Component<IDetailCellProps, any>}
 */
export default class DetailCell extends React.PureComponent<IDetailCellProps, any> {
  static defaultProps = {
  };

  constructor(props: IDetailCellProps) {
    super(props);
  }

  render() {
    const iconSource = (this.props.image && typeof this.props.image === 'string') ? { uri: this.props.image } : this.props.image;
    let icon = this.props.image ? <Image style={indicatorStyles.icon} source={iconSource} resizeMode='contain' /> : null

    const avatarSource = (this.props.avatar && typeof this.props.avatar === 'string') ? { uri: this.props.avatar } : this.props.avatar;
    let avatar = this.props.avatar ? <Image style={indicatorStyles.avatar} source={avatarSource} resizeMode='cover' /> : null

    const subimageSource = (this.props.subimage && typeof this.props.subimage === 'string') ? { uri: this.props.subimage } : this.props.subimage;
    let subimage = this.props.subimage ? <Image style={indicatorStyles.subimage} source={subimageSource} resizeMode='contain' /> : null;
    return (
      <View style={indicatorStyles.container}>
        <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress}>
          <View style={[indicatorStyles.content, this.props.style]}>
            {icon}
            <Name1 style={{ fontSize: 15 }}>{this.props.title}</Name1>
            <View style={{ flex: 1, backgroundColor: 'blue' }} />
            {avatar}
            {subimage}
            <LittleName style={[{ fontSize: 14 }, this.props.subtitleStyle]}>{this.props.subtitle}</LittleName>
            
            {/* 是否有向右小箭头 */}
            {/* {!this.props.noArrow && <Image style={indicatorStyles.arrow} source={require('../../../img/public/cell_arrow.png')} resizeMode='contain' />} */}
          </View>

          <Separator />
        </TouchableOpacity>
      </View>
    );
  }
}
