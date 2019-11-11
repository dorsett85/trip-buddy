import { AjaxApi } from '../AjaxApi';
import { FeatureCollectionResponse } from '../../types/apiResponses';

type FeatureCollectionCallback = (response: FeatureCollectionResponse) => any;

export class MapboxService extends AjaxApi {
  public static BASE_URL = 'https://api.mapbox.com';

  public static TOKEN = `access_token=${process.env.REACT_APP_MAPBOX_API_TOKEN}`;

  public static GEOCODING_URL = `${MapboxService.BASE_URL}/geocoding/v5/mapbox.places`;

  private static makeGeoCodeUrl(input: string): string {
    return `${this.GEOCODING_URL}/${input}.json?${this.TOKEN}`;
  }

  public static async getGeocodeFeatureCollection(input: string, callback: FeatureCollectionCallback) {
    const url = this.makeGeoCodeUrl(input);
    const featureCollection: FeatureCollectionResponse = await this.json(url);
    return callback(featureCollection);
  }
}
