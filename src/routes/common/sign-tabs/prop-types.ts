import { INavigationProps } from '../../index';
import { IUserState } from '../../../models/user';

export interface ISignProps extends INavigationProps {
  dispatch: any;
  user: IUserState;
  tabLabel: string;
}
