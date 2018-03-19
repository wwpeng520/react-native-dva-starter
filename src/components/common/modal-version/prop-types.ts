import { INavigationProps } from '../../index';
import { IVersion } from '../../../models/version'

export interface IModalVersionProps extends INavigationProps {
  style?: Object;
  version: IVersion;
  onClose: any;
}
