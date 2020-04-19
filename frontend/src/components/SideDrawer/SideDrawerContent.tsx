import React from 'react';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import { useActiveTrip } from '../../store/hooks/useTrip';
import TripsView from '../TripsView/TripsView';
import UserAccount from '../UserAccount/UserAccount';
import TripDetail from '../TripDetail/TripDetail';
import { useUserData } from '../../store/hooks/useUser';

const SideDrawerContent: React.FC = () => {
  const userData = useUserData();
  const content = useAppSelector(({ general }) => general.drawer.content);
  const activeTrip = useActiveTrip();

  // Logic checks for what the drawer content should be
  let view: React.ReactNode = null;
  if (content === 'trip') {
    view = activeTrip ? <TripDetail trip={activeTrip} /> : <TripsView />;
  } else if (content === 'user' && userData) {
    view = <UserAccount user={userData} />;
  }

  return <>{view}</>;
};

export default SideDrawerContent;
