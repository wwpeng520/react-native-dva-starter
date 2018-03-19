import { INavigationProps } from '../../index';

export interface ITabBarProps extends INavigationProps {
  tabs: string[];
  style?: any;
  goToPage?: any;
  scrollValue?: any;
  activeTab?: number;
}
