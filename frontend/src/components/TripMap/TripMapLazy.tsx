import React, { lazy, Suspense } from 'react';

interface TripMapLazyProps {
  loggedIn: boolean;
}

const TripMap = lazy(() => import('./TripMap'));

const TripMapLazy: React.FC<TripMapLazyProps> = props => (
  <Suspense fallback={<div />}>
    <TripMap {...props} />
  </Suspense>
);

export default TripMapLazy;