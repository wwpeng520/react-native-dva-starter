import { INavigationProps } from '../../index';

export interface IBackBtnProps extends INavigationProps {
  title?: string;
  titleStyle?: Object;
  onPress?: any;
  iconColor?: string;
}
