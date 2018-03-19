/**
 * 签到页面
 */

import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  StyleSheet,
  InteractionManager,
  Platform,
} from 'react-native';
import { connect } from 'dva-no-router';
import { SafeAreaView } from 'react-navigation';
import * as _ from 'lodash';
import { ActivityIndicator, Button, WhiteSpace, Modal, List, Badge, Toast, InputItem } from 'antd-mobile';
import { Name, Name1, Heading1, Heading2, LittleName } from '../../../components/common/text';
import save2local from '../../../lib/save2local';

import indicatorStyles, { ICheckinStyle } from './style';
import { ICheckinProps } from './prop-types';

import screen from '../../../utils/screen';
import color from '../../../config/color';
import Separator from '../../../components/common/separator';
import Icomoon from 'react-native-vector-icons/Icomoon';
import BackBtn from '../../../components/common/back-btn';
import { buttonStyle } from '../../../utils/redefine-antm-style';
import mObserver from '../../../lib/mObserver';

const today = new Date();
const checkinKey = `${today.getFullYear()}_${today.getMonth() + 1}_${today.getDate()}_check`;

// const selectedIcon = require('../../.././../assets/checkin/check_in_map_selected.png');
// const unSelectedIcon = require('../../.././../assets/checkin/check_in_map_unselected.png');
// const unknowIcon = require('../../.././../assets/checkin/check_in_map_unknow.png');
const selectedIcon = <View style={indicatorStyles.mapIcon}>
  <Icomoon name="check2" size={screen.width * 0.05} color={'#FF9966'} />
</View>
const unSelectedIcon = <View style={indicatorStyles.mapIcon}>
  <Icomoon name="circle" size={screen.width * 0.05} color={'#FF9900'} />
</View>
const unknowIcon = <View style={indicatorStyles.mapIcon}>
  <Icomoon name="ask" size={screen.width * 0.05} color={'#ddd'} />
</View>

@connect(({ user }: ICheckinProps) => ({ user }))
export default class Checkin extends React.Component<ICheckinProps, any> {
  static defaultProps = {
  };

  static navigationOptions = ({ navigation }: any) => ({
    title: "签到",
    headerLeft: <BackBtn dispatch navigation={navigation} />,
    headerRight: <View />
  });

  constructor(props: ICheckinProps) {
    super(props);
    this.state = {
      isChecked: false, // 是否已签到
      isFetching: false,
    }
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      InteractionManager.runAfterInteractions(() => this._init())
    } else {
      this._init()
    }
  }

  async componentWillReceiveProps(nextProps: ICheckinProps) {
    if (nextProps.user.logAction === 'login' && nextProps.user.username !== this.props.user.username) {
      this._init();
    }
  }

  _init = async () => {
    if (!this.props.user.username) {
      await this.props.dispatch({ type: 'user/getUserInfo' });
    }
    const userPhone = _.get(this.props.user, 'phone');
    const check = await save2local.getSessionSignCheck(userPhone);
    console.log("check: ", check, userPhone);
    if (userPhone && check && check === checkinKey) {
      this.setState({ isChecked: true });
    }
  }

  checkin = async () => {
    this.setState({ isFetching: true });
    const checkinRes = await this.props.dispatch({ type: 'user/checkin' });
    if (checkinRes && checkinRes.data && checkinRes.data.result) {
      this.setState({ isChecked: true });
      Toast.info(`签到成功！获得${_.get(checkinRes, 'data.awardCoin')}个金币`, 2);
      const userPhone = _.get(this.props.user, 'phone', 'none');
      console.log(userPhone, checkinKey);
      save2local.storeSessionSignCheck(userPhone, checkinKey);
      mObserver.setEvent("Checkin");
    } else {
      const errMsg = _.get(checkinRes, 'data.error.message')
        ? _.get(checkinRes, 'data.error.message')
        : _.get(checkinRes, 'data.showMessage', '未知错误，请稍后再试');
      Toast.info(errMsg, 2);
      if (errMsg.includes('签过到') || errMsg.includes('签到过') || errMsg.includes('已经')) {
        this.setState({ isChecked: true });
        const userPhone = _.get(this.props.user, 'phone', 'none');
        save2local.storeSessionSignCheck(userPhone, checkinKey);
      }
    }
    this.setState({ isFetching: false });
  }

  render() {
    const { user } = this.props;
    // console.log('user: ', user);
    const checkDays = user.checkins && user.checkins.checkDays ? user.checkins.checkDays : [];
    let days = new Array(30).fill(0);
    let coins = new Array(30).fill(0);
    let maxDay = 0;
    if (checkDays.length) {
      for (let elem of checkDays) {
        // console.log(elem); // [1,5], ..., [7, 10], (天, 该天签到获得的金币)
        days[elem[0] - 1] = elem[0];
        coins[elem[0] - 1] = elem[1];
        if (elem[0] > maxDay) maxDay = elem[0];
      }
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={indicatorStyles.container}>
          <Separator />

          {this.state.isFetching && <ActivityIndicator toast text="正在签到..." />}

          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <View style={indicatorStyles.banner}>
              <Image
                source={require('../../../../assets/images/checkin/banner.png')}
                style={indicatorStyles.banner}
                resizeMethod='resize'
              />
              <View style={indicatorStyles.bannerBox}>
                <Image
                  source={require('../../../../assets/images/checkin/check_in_days.png')}
                  style={indicatorStyles.signImage}
                  resizeMode='contain'
                  resizeMethod='resize'
                />
                <Text style={indicatorStyles.bigNumber}>{_.get(user, 'checkins.continuousCheckDays', '0')}</Text>
                <Text style={indicatorStyles.smallNumber}>累计获得金币{_.get(user, 'checkins.checkSumCoin', '0')}个</Text>
                <Button inline
                  styles={StyleSheet.create(buttonStyle)}
                  style={{ borderWidth: 0, height: screen.width * 0.08, backgroundColor: color.brown }}
                  onClick={this.checkin}
                >
                  <Text style={{ fontSize: screen.width * 0.035, color: '#fff' }}>{this.state.isChecked ? '已签到' : '签 到'}</Text>
                </Button>
              </View>
            </View>

            <View style={indicatorStyles.descBox}>
              <Text style={indicatorStyles.desc}>连续签到第3、7、15、30日高额奖励，连续中断3天重新计算</Text>
            </View>
            <View style={indicatorStyles.calendarBox}>
              <View style={indicatorStyles.calendarLine}>
                <View style={indicatorStyles.lineBg} />
                <View style={indicatorStyles.rightBg} />
                <View style={indicatorStyles.calendarItem}>
                  {!checkDays.length ? unknowIcon : (days[0] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[0] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{coins[0] ? `+${coins[0]}` : ''}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {1 > maxDay - 1 ? unknowIcon : (days[1] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[1] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{1 > maxDay - 1 ? '' : `+${coins[1]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {2 > maxDay - 1 ? unknowIcon : (days[2] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[2] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{2 > maxDay - 1 ? '' : `+${coins[2]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {3 > maxDay - 1 ? unknowIcon : (days[3] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[3] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{3 > maxDay - 1 ? '' : `+${coins[3]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {4 > maxDay - 1 ? unknowIcon : (days[4] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[4] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{4 > maxDay - 1 ? '' : `+${coins[4]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {5 > maxDay - 1 ? unknowIcon : (days[5] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[5] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{5 > maxDay - 1 ? '' : `+${coins[5]}`}</Text>
                </View>
              </View>
              <View style={indicatorStyles.calendarLine}>
                <View style={indicatorStyles.lineBg} />
                <View style={indicatorStyles.leftBg} />
                <View style={indicatorStyles.calendarItem}>
                  {11 > maxDay - 1 ? unknowIcon : (days[11] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[11] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{11 > maxDay - 1 ? '' : `+${coins[11]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {10 > maxDay - 1 ? unknowIcon : (days[10] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[10] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{10 > maxDay - 1 ? '' : `+${coins[10]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {9 > maxDay - 1 ? unknowIcon : (days[9] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[9] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{9 > maxDay - 1 ? '' : `+${coins[9]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {8 > maxDay - 1 ? unknowIcon : (days[8] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[8] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{8 > maxDay - 1 ? '' : `+${coins[8]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {7 > maxDay - 1 ? unknowIcon : (days[7] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[7] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{7 > maxDay - 1 ? '' : `+${coins[7]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {6 > maxDay - 1 ? unknowIcon : (days[6] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[6] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{6 > maxDay - 1 ? '' : `+${coins[6]}`}</Text>
                </View>
              </View>
              <View style={indicatorStyles.calendarLine}>
                <View style={indicatorStyles.lineBg} />
                <View style={indicatorStyles.rightBg} />
                <View style={indicatorStyles.calendarItem}>
                  {12 > maxDay - 1 ? unknowIcon : (days[12] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[12] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{12 > maxDay - 1 ? '' : `+${coins[12]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {13 > maxDay - 1 ? unknowIcon : (days[13] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[13] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{13 > maxDay - 1 ? '' : `+${coins[13]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {14 > maxDay - 1 ? unknowIcon : (days[14] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[14] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{14 > maxDay - 1 ? '' : `+${coins[14]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {15 > maxDay - 1 ? unknowIcon : (days[15] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[15] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{15 > maxDay - 1 ? '' : `+${coins[15]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {16 > maxDay - 1 ? unknowIcon : (days[16] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[16] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{16 > maxDay - 1 ? '' : `+${coins[16]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {17 > maxDay - 1 ? unknowIcon : (days[17] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[17] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{17 > maxDay - 1 ? '' : `+${coins[17]}`}</Text>
                </View>
              </View>
              <View style={indicatorStyles.calendarLine}>
                <View style={indicatorStyles.lineBg} />
                <View style={indicatorStyles.leftBg} />
                <View style={indicatorStyles.calendarItem}>
                  {23 > maxDay - 1 ? unknowIcon : (days[23] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[23] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{23 > maxDay - 1 ? '' : `+${coins[23]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {22 > maxDay - 1 ? unknowIcon : (days[22] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[22] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{22 > maxDay - 1 ? '' : `+${coins[22]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {21 > maxDay - 1 ? unknowIcon : (days[21] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[21] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{21 > maxDay - 1 ? '' : `+${coins[21]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {20 > maxDay - 1 ? unknowIcon : (days[20] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[20] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{20 > maxDay - 1 ? '' : `+${coins[20]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {19 > maxDay - 1 ? unknowIcon : (days[19] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[19] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{19 > maxDay - 1 ? '' : `+${coins[19]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {18 > maxDay - 1 ? unknowIcon : (days[18] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[18] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{18 > maxDay - 1 ? '' : `+${coins[18]}`}</Text>
                </View>
              </View>
              <View style={indicatorStyles.calendarLine}>
                <View style={indicatorStyles.lineBg} />
                <View style={indicatorStyles.calendarItem}>
                  {24 > maxDay - 1 ? unknowIcon : (days[24] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[24] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{24 > maxDay - 1 ? '' : `+${coins[24]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {25 > maxDay - 1 ? unknowIcon : (days[25] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[25] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{25 > maxDay - 1 ? '' : `+${coins[25]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {26 > maxDay - 1 ? unknowIcon : (days[26] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[26] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{26 > maxDay - 1 ? '' : `+${coins[26]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {27 > maxDay - 1 ? unknowIcon : (days[27] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[27] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{27 > maxDay - 1 ? '' : `+${coins[27]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {28 > maxDay - 1 ? unknowIcon : (days[28] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[28] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{28 > maxDay - 1 ? '' : `+${coins[28]}`}</Text>
                </View>
                <View style={indicatorStyles.calendarItem}>
                  {29 > maxDay - 1 ? unknowIcon : (days[29] ? selectedIcon : unSelectedIcon)}
                  <Text style={days[29] ? indicatorStyles.calendarSelectedTitle : indicatorStyles.calendarUnSelectedTitle}>{29 > maxDay - 1 ? '' : `+${coins[29]}`}</Text>
                </View>
              </View>
            </View>
            <WhiteSpace />

            <View style={indicatorStyles.recommendHeader}>
              <Icomoon name="coin" size={screen.width * 0.05} color={'gold'} />
              <Name style={{ marginLeft: 5, }}>关于金币</Name>
            </View>
            <View style={indicatorStyles.aboutItem}>
              <Name>1.金币的用途</Name>
              <LittleName
                style={{ marginTop: 8, lineHeight: 18, }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金币可帮助大家免费使用高级功能，如定时发布微博、有奖活动等等，未来将开通更多其他功能。</LittleName>
            </View>
            <View style={indicatorStyles.aboutItem}>
              <Name>2.如何获得金币</Name>
              <LittleName
                style={{ marginTop: 8, lineHeight: 18, }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;坚持每日签到可获得金币，未来将开通更多获取金币的方式。</LittleName>
            </View>
          </ScrollView>


        </View>
      </SafeAreaView>
    );
  }
}
