/* eslint-disable camelcase */
import { LngLatArray } from './shared';

export interface Feature {
  id: string;
  type: string;
  place_name: string;
  place_type: string[];
  relevance: number;
  properties: {
    landmark: boolean;
    address: string;
    category: string;
  };
  text: string;
  center: LngLatArray;
  geometry: {
    coordinates: LngLatArray;
    type: string;
  };
  context: {
    id: string;
    short_code: string;
    wikidata?: string;
    text: string;
  }[];
}

export interface FeatureCollectionResponse {
  type: string;
  query: string[];
  features: Feature[];
  attribution: string;
}
