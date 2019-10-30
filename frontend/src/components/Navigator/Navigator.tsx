import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import MapIcon from '@material-ui/icons/Map';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ShowComponent } from '../../types/componentProps';
import UserDropdown from './UserDropdown';

const useStyles = makeStyles((theme: Theme) => ({
  menuIcon: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Navigator: React.FC<ShowComponent> = ({ show }) => {
  const classes = useStyles();

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
          {show && <UserDropdown />}
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Navigator;
