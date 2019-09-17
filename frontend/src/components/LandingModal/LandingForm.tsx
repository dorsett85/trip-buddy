import React, { useState, memo, useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/react-hooks';
import ColoredButton from '../generic/ColoredButton';
import { setUser } from '../../store/user/actions';
import { LandingFormInputs, LandingFormProps, ActionType } from './LandingModal.types';
import { GET_USER } from './queries';


// Define and get action property values
const getActionObj = (action: LandingFormProps['action']): ActionType => {
  const login = action === 'login';
  return {
    submitBtnColor: login ? 'blue' : 'green',
    btnText: login ? 'Login' : 'Register',
    inputProps: {
      maxLength: login ? null : 12,
      minLength: login ? null : 4
    }
  }
}

const LandingForm: React.FC<LandingFormProps> = ({ action }) => {
  const [loginInputs, setLoginInputs] = useState(LandingFormInputs);
  const { username, password } = loginInputs;
  const dispatch = useDispatch();
  const [getUser, { loading, data }] = useLazyQuery(GET_USER);

  // Modify form when the action prop changes
  useEffect(() => {
    setLoginInputs(LandingFormInputs);
  }, [action]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInputs({
      ...loginInputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getUser()
    
    const mutation = `
      mutation {
        createUser(username: "rob", password: "password", email: "bill_russel@gmail.com") {
          id
        }
      }
    `;
    
    // graphqlPost('/api', mutation).then(data => console.log(data));
    // dispatch(setUser({ id: 1, username: 'clayton' }));
  };

  const { submitBtnColor, btnText, inputProps } = getActionObj(action);

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <TextField
          onChange={handleChange}
          value={username}
          name='username'
          label='Username'
          placeholder='enter username...'
          variant='outlined'
          margin='normal'
          required
          inputProps={inputProps}
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          onChange={handleChange}
          value={password}
          name='password'
          label='Password'
          placeholder='enter password...'
          variant='outlined'
          margin='normal'
          required
          inputProps={inputProps}
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormGroup>
      <p>
        <ColoredButton
          clr={submitBtnColor}
          type='submit'
          variant='contained'
          fullWidth
        >
          {btnText}
        </ColoredButton>
      </p>
    </form>
  );
};

export default memo(LandingForm);
