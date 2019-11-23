import React from 'react';
import { Dispatch } from 'redux';
import { UserState } from '../../store/user/types';

export interface UserContentProps {
  dispatch: Dispatch;
  user: UserState; 
}

const UserContent: React.FC<UserContentProps> = ({ dispatch, user }) => {
  return <div>{user.id}</div>
}

export default UserContent;