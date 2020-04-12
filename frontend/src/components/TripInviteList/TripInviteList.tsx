import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import styled, { css } from 'styled-components';
import { useGetTripInvitesQuery } from '../ApolloProvider/hooks/tripInvite';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';

interface TripInviteListProps {
  viewing: boolean;
}

const ThumbUpIconStyled = styled(ThumbUpIcon)(
  ({ theme }) => css`
    color: ${theme.colors.primary};
  `
);

const ThumbDownIconStyled = styled(ThumbDownIcon)(
  ({ theme }) => css`
    color: ${theme.colors.secondary};
  `
);

const TripInviteList: React.FC<TripInviteListProps> = ({ viewing }) => {
  const dispatch = useAppDispatch();
  const tripInvitesQuery = useGetTripInvitesQuery();
  const invites = tripInvitesQuery.data?.tripInvites;

  useEffect(() => {
    return () => {
      console.log('unmount');
    };
  }, []);

  if (!invites) {
    return null;
  }

  console.log(invites);

  return (
    <>
      <div>
        You have&nbsp;
        {invites.length}
        &nbsp;invite
        {invites.length !== 1 ? 's' : ''}
      </div>
      <List>
        {invites.map((invite: any) => (
          <ListItem key={invite.id}>
            <ListItemText
              primary={invite.trip.name}
              secondary={new Date(invite.trip.start_date).toLocaleDateString()}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => console.log('first')} value={invite.trip.id}>
                <ThumbUpIconStyled />
              </IconButton>
              <IconButton onClick={() => console.log('second')} value={invite.trip.id}>
                <ThumbDownIconStyled />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TripInviteList;
