import React, { memo, useEffect } from 'react';
import { useUserData } from '../../store/hooks/useUser';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import {
  setTripInviteNotifications,
  addTripInviteNotification
} from '../../store/trip/reducer';
import {
  useTripInitiatedInvitesIdQuery,
  useTripInviteCreatedSubscription
} from '../../api/apollo/graphql';

/**
 * Component to fetch all trip related notifications
 */
const GetTripNotifications: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: queryData } = useTripInitiatedInvitesIdQuery({
    // Subscriptions not currently working in production, so we'll use polling
    // instead. (waiting on resolution).
    // https://github.com/apollographql/graphql-subscriptions/issues/187
    // pollInterval: process.env.NODE_ENV === 'production' ? 2000 : 0
  });
  const { data: subscriptionData } = useTripInviteCreatedSubscription();

  useEffect(() => {
    if (queryData) {
      const inviteIds = queryData.tripInvites.map(invite => invite.id);
      dispatch(setTripInviteNotifications(inviteIds));
    }
  }, [dispatch, queryData]);

  useEffect(() => {
    console.log(subscriptionData);
    if (subscriptionData) {
      dispatch(addTripInviteNotification(subscriptionData.tripInviteCreated.id));
    }
  }, [dispatch, subscriptionData]);

  return null;
};

/**
 * Container Component to check if user is ready to get notifications, i.e., we
 * can't open up a subscription connection in GetTripNotifications if there's
 * no user authorization token.
 */
const TripNotifications: React.FC = () => {
  const userData = useUserData();
  return userData ? <GetTripNotifications /> : null;
};

export default memo(TripNotifications);
