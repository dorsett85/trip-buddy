import { GraphQLObjectType, GraphQLID } from 'graphql';
import { UserType } from './types';
import db from '../db/db';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM users WHERE id = $1`;
        const values = [args.id];
        
        return db
          .query(query, values)
          .then(res => res.rows[0])
          .catch(err => err);
      }
    }
  }
});
