import { INavigationProps } from '../../index';
import { IUserState } from '../../../models/user'

export interface ICheckinProps extends INavigationProps {
  user: IUserState;
}
