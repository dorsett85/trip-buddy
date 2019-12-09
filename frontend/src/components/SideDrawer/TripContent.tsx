import React, { useState, useEffect } from 'react';
import { DispatchProp } from 'react-redux';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Trip, tripStatus, TripItinerary } from '../../types/trip';
import EditableTextField from '../generic/EditableTextField/EditableTextField';
import {
  UPDATING_MESSAGE,
  SUCCESSFUL_UPDATE_MESSAGE
} from '../../utils/constants/messages';
import { updateTrip } from '../../store/trip/actions';
import { getFirstError } from '../../utils/apolloErrors';
import TripItineraryPanel from '../TripItineraryPanel/TripItineraryPanel';

export const UPDATE_TRIP = gql`
  mutation UpdateTrip($input: UpdateTripInput) {
    updateTrip(input: $input) {
      name
      status
    }
  }
`;

export const GET_ITINERARY = gql`
  query GetItinerary($input: FindTripInput) {
    trip(input: $input) {
      itineraries {
        id
        name
        description
        location
        start_time
        end_time
      }
    }
  }
`;

export interface TripContentProps extends DispatchProp {
  trip: Trip;
}

const TripNameInput: React.FC<TripContentProps> = ({ dispatch, trip }) => {
  const [tripName, setTripName] = useState(trip.name);
  const [editingTripName, setEditingTripName] = useState(false);
  const [updateTripNameText, setUpdateTripNameText] = useState('');
  const [updateTripNameError, setUpdateTripNameError] = useState(false);

  const [updateTripQuery, { loading }] = useMutation(UPDATE_TRIP, {
    onCompleted: () => {
      setEditingTripName(false);
      setUpdateTripNameError(false);
      dispatch(updateTrip({ ...trip, name: tripName }));
      setUpdateTripNameText(SUCCESSFUL_UPDATE_MESSAGE);
    },
    onError: error => {
      setUpdateTripNameError(true);
      setUpdateTripNameText(getFirstError(error));
    }
  });

  const handleTripNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTripName(true);
    if (target.value.length >= 4) {
      setTripName(target.value);
    }
  };

  const handleSubmitTripName = () => {
    setUpdateTripNameError(false);
    setUpdateTripNameText('');
    updateTripQuery({ variables: { input: { id: trip.id, name: tripName } } });
  };

  const handleCancelTripName = () => {
    if (tripName !== trip.name) {
      setTripName(trip.name);
    }
    setEditingTripName(false);
    setUpdateTripNameError(false);
    setUpdateTripNameText('');
  };

  return (
    <EditableTextField
      label='Name'
      value={tripName}
      editing={editingTripName}
      onChange={handleTripNameChange}
      onSubmitEdit={handleSubmitTripName}
      onCancelEdit={handleCancelTripName}
      helperText={loading ? UPDATING_MESSAGE : updateTripNameText}
      error={updateTripNameError}
      fullWidth
      margin='normal'
    />
  );
};

const TripStatusSelect: React.FC<TripContentProps> = ({ dispatch, trip }) => {
  const [updateTripStatusText, setUpdateTripStatusText] = useState('');
  const [updateTripStatusError, setUpdateTripStatusError] = useState(false);

  const [updateTripQuery, { loading }] = useMutation(UPDATE_TRIP, {
    onCompleted: data => {
      setUpdateTripStatusError(false);
      dispatch(updateTrip({ ...trip, status: data.updateTrip.status }));
      setUpdateTripStatusText(SUCCESSFUL_UPDATE_MESSAGE);
    },
    onError: error => {
      setUpdateTripStatusError(true);
      setUpdateTripStatusText(getFirstError(error));
    }
  });

  const handleTripStatusChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    updateTripQuery({ variables: { input: { id: trip.id, status: target.value } } });
  };

  return (
    <TextField
      select
      label='Status'
      value={trip.status}
      onChange={handleTripStatusChange}
      helperText={loading ? UPDATING_MESSAGE : updateTripStatusText}
      error={updateTripStatusError}
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
  const [itineraries, setItineraries] = useState<TripItinerary[]>([]);
  const { data, loading } = useQuery(GET_ITINERARY, {
    variables: { input: { id: trip.id } }
  });

  useEffect(() => {
    if (data) {
      setItineraries(data.trip.itineraries);
    }
  }, [data]);

  const tripItinerary = loading ? (
    <LinearProgress />
  ) : (
    itineraries.map(itinerary => (
      <TripItineraryPanel key={itinerary.id} itinerary={itinerary} />
    ))
  );

  return (
    <div>
      <h2>Trip Details</h2>
      <TripNameInput dispatch={dispatch} trip={trip} />
      <TripStatusSelect dispatch={dispatch} trip={trip} />
      {tripItinerary}
    </div>
  );
};

export default TripContent;
