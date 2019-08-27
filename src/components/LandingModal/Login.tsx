import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Login: React.FC = () => {
  return (
    <form>
      <FormGroup>
        <TextField
          name='username'
          label='Username'
          placeholder='enter username...'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          name='username'
          label='Password'
          placeholder='enter password...'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormGroup>
      <Button type='submit' variant='contained' fullWidth color='primary'>
        Login
      </Button>
    </form>
  );
};

export default Login;
