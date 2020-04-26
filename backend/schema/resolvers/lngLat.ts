import { GraphQLScalarType } from 'graphql';
import { ValidationError } from 'apollo-server-express';

const validateLngLat = (value: any): boolean =>
  Array.isArray(value) &&
  value.length === 2 &&
  value.every((v: any) => typeof v === 'number');

export const lngLatResolvers = {
  LngLat: new GraphQLScalarType({
    name: 'LngLat',
    description: 'An array of length two with float types representing lng/lat points',
    serialize: (value: any) => (validateLngLat(value) ? value : null),
    parseValue: value => {
      if (validateLngLat(value)) {
        return value;
      }
      throw new ValidationError('Invalid LngLat type: must be [number, number]');
    }
  })
};
