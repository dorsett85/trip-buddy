import TripModel from '../models/Trip';
import { TripServiceDeps } from './Trip.types';
import { TripRecord } from '../models/Trip.types';

export default class TripService {
  private TripModel: typeof TripModel;

  constructor(dependencies: TripServiceDeps = {}) {
    this.TripModel = dependencies.TripModel || TripModel;
  }

  public async getByUserId(userId: number): Promise<TripRecord[]> {
    return this.TripModel.findByUserId(userId);
  }
}
