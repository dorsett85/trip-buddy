import TripModel from "../models/Trip";

export interface TripServiceDeps {
  TripModel?: typeof TripModel;
}