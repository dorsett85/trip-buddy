import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LandingModal from '../LandingModal/LandingModal';
import { AppState } from '../../store';
import { setLoggedIn } from '../../store/user/actions';

const CheckLoggedIn: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: AppState) => state.user);
  if (!isLoggedIn) {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setLoggedIn(true));
    }
  }

  return !isLoggedIn ? <LandingModal /> : <></>;
};

export default CheckLoggedIn;
