import React, { useState } from 'react';
import { DispatchProp } from 'react-redux';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Trip, tripStatus } from '../../types/trip';
import EditableTextField from '../generic/EditableTextField/EditableTextField';
import {
  UPDATING_MESSAGE,
  SUCCESSFUL_UPDATE_MESSAGE
} from '../../utils/constants/messages';
import { updateTrip } from '../../store/trip/actions';
import { getFirstError } from '../../utils/apolloErrors';
import TripItineraries from './TripItineraries';

export const UPDATE_TRIP = gql`
  mutation UpdateTrip($input: UpdateTripInput) {
    updateTrip(input: $input) {
      name
      status
      start_date
    }
  }
`;

export interface TripContentProps extends DispatchProp {
  trip: Trip;
}

const TripNameInput: React.FC<TripContentProps> = ({ dispatch, trip }) => {
  const [name, setName] = useState(trip.name);
  const [editingName, setEditingName] = useState(false);
  const [updateNameText, setUpdateNameText] = useState('');
  const [updateNameError, setUpdateNameError] = useState(false);

  const [updateTripQuery, { loading }] = useMutation(UPDATE_TRIP, {
    onCompleted: () => {
      setEditingName(false);
      setUpdateNameError(false);
      dispatch(updateTrip({ id: trip.id, name }));
      setUpdateNameText(SUCCESSFUL_UPDATE_MESSAGE);
    },
    onError: error => {
      setUpdateNameError(true);
      setUpdateNameText(getFirstError(error));
    }
  });

  const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEditingName(true);
    setName(target.value);
  };

  const handleSubmitName = () => {
    setUpdateNameError(false);
    setUpdateNameText('');
    if (name.length >= 4) {
      updateTripQuery({ variables: { input: { id: trip.id, name } } });
    } else {
      setUpdateNameError(true);
      setUpdateNameText('Trip name must be at least 4 characters');
    }
  };

  const handleCancelName = () => {
    if (name !== trip.name) {
      setName(trip.name);
    }
    setEditingName(false);
    setUpdateNameError(false);
    setUpdateNameText('');
  };

  return (
    <EditableTextField
      label='Name'
      value={name}
      editing={editingName}
      onChange={handleNameChange}
      onSubmitEdit={handleSubmitName}
      onCancelEdit={handleCancelName}
      helperText={loading ? UPDATING_MESSAGE : updateNameText}
      error={updateNameError}
      fullWidth
      margin='normal'
    />
  );
};

const TripDescriptionInput: React.FC<TripContentProps> = ({ dispatch, trip }) => {
  const [description, setDescription] = useState(trip.description);
  const [editingDescription, setEditingDescription] = useState(false);
  const [updateDescriptionText, setUpdateDescriptionText] = useState('');
  const [updateDescriptionError, setUpdateDescriptionError] = useState(false);

  const [updateTripQuery, { loading }] = useMutation(UPDATE_TRIP, {
    onCompleted: () => {
      setEditingDescription(false);
      setUpdateDescriptionError(false);
      dispatch(updateTrip({ ...trip, description }));
      setUpdateDescriptionText(SUCCESSFUL_UPDATE_MESSAGE);
    },
    onError: error => {
      setUpdateDescriptionError(true);
      setUpdateDescriptionText(getFirstError(error));
    }
  });

  const handleDescriptionChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEditingDescription(true);
    setDescription(target.value);
  };

  const handleSubmitDescription = () => {
    setUpdateDescriptionError(false);
    setUpdateDescriptionText('');
    updateTripQuery({ variables: { input: { id: trip.id, description } } });
  };

  const handleCancelDescription = () => {
    if (description !== trip.description) {
      setDescription(trip.description);
    }
    setEditingDescription(false);
    setUpdateDescriptionError(false);
    setUpdateDescriptionText('');
  };

  return (
    <EditableTextField
      label='Description'
      value={description || ''}
      type='textarea'
      multiline
      rows={2}
      rowsMax={10}
      variant='filled'
      editing={editingDescription}
      onChange={handleDescriptionChange}
      onSubmitEdit={handleSubmitDescription}
      onCancelEdit={handleCancelDescription}
      helperText={loading ? UPDATING_MESSAGE : updateDescriptionText}
      error={updateDescriptionError}
      fullWidth
      margin='normal'
    />
  );
};

const TripStartDateSelect: React.FC<TripContentProps> = ({ dispatch, trip }) => {
  const [updateStartDateText, setUpdateStartDateText] = useState('');
  const [updateStartDateError, setUpdateStartDateError] = useState(false);

  const [updateTripQuery, { loading }] = useMutation(UPDATE_TRIP, {
    onCompleted: data => {
      setUpdateStartDateError(false);
      dispatch(updateTrip({ ...trip, start_date: data.updateTrip.start_date }));
      setUpdateStartDateText(SUCCESSFUL_UPDATE_MESSAGE);
    },
    onError: error => {
      setUpdateStartDateError(true);
      setUpdateStartDateText(getFirstError(error));
    }
  });

  const handleStartDateChange = (date: MaterialUiPickersDate) => {
    if (date) {
      updateTripQuery({
        variables: { input: { id: trip.id, start_date: date.toISOString() } }
      });
    }
  };

  return (
    <DateTimePicker
      label='Start Date'
      onChange={handleStartDateChange}
      helperText={loading ? UPDATING_MESSAGE : updateStartDateText}
      error={updateStartDateError}
      value={trip.start_date || null}
      margin='normal'
      fullWidth
    />
  );
};

const TripStatusSelect: React.FC<TripContentProps> = ({ dispatch, trip }) => {
  const [updateStatusText, setUpdateStatusText] = useState('');
  const [updateStatusError, setUpdateStatusError] = useState(false);

  const [updateTripQuery, { loading }] = useMutation(UPDATE_TRIP, {
    onCompleted: data => {
      setUpdateStatusError(false);
      dispatch(updateTrip({ ...trip, status: data.updateTrip.status }));
      setUpdateStatusText(SUCCESSFUL_UPDATE_MESSAGE);
    },
    onError: error => {
      setUpdateStatusError(true);
      setUpdateStatusText(getFirstError(error));
    }
  });

  const handleStatusChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    updateTripQuery({ variables: { input: { id: trip.id, status: target.value } } });
  };

  return (
    <TextField
      select
      label='Status'
      value={trip.status}
      onChange={handleStatusChange}
      helperText={loading ? UPDATING_MESSAGE : updateStatusText}
      error={updateStatusError}
      fullWidth
      margin='normal'
    >
      {tripStatus.map(option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

const TripContent: React.FC<TripContentProps> = ({ dispatch, trip }) => {
  return (
    <div>
      <h2>Trip Details</h2>
      <TripNameInput dispatch={dispatch} trip={trip} />
      <TripStartDateSelect dispatch={dispatch} trip={trip} />
      <TripDescriptionInput dispatch={dispatch} trip={trip} />
      <TripStatusSelect dispatch={dispatch} trip={trip} />
      <TripItineraries dispatch={dispatch} tripId={trip.id} />
    </div>
  );
};

export default TripContent;
