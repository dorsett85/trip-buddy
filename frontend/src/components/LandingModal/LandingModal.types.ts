export enum LandingFormInputs {
  username = '',
  password = ''
}

export type LandingFormType = 'login' | 'register';

export interface LandingFormProps {
  action: LandingFormType;
}

export interface ActionType {
  submitBtnColor: MuiColor;
  btnText: string;
  inputProps: {
    maxLength: number | null;
    minLength: number | null;
  };
}
