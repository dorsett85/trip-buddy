import React, { useEffect } from 'react';
import LandingModal from '../LandingModal/LandingModal';
import Navigator from '../Navigator/Navigator';
import {
  setLoadingUser,
  setUser,
  setLoggedIn,
  setSetupCompleted
} from '../../store/user/reducer';
import { getLocalToken } from '../../utils/localToken';
import { setLoadingTrips, setTrips } from '../../store/trip/reducer';
import TripMapLazy from '../TripMap/TripMapLazy';
import SideDrawerLazy from '../SideDrawer/SideDrawerLazy';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { useLoggedInQuery } from '../ApolloProvider/hooks/user';
import { useAppSelector } from '../../store/hooks/useAppSelector';

const CheckLoggedIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.user);
  const [getLoggedInData, { loading }] = useLoggedInQuery({
    onCompleted: data => {
      const {
        user: { trips, ...loggedInUser }
      } = data;
      // Remove __typename from new_user_setup object.
      // TODO should we turn this off in the apollo config?
      // eslint-disable-next-line no-underscore-dangle
      delete loggedInUser.new_user_setup.__typename;

      // Set a small timeout so that the progress loading bar appears
      setTimeout(() => {
        // Check if the user has completed all of their setup steps
        if (Object.values(loggedInUser.new_user_setup).every(Boolean)) {
          dispatch(setSetupCompleted(true));
        }
        dispatch(setUser(loggedInUser));
        dispatch(setTrips(trips));
      }, 1000)
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

  return (
    <>
      <LandingModal userState={userState} />
      <Navigator show={loggedIn && setupComplete} />
      <TripMapLazy />
      <SideDrawerLazy />
    </>
  );
};

export default CheckLoggedIn;
