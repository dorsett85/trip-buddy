import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LandingModal from '../LandingModal/LandingModal';
import Navigator from '../Navigator/Navigator';
import { AppState } from '../../store';
import { setLoadingUser, setUser, setLoggedIn } from '../../store/user/actions';
import { getLocalToken } from '../../utils/localToken';
import { setLoadingTrips, setTrips } from '../../store/trip/actions';
import TripMapLazy from '../TripMap/TripMapLazy';
import SideDrawerLazy from '../SideDrawer/SideDrawerLazy';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { useLoggedInQuery } from '../ApolloProvider/hooks/queries';

const CheckLoggedIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const loggedIn = useSelector(({ user }: AppState) => user.loggedIn);
  const [getLoggedInData, { loading, data }] = useLoggedInQuery();

  // Check login and run dispatch actions
  useEffect(() => {
    if (loggedIn) {
      getLoggedInData();
    } else {
      const token = getLocalToken();
      if (token) {
        dispatch(setLoggedIn(true));
      }
    }
  }, [loggedIn, getLoggedInData, dispatch]);

  // Dispatch actions for initial loading
  useEffect(() => {
    dispatch(setLoadingUser(loading));
    dispatch(setLoadingTrips(loading));
  }, [dispatch, loading]);

  // Dispatch actions after data is loaded
  if (data) {
    const {
      user: { trips, ...user }
    } = data;
    dispatch(setUser(user));
    dispatch(setTrips(trips));
  }

  return (
    <>
      <LandingModal show={!loggedIn} />
      <Navigator show={loggedIn} />
      <TripMapLazy loggedIn={loggedIn} />
      <SideDrawerLazy />
    </>
  );
};

export default CheckLoggedIn;
