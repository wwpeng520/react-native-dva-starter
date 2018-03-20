import { INavigationProps } from '../../index';

export interface INavigationItemProps extends INavigationProps {
  disabled?: boolean;
  icon?: any;
  iconStyle?: Object;
  title?: string;
  titleStyle?: Object;
  onPress?: any;
  IcomoonName?: string;
  IcomoonSize?: number;
  IcomoonColor?: string;
}
