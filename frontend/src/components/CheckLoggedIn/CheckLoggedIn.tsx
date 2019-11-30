import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import LandingModal from '../LandingModal/LandingModal';
import Navigator from '../Navigator/Navigator';
import { AppState } from '../../store';
import { setLoggedIn, setLoadingUser, setUser } from '../../store/user/actions';
import { getLocalToken } from '../../utils/localToken';
import { setLoadingTrips, setTrips } from '../../store/trip/actions';

export const GET_LOGGED_IN_DATA = gql`
  query {
    user {
      id
      username
      email
      password
      email_validated
      created_date
      trips {
        id
        name
        status
        legs {
          id
          name
          location
        }
      }
    }
  }
`;

const CheckLoggedIn: React.FC = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: AppState) => state.user.loggedIn);
  const [getLoggedInData, { loading, data }] = useLazyQuery(GET_LOGGED_IN_DATA);

  // Check login and run dispatch actions
  useEffect(() => {
    if (!loggedIn) {
      const token = getLocalToken();
      if (token) {
        dispatch(setLoggedIn(true));
      }
    } else {
      // user is logged in, get initial data
      getLoggedInData();
    }
  }, [dispatch, loggedIn, getLoggedInData]);

  // Dispatch actions for initial loading
  useEffect(() => {
    dispatch(setLoadingUser(loading));
    dispatch(setLoadingTrips(loading));
  }, [dispatch, loading]);

  // Dispatch actions after data is loaded
  useEffect(() => {
    if (data) {
      const {
        user: { trips, ...user }
      } = data;
      dispatch(setUser(user));
      dispatch(setTrips(trips));
    }
  }, [dispatch, data]);

  return (
    <>
      <LandingModal show={!loggedIn} />
      <Navigator show={loggedIn} />
    </>
  );
};

export default CheckLoggedIn;
