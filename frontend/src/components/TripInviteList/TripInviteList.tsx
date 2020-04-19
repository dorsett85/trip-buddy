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
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { addTrip } from '../../store/trip/reducer';
import {
  ACCEPT_TRIP_INVITE_MUTATION,
  GET_TRIP_INVITES_QUERY,
  UPDATE_TRIP_INVITE_MUTATION
} from '../../api/apollo/gql/tripInvite';

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
  ({ theme, color }) => css`
    color: ${color === 'disabled' ? 'inherit' : theme.colors.primary};
  `
);

const ThumbDownIconStyled = styled(ThumbDownIcon)(
  ({ theme, color }) => css`
    color: ${color === 'disabled' ? 'inherit' : theme.colors.secondary};
  `
);

const TripInviteList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, refetch } = useQuery(GET_TRIP_INVITES_QUERY, { fetchPolicy: 'no-cache' });
  const [updateTripInviteMutation] = useMutation(UPDATE_TRIP_INVITE_MUTATION);
  const [acceptTripInviteMutation] = useMutation(ACCEPT_TRIP_INVITE_MUTATION);
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
      // TODO do something with failed notified update
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
        const res = await acceptTripInviteMutation({
          variables: { id: input.id }
        });
        dispatch(addTrip(res.data.acceptTripInvite));
      } else {
        // 'declined' trip invites simply need to update the trip invite record
        await updateTripInviteMutation({ variables: { input } });
      }
      // Refresh the trip invites to update the UI
      await refetch();
    } catch (e) {
      // TODO do something with failed status update
    }
  };

  const showInviteItems = (invite: any) => {
    const isAccepted = invite.status === 'accepted';
    const isDeclined = invite.status === 'declined';
    const isDisabled = isAccepted || isDeclined;
    const showAcceptBtn = !isDeclined;
    const showDeclineBtn = !isAccepted;
    return (
      <ListItem key={invite.id} disabled={isDisabled}>
        <ListItemNotification
          notificationInfo={invite}
          onClick={handleNotificationClick}
        />
        <ListItemText
          primary={invite.trip.name}
          secondary={new Date(invite.trip.start_date).toLocaleString(navigator.language, {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        />
        <ListItemSecondaryAction>
          {showAcceptBtn && (
            <IconButton
              onClick={handleStatusOnClick('accepted')}
              value={invite.id}
              disabled={isDisabled}
            >
              <ThumbUpIconStyled color={isDisabled ? 'disabled' : undefined} />
            </IconButton>
          )}
          {showDeclineBtn && (
            <IconButton
              onClick={handleStatusOnClick('declined')}
              value={invite.id}
              disabled={isDisabled}
            >
              <ThumbDownIconStyled color={isDisabled ? 'disabled' : undefined} />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  return (
    <>
      <div>
        You have&nbsp;
        {invites.length}
        &nbsp;invite
        {invites.length !== 1 ? 's' : ''}
      </div>
      <List>{invites.map(showInviteItems)}</List>
    </>
  );
};

export default TripInviteList;
