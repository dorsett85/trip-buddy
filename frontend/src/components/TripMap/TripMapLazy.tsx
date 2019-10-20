import React, { lazy, Suspense } from 'react';

const TripMap = lazy(() => import('./TripMap'));

const TripMapLazy = () => (
  <Suspense fallback={<div />}>
    <TripMap />
  </Suspense>
);

export default TripMapLazy;