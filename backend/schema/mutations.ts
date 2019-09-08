import { GraphQLObjectType, GraphQLString } from 'graphql';
import db from '../db/db';
import { UserType } from './types';

export const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const { username, password, email } = args; 
        const query = `INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *`;
        const values = [username, password, email];

        return db
          .query(query, values)
          .then(res => res.rows[0])
          .catch(err => err);
      }
    }
  }
});
