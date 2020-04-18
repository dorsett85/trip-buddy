import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
  uri: '/graphql',
  credentials: 'include',
  headers: {
    authorization: localStorage.getItem('token')
  }
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4001/graphql/ws`,
  options: {
    reconnect: true,
    connectionParams: {
      authorization: localStorage.getItem('token')
    }
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
