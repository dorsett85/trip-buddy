
import { GraphQLSchema } from 'graphql';
import { RootQuery as query } from './queries';
import { RootMutation as mutation } from './mutations';

const schema = new GraphQLSchema({
  query,
  mutation
})

export default schema;