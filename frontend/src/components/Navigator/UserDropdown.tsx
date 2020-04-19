import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useApolloClient } from '@apollo/react-hooks';
import styled, {css} from 'styled-components';
import { UserRecord } from 'common/lib/types/user';
import { setDrawer, resetGeneralState } from '../../store/general/reducer';
import { resetUserState } from '../../store/user/reducer';
import { resetTripState } from '../../store/trip/reducer';
import { removeLocalToken } from '../../utils/localToken';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';

interface UserDropdownProps {
  user: UserRecord;
}

const PopoverDropdown = styled(Popover)(({ theme }) => css`
  .MuiPopover-paper {
    padding: ${theme.spacing('sm')} ${theme.spacing('sm')} 0;
    width: 200px;
  }
`);

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const client = useApolloClient();
  const [anchorEl, setAnchorEl] = useState(null as HTMLElement | null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleAccountClick = () => {
    dispatch(setDrawer({ open: true, content: 'user' }));
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
        <AccountCircle />
      </IconButton>
      <PopoverDropdown
        open={!!anchorEl}
        anchorEl={anchorEl}
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
        <div>
          <Typography variant='h6' gutterBottom>
            {user.username}
          </Typography>
          <Divider />
          <List>
            <ListItem button onClick={handlePopoverClose}>
              <ListItemText onClick={handleAccountClick} primary='My Account' />
            </ListItem>
            <ListItem button onClick={handleLogoutClick}>
              <ListItemText primary='Logout' />
            </ListItem>
          </List>
        </div>
      </PopoverDropdown>
    </>
  );
};

export default UserDropdown;
