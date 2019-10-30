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
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { gql } from 'apollo-boost';
import { TOKEN } from '../../utils/constants/localStorage';
import { setLoggedIn, setUser } from '../../store/user/actions';
import { User } from '../../types/user';
import { AppState } from '../../store';

export const GET_USER = gql`
  query {
    user {
      username
      trips {
        id
      }
    }
  }
`;

const useStyles = makeStyles((theme: Theme) => ({
  loadingUser: {
    position: 'absolute',
    color: theme.palette.common.white
  },
  userPopover: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: 200
  }
}));

const UserDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const user = useSelector((state: AppState) => state.user);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null as HTMLElement | null);
  
  // Define get user and handlers
  const { loading } = useQuery(GET_USER, {
    onCompleted: (data: { user: User }) => {
      dispatch(setUser(data.user));
    }
  });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setAnchorEl(null);
    localStorage.removeItem(TOKEN);
    client.clearStore();
    dispatch(setLoggedIn(false));
  };

  return (
    <>
      <IconButton edge='end' onClick={handleMenu} color='inherit'>
        {loading && (
          <CircularProgress className={classes.loadingUser} color='secondary' />
        )}
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
            <ListItemText primary='Profile' />
          </ListItem>
          <ListItem button onClick={handlePopoverClose}>
            <ListItemText primary='My Account' />
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
