import React, { lazy, Suspense } from 'react';

const TripMap = lazy(() => import('./TripMap'));

const TripMapLazy: React.FC = props => (
  <Suspense fallback={<div />}>
    <TripMap {...props} />
  </Suspense>
);

export default TripMapLazy;