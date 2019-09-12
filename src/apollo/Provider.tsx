import React, { ReactNode } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

interface Props {
  children: ReactNode
}

export const client = new ApolloClient();

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}


export default Provider;