import React from 'react';
import { Dispatch } from 'redux';
import { Trip, TripLeg } from '../../types/trip';

export interface TripContentProps {
  dispatch: Dispatch;
  trip: Trip;
}

const TripContent: React.FC<TripContentProps> = ({ dispatch, trip }) => {
  return (
    <div>
      {trip.legs.map(leg => (
        <div key={leg.id}>
          <p>{leg.name}</p>
          {Object.keys(leg).map(key => (
            <div key={key}>
              <span>
                <b>{key}</b>: {leg[key as keyof TripLeg]}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TripContent;
