import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LandingModal from '../LandingModal/LandingModal';
import Navigator from '../Navigator/Navigator';
import { AppState } from '../../store';
import { setLoggedIn } from '../../store/user/actions';
import { TOKEN } from '../../utils/constants/localStorage';

const CheckLoggedIn: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn);
  if (!isLoggedIn) {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      dispatch(setLoggedIn(true));
    }
  }

  return (
    <>
      <LandingModal show={!isLoggedIn} />
      <Navigator show={isLoggedIn} />
    </>
  );
};

export default CheckLoggedIn;
