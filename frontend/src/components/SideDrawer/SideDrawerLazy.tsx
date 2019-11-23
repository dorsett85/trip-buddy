import React, { lazy, Suspense } from 'react';

const SideDrawer = lazy(() => import('./SideDrawer'));

const SideDrawerLazy = () => (
  <Suspense fallback={<div />}>
    <SideDrawer />
  </Suspense>
);

export default SideDrawerLazy;