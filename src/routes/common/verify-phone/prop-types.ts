import { INavigationProps } from '../../index';
import { IUserState } from '../../../models/user';

export interface IVerifyPhoneProps extends INavigationProps {
  user: IUserState;
  
}
