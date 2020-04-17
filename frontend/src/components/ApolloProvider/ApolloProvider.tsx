import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './apolloClient';

const Provider: React.FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default Provider;
