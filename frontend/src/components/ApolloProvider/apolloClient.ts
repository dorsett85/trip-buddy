// On each gql request we want to attach our jwt token
import { ApolloLink, Observable, Operation } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const request = async (operation: Operation) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token')
    }
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: ZenObservable.Subscription;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

export const client = new ApolloClient({
  link: ApolloLink.from([
    requestLink,
    new HttpLink({
      uri: '/graphql',
      credentials: 'include'
    })
  ]),
  cache: new InMemoryCache()
});
