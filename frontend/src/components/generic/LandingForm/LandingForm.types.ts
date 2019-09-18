import { InputProps } from "@material-ui/core/Input";

export enum LandingFormInputs {
  username = '',
  password = ''
}

export interface LandingFormProps {
  onSubmit: (username: string, password: string) => void;
  inputProps?: InputProps['inputProps'];
  submitBtnColor?: MuiColor;
  submitBtnText: string;
}
