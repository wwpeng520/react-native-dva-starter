import { INavigationProps } from '../../index';
import { IUserState } from '../../../models/user';

export interface IProfileProps extends INavigationProps {
  user: IUserState;
}
