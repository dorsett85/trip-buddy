import React, { useEffect } from 'react';
import LandingModal from '../LandingModal/LandingModal';
import Navigator from '../Navigator/Navigator';
import { setLoadingUser, setUser, setLoggedIn } from '../../store/user/reducer';
import { getLocalToken } from '../../utils/localToken';
import { setLoadingTrips, setTrips } from '../../store/trip/reducer';
import TripMapLazy from '../TripMap/TripMapLazy';
import SideDrawerLazy from '../SideDrawer/SideDrawerLazy';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { useLoggedInQuery } from '../ApolloProvider/hooks/queries';
import { useAppSelector } from '../../store/hooks/useAppSelector';

const CheckLoggedIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.user);
  const [getLoggedInData, { loading }] = useLoggedInQuery({
    onCompleted: data => {
      const {
        user: { trips, ...loggedInUser }
      } = data;
      dispatch(setUser(loggedInUser));
      dispatch(setTrips(trips));
    }
  });

  const { loggedIn, setupComplete } = userState;

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
  
  const showLanding = !loggedIn || !setupComplete;

  return (
    <>
      <LandingModal userState={userState} />
      <Navigator show={!showLanding} />
      <TripMapLazy />
      <SideDrawerLazy />
    </>
  );
};

export default CheckLoggedIn;
