import React from 'react';
import { DispatchProp } from 'react-redux';
import { useGetTripInvitesQuery } from '../ApolloProvider/hooks/tripInvite';

const TripInviteList: React.FC<DispatchProp> = ({ dispatch }) => {
  const tripInvitesQuery = useGetTripInvitesQuery();

  console.log(tripInvitesQuery.data);

  return <div>Invites</div>;
};

export default TripInviteList;
