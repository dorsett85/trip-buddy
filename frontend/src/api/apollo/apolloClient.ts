import { ApolloLink, split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

/**
 * Http link
 */
const httpLink = new HttpLink({
  uri: '/graphql'
});

/**
 * Perform actions before each http request
 */
const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token')
    }
  });
  return forward(operation);
});

/**
 * Web socket link
 */
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
  middlewareLink.concat(httpLink)
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
