import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { connect } from 'dva-no-router';
import { SafeAreaView } from 'react-navigation';
import * as _ from 'lodash';
import { ActivityIndicator, Button, WhiteSpace, List, Modal, Toast, Picker } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
import indicatorStyles, { IProfileStyle } from './style';
import { IProfileProps } from './prop-types';
import Icomoon from 'react-native-vector-icons/Icomoon';
import FontIcon from 'react-native-vector-icons/FontAwesome';
const ImagePicker = require('react-native-image-picker');
import { uploadImage } from "../../../utils/image-manager";

import color from '../../../config/color';
import screen from '../../../utils/screen';
import Separator from '../../../components/common/separator';
import { LittleName, ExtraText } from '../../../components/common/text'
import BackBtn from '../../../components/common/back-btn';
import { listStyle } from '../../../utils/redefine-antm-style';

@connect(({ user }: IProfileProps) => ({ user }))
export default class Profile extends React.PureComponent<IProfileProps, any> {
  static defaultProps = {
  };

  static navigationOptions = ({ navigation }: any) => ({
    title: "个人信息",
    headerLeft: <BackBtn dispatch navigation={navigation} />,
    headerRight: <View />
  });

  genderData: any[] = [
    { value: 'M', label: '男' },
    { value: 'F', label: '女' }
  ];

  constructor(props: IProfileProps) {
    super(props);
    this.state = {
      // sexIcon: null,
      updating: false,
      genderValue: '',
    }
  }

  _selectImage = () => {
    const options = {
      title: "选择图片",
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '选择相册',
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.showImagePicker(options, async (response: any) => {
      console.log('ImagePicker showImagePicker Response = ', response);
      this.setState({ updating: true });

      if (response.didCancel) {
        console.log('ImagePicker User cancelled image picker');
        this.setState({ updating: false });
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.setState({ updating: false });
        const msg = response.error;
        if (msg.includes('not granted') && msg.includes('Photo')) {
          Toast.info('无相片访问权限，去修改系统设置才能继续操作');
        } else if (msg.includes('not granted') && msg.includes('Camera')) {
          Toast.info('无相机使用权限，去修改系统设置才能继续操作');
        } else {
          Toast.info(msg);
        }
      } else if (response.customButton) {
        console.log('ImagePicker User tapped custom button: ', response.customButton);
        this.setState({ updating: false });
      } else {
        const imgObj = {
          url: {
            uri: response.uri,
            fileName: response.fileName,
            width: response.width,
            height: response.height,
          },
          width: response.width,
          height: response.height,
        };
        const img = await uploadImage('avatar', imgObj.url, 200);
        const newProfile = {
          avatar: img,
          type: 'patch_info',
        };
        const res = await this.props.dispatch({ type: 'user/editUserInfo', payload: newProfile });
        if (res && res.data && res.data.result) {
          Toast.success('修改成功', 2, () => { }, true);
          this.props.dispatch({ type: 'user/getUserInfo' }); // 重新获取个人信息
        } else {
          const msg = _.get(res, 'data.error.message', '上传头像失败');
          Toast.fail(msg, 2);
        }
        this.setState({ updating: false });
      }
    });

  }

  async onPickerOk(value: string) {
    // console.log(value);
    const gender = value[value.length - 1] ? value[value.length - 1] : 'M'
    const newProfile = {
      gender,
      type: 'patch_info',
    };

    if (value[value.length - 1] && value[value.length - 1] === this.props.user.gender) {
      return;
    }
    this.setState({ genderValue: [gender], updating: true });

    const res = await this.props.dispatch({ type: 'user/editUserInfo', payload: newProfile });
    if (res && res.data && res.data.result) {
      Toast.success('修改成功', 2, () => { }, true);
      await this.props.dispatch({ type: 'user/getUserInfo' }); // 重新获取个人信息
      this.setState({ updating: false });
    } else {
      const msg = _.get(res, 'data.error.message', '修改呢称失败，请稍后重试');
      Toast.fail(msg, 2);
      this.setState({ updating: false });
    }
  }

  // maleIcon = <Icomoon name="male2" size={20} color={color.wechatBlue} />
  // femaleIcon = <Icomoon name="female" size={20} color={color.wechatRed} />
  // sexNull = <Text style={{ fontSize: 16, color: '#999' }}>请选择</Text>

  render() {
    const { user } = this.props;
    const { genderValue, updating } = this.state;
    // let avatarSource;
    // if (user.avatar && (user.avatar.startsWith('http://') || user.avatar.startsWith('https://'))) {
    //   avatarSource = { uri: user.avatar };
    // } else {
    //   avatarSource = require('../../../../assets/common/user_default.png');
    // }
    // const avatar = <Image
    //   source={avatarSource}
    //   style={{ width: 0.12 * screen.width, height: 0.12 * screen.width, }}
    // />

    let avatar;
    if (user.avatar && (user.avatar.startsWith('http://') || user.avatar.startsWith('https://'))) {
      avatar = <Image
        source={{ uri: user.avatar }}
        style={{ width: 0.12 * screen.width, height: 0.12 * screen.width, borderRadius: screen.width * 0.06 }}
      />
    } else {
      avatar = <Image
        source={require('../../../../assets/images/common/user_default.png')}
        style={{ width: 0.12 * screen.width, height: 0.12 * screen.width }}
      />
    }
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={indicatorStyles.container}>
          <Separator />
          <WhiteSpace />

          {updating && <ActivityIndicator toast text="正在更新" />}

          <List>
            <Item arrow="horizontal"
              styles={StyleSheet.create(listStyle)}
              extra={avatar}
              onClick={this._selectImage}
            >头像</Item>
            <Item arrow="horizontal"
              styles={StyleSheet.create(listStyle)}
              extra={<ExtraText style={{ fontSize: screen.width * 0.04 }}>{user.name}</ExtraText>}
              onClick={() => {
                this.props.navigation.navigate('ValueSet', {
                  title: '昵称',
                  value: user.name,
                  footerText: '一个昵称，一段时光'
                });
              }}
            >昵称</Item>

            <Picker
              data={this.genderData}
              cols={1}
              title="选择性别"
              value={genderValue ? genderValue : [user.gender]}
              onOk={(value) => { this.onPickerOk.bind(this, value)() }}
              indicatorStyle={{ fontSize: 12, color: 'red' }}
              format={(labels) => {
                return <ExtraText style={{ fontSize: screen.width * 0.04 }}>{labels.join(',')}</ExtraText>
              }}
            >
              <Item arrow="horizontal"
                styles={StyleSheet.create(listStyle)}
              >性别</Item>
            </Picker>
            {/* <Item
            extra={this.state.sexIcon ? this.state.sexIcon : this.sexNull}
            onClick={() => {
              Modal.alert('选择性别', '', [
                { text: '男', onPress: () => this.setState({ sexIcon: this.maleIcon }) },
                { text: '女', onPress: () => this.setState({ sexIcon: this.femaleIcon }) },
              ])
            }}
          >性别</Item> */}

            <Item arrow="horizontal"
              styles={StyleSheet.create(listStyle)}
              extra={<ExtraText style={{ fontSize: screen.width * 0.04 }}>{user.phone}</ExtraText>}
              onClick={() => {
                this.props.navigation.navigate('ProfilePhoneReset', {});
              }}
            >手机号</Item>
          </List>

        </View >
      </SafeAreaView>
    );
  }
}
