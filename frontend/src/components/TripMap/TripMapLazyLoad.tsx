import React, { lazy, Suspense, memo } from 'react';

const TripMap = lazy(() => import('./TripMap'));

const TripMapLazy = () => (
  <Suspense fallback={<div />}>
    <TripMap />
  </Suspense>
);

export default memo(TripMapLazy);