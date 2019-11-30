import React, { memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

export type EditableTextFieldProps = TextFieldProps & {
  editing: boolean;
  submitSuccessText?: string;
  onSubmitEdit: () => void;
  onCancelEdit: () => void;
};

const EditableTextField: React.FC<EditableTextFieldProps> = ({
  editing,
  submitSuccessText,
  onSubmitEdit,
  onCancelEdit,
  ...rest
}) => {
  // Save some typing in other components by calling e.preventDefault() here
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        InputProps={{
          endAdornment: editing && (
            <InputAdornment position='end'>
              <IconButton type='submit' aria-label='submit-edit'>
                <CheckIcon color='primary' />
              </IconButton>
              <IconButton onClick={onCancelEdit} aria-label='cancel-edit'>
                <CloseIcon color='secondary' />
              </IconButton>
            </InputAdornment>
          )
        }}
        {...rest}
      />
      {submitSuccessText && <FormHelperText>{submitSuccessText}</FormHelperText>}
    </form>
  );
};

export default memo(EditableTextField);
