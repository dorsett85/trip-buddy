import TripModel from '../models/Trip';
import { TripServiceDeps } from './Trip.types';

export default class TripService {
  private TripModel: typeof TripModel;

  constructor(dependencies: TripServiceDeps = {}) {
    this.TripModel = dependencies.TripModel || TripModel;
  }
}
