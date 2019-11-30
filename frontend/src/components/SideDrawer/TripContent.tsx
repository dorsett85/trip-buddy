import React from 'react';
import { DispatchProp } from 'react-redux';
import { Trip, TripLeg } from '../../types/trip';

export interface TripContentProps extends DispatchProp {
  trip?: Trip;
}

const TripContent: React.FC<TripContentProps> = ({ dispatch, trip }) => {
  return trip ? (
    <div>
      <h2>Trip Details</h2>
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
  ) : null;
};

export default TripContent;
