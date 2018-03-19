import { INavigationProps } from '../../index';
import { IUserState } from '../../../models/user';

export interface IResetPasswordProps extends INavigationProps {
    dispatch: any;
    user: IUserState;
}
