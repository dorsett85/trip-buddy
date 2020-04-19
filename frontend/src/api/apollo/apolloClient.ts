import { ApolloLink, split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';

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

const cache = new InMemoryCache();

type ApolloSubscriptionClient<TLoggedIn extends boolean> = TLoggedIn extends true ? SubscriptionClient : undefined;

/**
 * Function to create our apollo client. After login we want to add subscriptions
 * with websocket, so we'll need to recreate the entire client depending on the
 * user being logged in or logged out.
 */
export const generateApolloClient = <TLoggedIn extends boolean>(
  loggedIn: TLoggedIn
): [ApolloClient<NormalizedCacheObject>, ApolloSubscriptionClient<TLoggedIn>] => {
  let link = middlewareLink.concat(httpLink);

  // Only apply our subscription client when the user is logged in
  let subscriptionClient: SubscriptionClient | undefined;
  if (loggedIn) {
    subscriptionClient = new SubscriptionClient('ws://localhost:4001/graphql/ws', {
      reconnect: true,
      connectionParams: () => ({ authorization: localStorage.getItem('token') })
    });
    
    const wsLink = new WebSocketLink(subscriptionClient);

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      link
    );
  }
  
  const apolloClient = new ApolloClient({ link, cache });

  return [apolloClient, subscriptionClient as ApolloSubscriptionClient<TLoggedIn>];
};
