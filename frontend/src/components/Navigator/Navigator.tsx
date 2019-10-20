import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MapIcon from '@material-ui/icons/Map';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { TOKEN } from '../../utils/constants/localStorage';
import { setLoggedIn } from '../../store/user/actions';
import { User } from '../../types/user';

export const GET_USER = gql`
  query {
    user {
      username
    }
  }
`;

const useStyles = makeStyles((theme: Theme) => ({
  mapIcon: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Navigator: React.FC = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({} as User);
  const classes = useStyles();

  // Define get user and handlers
  const { loading } = useQuery(GET_USER, {
    onCompleted: (data: { user: User }) => {
      setUser(data.user);
    }
  });

  const handleLogoutClick = () => {
    localStorage.removeItem(TOKEN);
    dispatch(setLoggedIn(false));
  };

  if (loading) {
    return <div />;
  }

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <MapIcon className={classes.mapIcon} />
        <Typography variant='h6' className={classes.title}>
          Trip Buddy
        </Typography>
        <Typography variant='h6'>{user.username}</Typography>
        <IconButton
          edge='end'
          onClick={handleLogoutClick}
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navigator;
