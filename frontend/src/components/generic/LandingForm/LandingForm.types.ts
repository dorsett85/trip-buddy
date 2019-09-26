import { InputProps } from "@material-ui/core/Input";

export enum LandingFormInputs {
  username = '',
  password = ''
}

export interface LandingFormProps {
  action: 'login' | 'register',
  onSubmit: (username: string, password: string) => void;
}

export interface FormVals {
  usernameLabel: 'Username or Email' | 'Email';
  usernamePlaceholder: 'enter username or email' | 'enter email';
  submitBtnColor: MuiColor;
  submitBtnText: 'Login' | 'Register';
  inputProps: InputProps['inputProps'];
}