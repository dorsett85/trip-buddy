/* eslint-disable camelcase */
import { LngLatArray } from 'common/lib/types/utils';

export interface FeatureContext {
  id: string;
  short_code: string;
  wikidata?: string;
  text: string;
}

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
  context: FeatureContext[];
}

export interface FeatureCollection {
  type: string;
  query: string[];
  features: Feature[];
  attribution: string;
}
