import React, { memo } from 'react';
import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import Tabs, { TabsProps } from '@material-ui/core/Tabs';
import { TabProps } from '@material-ui/core/Tab';

export interface TabBarProps {
  appBarProps?: AppBarProps;
  tabsProps?: TabsProps;
  children?: React.ReactElement<TabProps>[] | React.ReactElement<TabProps>;
}

const TabBar: React.FC<TabBarProps> = ({ appBarProps, tabsProps, children }) => {
  // Set defaults for the AppBar and Tabs components
  const { position = 'static', color = 'default', ...restAppBarProps } =
    (appBarProps as AppBarProps) || {};
  const {
    indicatorColor = 'primary',
    textColor = 'primary',
    variant = 'fullWidth',
    ...restTabsProps
  } = (tabsProps as TabsProps) || {};
  
  return (
    <AppBar position={position} color={color} {...restAppBarProps}>
      <Tabs
        indicatorColor={indicatorColor}
        textColor={textColor}
        variant={variant}
        {...restTabsProps}
      >
        {children}
      </Tabs>
    </AppBar>
  );
};

export default memo(TabBar);
