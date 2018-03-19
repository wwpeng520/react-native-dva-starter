import { INavigationProps } from '../../index';

export interface IGalleryProps extends INavigationProps {
  images: string[];
  initialPage: number;
}
