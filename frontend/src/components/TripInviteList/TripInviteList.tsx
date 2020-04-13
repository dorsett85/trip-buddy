import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DoneIcon from '@material-ui/icons/Done';
import styled, { css } from 'styled-components';
import { TripInviteRecord } from 'common/lib/types/tripInvite';
import { Radio, ListItemIcon } from '@material-ui/core';
import {
  useGetTripInvitesQuery,
  useUpdateTripInviteMutation
} from '../ApolloProvider/hooks/tripInvite';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';

interface ListItemNotificationProps {
  notificationInfo: Pick<TripInviteRecord, 'id' | 'status'>;
  onClick: (inviteUpdate: Pick<TripInviteRecord, 'id' | 'status'>) => void;
}

const NotificationRadio = styled(Radio)(
  ({ theme }) => css`
    &.MuiRadio-colorPrimary {
      color: ${theme.colors.primary};
    }
    &.Mui-checked {
      color: ${theme.colors.primary};
    }
  `
);

const ListItemNotification: React.FC<ListItemNotificationProps> = ({
  notificationInfo,
  onClick
}) => {
  const notified = notificationInfo.status !== 'initiated';
  const [checked, setChecked] = useState(notified);

  if (notified) {
    return null;
  }

  const handleOnClick = () => {
    setChecked(true);
    onClick({ id: notificationInfo.id, status: 'notified' });
  };

  return (
    <ListItemIcon>
      <NotificationRadio
        edge='start'
        checked={checked}
        onClick={handleOnClick}
        icon={<NotificationsIcon />}
        checkedIcon={<DoneIcon />}
        color='primary'
        inputProps={{ 'aria-label': 'notified' }}
      />
    </ListItemIcon>
  );
};

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

const TripInviteList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, refetch } = useGetTripInvitesQuery();
  const [updateTripInviteMutation] = useUpdateTripInviteMutation();
  const invites = data?.tripInvites;

  if (!invites) {
    return null;
  }

  const handleNotificationClick: ListItemNotificationProps['onClick'] = async inviteUpdate => {
    
    try {
      await updateTripInviteMutation({ variables: { input: inviteUpdate }});
      
      // Refetch the data to get updated invite status
      await refetch();
    } catch (e) {
      console.log(e);
    }
  };

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
            <ListItemNotification
              notificationInfo={invite}
              onClick={handleNotificationClick}
            />
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
