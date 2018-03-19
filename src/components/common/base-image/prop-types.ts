import { INavigationProps } from '../../index';

export interface IBaseImageProps extends INavigationProps {
  style: any;
  source: any;
  imgSize?: number;
  resizeMode?: string;
  resizeMethod?: string;
  indicator?: any;
  indicatorProps?: Object;
}
