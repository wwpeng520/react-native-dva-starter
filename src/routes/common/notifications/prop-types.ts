import { INavigationProps } from '../../index';
import { INotification, INotificationState } from '../../../models/notifications';
import { IUserState } from '../../../models/user';
import { IConfigState } from '../../../models/config';

export interface INotificationProps extends INavigationProps {
  notifications: INotificationState;
  tabLabel: string;
  markAllRead: boolean;
  initTitle?: string;
  initContent?: string;
  user: IUserState;
  config: IConfigState;
}
