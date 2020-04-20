import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import {
  setLoadingUser,
  setUser,
  setLoggedIn,
  setSetupCompleted
} from '../../store/user/reducer';
import { getLocalToken } from '../../utils/localToken';
import { setLoadingTrips, setTrips } from '../../store/trip/reducer';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { useUserLoggedInAndConnected } from '../../store/hooks/useUser';
import { LOGGED_IN_DATA_QUERY } from '../../api/apollo/gql/user';

const CheckLoggedIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const userLoggedInAndConnected = useUserLoggedInAndConnected();
  const [getLoggedInData, { loading }] = useLazyQuery(LOGGED_IN_DATA_QUERY, {
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
      }, 500);
    }
  });

  // In order to pull user data, we need to make sure that they are logged in
  // and the websocket subscription is connected.
  useEffect(() => {
    if (userLoggedInAndConnected) {
      getLoggedInData();
    } else {
      const token = getLocalToken();
      if (token) {
        dispatch(setLoggedIn(true));
      }
    }
  }, [userLoggedInAndConnected, getLoggedInData, dispatch]);

  // Dispatch actions for initial loading
  useEffect(() => {
    dispatch(setLoadingUser(loading));
    dispatch(setLoadingTrips(loading));
  }, [dispatch, loading]);

  return null;
};

export default CheckLoggedIn;
