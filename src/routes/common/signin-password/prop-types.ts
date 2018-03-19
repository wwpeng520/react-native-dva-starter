import { INavigationProps } from '../../index';
import { IUserState } from '../../../models/user';

export interface ISigninPwdProps extends INavigationProps {
  user: IUserState;
  
}
