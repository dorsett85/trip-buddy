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
  useAcceptTripInviteMutation,
  useGetTripInvitesQuery,
  useUpdateTripInviteMutation
} from '../ApolloProvider/hooks/tripInvite';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';

type TripInviteStatusUpdate = Pick<TripInviteRecord, 'id' | 'status'>;

interface ListItemNotificationProps {
  notificationInfo: TripInviteStatusUpdate;
  onClick: (inviteUpdate: TripInviteStatusUpdate) => void;
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
  const [acceptTripInviteMutation] = useAcceptTripInviteMutation();
  const invites = data?.tripInvites;

  if (!invites) {
    return null;
  }

  const handleNotificationClick: ListItemNotificationProps['onClick'] = async inviteUpdate => {
    try {
      // After making the status update, make sure to refetch the data to get updated invite status
      await updateTripInviteMutation({ variables: { input: inviteUpdate } });
      await refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const handleStatusOnClick = (
    status: 'accepted' | 'declined'
  ): React.MouseEventHandler<HTMLButtonElement> => async ({ currentTarget }) => {
    const input: TripInviteStatusUpdate = {
      id: +currentTarget.value,
      status
    };
    try {
      if (input.status === 'accepted') {
        // For 'accepted' trip invites, we need to make a different gql mutation call that will
        // not just update the trip invite status, but also create a new users_trips record and
        // return the entire trip record so we can update the ui.
        const acceptedTrip = await acceptTripInviteMutation({ variables: { input } });
        console.log(acceptedTrip);
      } else {
        // 'declined' trip invites simply need to update the trip invite record
        await updateTripInviteMutation({ variables: { input } });
      }
      // Refresh the trip invites to update the UI
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
              <IconButton onClick={handleStatusOnClick('accepted')} value={invite.id}>
                <ThumbUpIconStyled />
              </IconButton>
              <IconButton onClick={handleStatusOnClick('declined')} value={invite.id}>
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
