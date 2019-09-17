export enum LandingFormInputs {
  username = '',
  password = ''
}

export interface LandingFormProps {
  action: 'login' | 'register';
}

export interface ActionType {
  submitBtnColor: MuiColor;
  btnText: string;
  inputProps: {
    maxLength: number | null;
    minLength: number | null;
  };
}
