import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Slide from '@material-ui/core/Slide';
import MapIcon from '@material-ui/icons/Map';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { TOKEN } from '../../utils/constants/localStorage';
import { setLoggedIn } from '../../store/user/actions';
import { User } from '../../types/user';
import { ShowComponent } from '../../types/componentProps';

export const GET_USER = gql`
  query {
    user {
      username
    }
  }
`;

const useStyles = makeStyles((theme: Theme) => ({
  menuIcon: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  username: {
    marginRight: theme.spacing(2)
  }
}));

const Navigator: React.FC<ShowComponent> = ({ show }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({} as User);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null as HTMLElement | null);

  // Define get user and handlers
  const { loading } = useQuery(GET_USER, {
    onCompleted: (data: { user: User }) => {
      setUser(data.user);
    }
  });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setAnchorEl(null);
    localStorage.removeItem(TOKEN);
    dispatch(setLoggedIn(false));
  };

  if (loading) {
    return <div />;
  }

  return (
    <Slide in={show} direction='down'>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Trip Buddy
          </Typography>
          <IconButton color='inherit'>
            <MapIcon />
          </IconButton>
          <IconButton edge='end' onClick={handleMenu} color='inherit'>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled>{user.username}</MenuItem>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Navigator;
