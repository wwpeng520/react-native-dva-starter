import { INavigationProps } from '../../index';

export interface IInputWithButtonProps extends INavigationProps {
  editable?: boolean;
  onClick?: any;
  value?: string;
  placeholder?: string;
  btnText?: string;
  style?: any;
  inputStyle?: any;
  btnStyle?: any;
  inputTextStyle?: any;
  btnTitleStyle?: any;
}
