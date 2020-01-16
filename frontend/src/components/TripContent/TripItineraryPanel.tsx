import React, { memo, useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import LightBlue from '@material-ui/core/colors/lightBlue';
import styled from 'styled-components';
import { DateTimePicker } from '@material-ui/pickers';
import { DispatchProp } from 'react-redux';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { TripItinerary } from '../../types/trip';
import {
  UPDATING_MESSAGE,
  SUCCESSFUL_UPDATE_MESSAGE
} from '../../utils/constants/messages';
import { getFirstError } from '../../utils/apolloErrors';
import { updateTripItinerary } from '../../store/trip/actions';
import EditableTextField from '../generic/EditableTextField/EditableTextField';
import { AppAction } from '../../store/types';

export const UPDATE_ITINERARY = gql`
  mutation UpdateTripItinerary($input: UpdateTripItineraryInput) {
    updateTripItinerary(input: $input) {
      name
      description
      location
      start_time
      end_time
    }
  }
`;

interface TripItineraryPanelProps extends DispatchProp<AppAction> {
  /**
   * Itinerary of the active trip
   */
  itinerary: TripItinerary;
  /**
   * Index of the trip itinerary, used for easy updating
   * of the active trip itinerary
   */
  index: number;
}

interface IntineraryNameInputProps extends TripItineraryPanelProps {
  /**
   * Event handler for when the input is submitted or cancelled
   */
  onSubmitOrCancel: () => void;
}

const BEM_ITINERARY_PANEL = 'itineraryPanel';
const BEM_ITINERARY_PANEL_SUMMARY = `${BEM_ITINERARY_PANEL}-summary`;
const BEM_ITINERARY_PANEL_CONTENT = `${BEM_ITINERARY_PANEL}-content`;

const ExpansionPanelStyled = styled(ExpansionPanel)`
  & .${BEM_ITINERARY_PANEL_SUMMARY}, & .${BEM_ITINERARY_PANEL_CONTENT} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  & .${BEM_ITINERARY_PANEL_SUMMARY} {
    background-color: ${LightBlue[400]};
    span {
      color: white;
      font-size: 1rem;
      font-weight: bold;
    }
  }
  & .${BEM_ITINERARY_PANEL_CONTENT} {
    padding-bottom: 1rem;
  }
`;

const ItineraryContent = styled.div`
  width: 100%;
`;

const ItineraryNameInput: React.FC<IntineraryNameInputProps> = ({
  dispatch,
  itinerary,
  index,
  onSubmitOrCancel
}) => {
  const [name, setName] = useState(itinerary.name);
  const [updateNameText, setUpdateNameText] = useState('');
  const [updateNameError, setUpdateNameError] = useState(false);

  const [updateTripItineraryQuery, { loading }] = useMutation(UPDATE_ITINERARY, {
    onCompleted: data => {
      onSubmitOrCancel();
      dispatch(updateTripItinerary({ ...data.updateTripItinerary, index }));
    },
    onError: error => {
      setUpdateNameError(true);
      setUpdateNameText(getFirstError(error));
    }
  });

  const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
  };

  const handleSubmitName = () => {
    if (name.length >= 4) {
      onSubmitOrCancel();
      updateTripItineraryQuery({ variables: { input: { id: itinerary.id, name } } });
    } else {
      setUpdateNameError(true);
      setUpdateNameText('Trip name must be at least 4 characters');
    }
  };

  const handleCancelName = () => {
    if (name !== itinerary.name) {
      setName(itinerary.name);
    }
    onSubmitOrCancel();
  };

  return (
    <EditableTextField
      label='Name'
      value={name}
      editing
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

const ItineraryStartDateSelect: React.FC<TripItineraryPanelProps> = ({
  dispatch,
  itinerary,
  index
}) => {
  const [updateStartDateText, setUpdateStartDateText] = useState('');
  const [updateStartDateError, setUpdateStartDateError] = useState(false);

  const [updateTripItineraryQuery, { loading }] = useMutation(UPDATE_ITINERARY, {
    onCompleted: data => {
      setUpdateStartDateError(false);
      dispatch(
        updateTripItinerary({
          ...data.updateTripItinerary,
          index
        })
      );
      setUpdateStartDateText(SUCCESSFUL_UPDATE_MESSAGE);
    },
    onError: error => {
      setUpdateStartDateError(true);
      setUpdateStartDateText(getFirstError(error));
    }
  });

  const handleStartDateChange = (date: MaterialUiPickersDate) => {
    if (date) {
      updateTripItineraryQuery({
        variables: { input: { id: itinerary.id, start_time: date.toISOString() } }
      });
    }
  };

  return (
    <DateTimePicker
      label='Start Time'
      onChange={handleStartDateChange}
      helperText={loading ? UPDATING_MESSAGE : updateStartDateText}
      error={updateStartDateError}
      value={itinerary.start_time || null}
      margin='normal'
      fullWidth
    />
  );
};

const ItineraryDescriptionInput: React.FC<TripItineraryPanelProps> = ({
  dispatch,
  itinerary,
  index
}) => {
  const [description, setDescription] = useState(itinerary.description);
  const [editingDescription, setEditingDescription] = useState(false);
  const [updateDescriptionText, setUpdateDescriptionText] = useState('');
  const [updateDescriptionError, setUpdateDescriptionError] = useState(false);

  const [updateTripQuery, { loading }] = useMutation(UPDATE_ITINERARY, {
    onCompleted: data => {
      setEditingDescription(false);
      setUpdateDescriptionError(false);
      dispatch(updateTripItinerary({ ...data.updateTripItinerary, index }));
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
    updateTripQuery({ variables: { input: { id: itinerary.id, description } } });
  };

  const handleCancelDescription = () => {
    if (description !== itinerary.description) {
      setDescription(itinerary.description);
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

const TripItineraryPanel: React.FC<TripItineraryPanelProps> = ({
  dispatch,
  itinerary,
  index
}) => {
  const [expanded, setExpanded] = useState(true);
  const [editingName, setEditingName] = useState(false);

  const handleExpandClick = () => {
    setExpanded(state => !state);
  };

  const handleEditNameOnChange = () => {
    setEditingName(!editingName);
  };

  const itineraryContent = (
    <ItineraryContent>
      <ButtonGroup size='small' color='primary' fullWidth>
        <Button onClick={handleEditNameOnChange} variant='text'>
          Edit Name
        </Button>
        <Button color='secondary' variant='text'>
          Remove Itinerary
        </Button>
      </ButtonGroup>
      {editingName && (
        <ItineraryNameInput
          dispatch={dispatch}
          itinerary={itinerary}
          index={index}
          onSubmitOrCancel={handleEditNameOnChange}
        />
      )}
      <ItineraryStartDateSelect dispatch={dispatch} itinerary={itinerary} index={index} />
      <ItineraryDescriptionInput
        dispatch={dispatch}
        itinerary={itinerary}
        index={index}
      />
    </ItineraryContent>
  );

  return (
    <ExpansionPanelStyled expanded={expanded} onChange={handleExpandClick}>
      <ExpansionPanelSummary
        className='itineraryPanel-summary'
        expandIcon={<ExpandMoreIcon />}
      >
        <span>
          {index + 1}
          .&nbsp;
          {itinerary.name}
        </span>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className='itineraryPanel-content'>
        {itineraryContent}
      </ExpansionPanelDetails>
    </ExpansionPanelStyled>
  );
};

export default memo(TripItineraryPanel);
