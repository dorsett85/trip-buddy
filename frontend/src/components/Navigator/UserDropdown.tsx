import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popover from '@material-ui/core/Popover';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/react-hooks';
import { makeStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { setOpenDrawer, resetGeneralState } from '../../store/general/actions';
import { setViewInfo, resetUserState } from '../../store/user/actions';
import { resetTripState } from '../../store/trip/actions';
import { AppState } from '../../store';
import { removeLocalToken } from '../../utils/localToken';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';

const useStyles = makeStyles((theme: Theme) => ({
  userPopover: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: 200
  }
}));

const CircularProgressStyled = styled(CircularProgress)`
  position: absolute;
  color: ${props => props.theme.colors.white};
`;

const UserDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const client = useApolloClient();
  const user = useSelector((state: AppState) => state.user);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null as HTMLElement | null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    dispatch(setViewInfo('profile'));
    dispatch(setOpenDrawer(true));
  };

  const handleAccountClick = () => {
    dispatch(setViewInfo('account'));
    dispatch(setOpenDrawer(true));
  };

  const handleLogoutClick = () => {
    setAnchorEl(null);
    removeLocalToken();
    client.clearStore();
    dispatch(resetGeneralState());
    dispatch(resetUserState());
    dispatch(resetTripState());
  };

  return (
    <>
      <IconButton edge='end' onClick={handleMenu} color='inherit'>
        {user.loading && <CircularProgressStyled color='inherit' />}
        <AccountCircle />
      </IconButton>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        classes={{
          paper: classes.userPopover
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography variant='h6' gutterBottom>
          {user.username}
        </Typography>
        <Divider />
        <List>
          <ListItem button onClick={handlePopoverClose}>
            <ListItemText onClick={handleProfileClick} primary='Profile' />
          </ListItem>
          <ListItem button onClick={handlePopoverClose}>
            <ListItemText onClick={handleAccountClick} primary='My Account' />
          </ListItem>
          <ListItem button onClick={handleLogoutClick}>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default UserDropdown;
