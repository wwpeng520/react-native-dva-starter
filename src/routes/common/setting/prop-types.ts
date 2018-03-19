import { INavigationProps } from '../../index';
import { IUserState } from '../../../models/user';

export interface ISettingProps extends INavigationProps {
  user: IUserState

}
