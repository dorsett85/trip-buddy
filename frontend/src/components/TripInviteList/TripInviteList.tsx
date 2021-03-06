import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import NotificationsIcon from '@material-ui/icons/Notifications';
import styled, { css } from 'styled-components';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { addTrip, deleteTripInviteNotification } from '../../store/trip/reducer';
import {
  TripInvite,
  useAcceptTripInviteMutation,
  useTripInvitesQuery,
  useUpdateTripInviteMutation
} from '../../api/apollo/graphql';

type TripInviteStatusUpdate = Pick<TripInvite, 'id' | 'status'>;

const HIDE_NOTIFICATION_ICON_CLASS = 'hideNotificationIcon';

const NotificationListItemIcon = styled(ListItemIcon)`
  width: 48px;
  min-width: 0;
  margin-left: -16px;
  transition: width 0.5s ease-out, margin-left 0.5s ease-out;
  &.${HIDE_NOTIFICATION_ICON_CLASS} {
    width: 0;
    margin-left: 0;
    visibility: hidden;
  }
`;

interface ListItemNotificationProps {
  notificationInfo: TripInviteStatusUpdate;
  onClick: (inviteUpdate: TripInviteStatusUpdate) => void;
}

const ListItemNotification: React.FC<ListItemNotificationProps> = ({
  notificationInfo,
  onClick
}) => {
  const notified = notificationInfo.status !== 'initiated';

  const handleOnClick = () => {
    onClick({ id: notificationInfo.id, status: 'notified' });
  };

  return (
    <NotificationListItemIcon
      className={notified ? HIDE_NOTIFICATION_ICON_CLASS : undefined}
    >
      <IconButton onClick={handleOnClick} title='Remove Notification' color='secondary'>
        <NotificationsIcon />
      </IconButton>
    </NotificationListItemIcon>
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
  const { data, refetch } = useTripInvitesQuery({ fetchPolicy: 'no-cache' });
  const [updateTripInviteMutation] = useUpdateTripInviteMutation();
  const [acceptTripInviteMutation] = useAcceptTripInviteMutation();
  const invites = data?.tripInvites;

  if (!invites) {
    return null;
  }

  // Sort the array by start date ascending (trips starting sooner appear first)
  invites.sort((a: any, b: any) => (a.trip.start_date < b.trip.start_date ? -1 : 1));

  const handleNotificationClick: ListItemNotificationProps['onClick'] = async inviteUpdate => {
    try {
      // Change the status to 'notified' and remove the notification
      await updateTripInviteMutation({ variables: { input: inviteUpdate } });
      dispatch(deleteTripInviteNotification(inviteUpdate.id));
    } catch (e) {
      // TODO do something with failed notified update
    }
    // Make sure to refetch the data to get updated invite status
    await refetch();
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
        const { data: tripData } = await acceptTripInviteMutation({
          variables: { id: input.id }
        });
        if (tripData) {
          dispatch(addTrip(tripData.acceptTripInvite));
        }
      } else {
        // 'declined' trip invites simply need to update the trip invite record
        await updateTripInviteMutation({ variables: { input } });
      }
      // Remember to remove the trip notification
      dispatch(deleteTripInviteNotification(input.id));
    } catch (e) {
      // TODO do something with failed status update
    }
    // Refresh the trip invites to update the UI
    await refetch();
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
