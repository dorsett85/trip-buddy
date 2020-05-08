import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { expressServer, env } from './config/config';
import { config } from './schema';

// Express app
const app = express();
app.use(express.json());
app.use(cookieParser());

// Http server
const httpServer = createServer(app);

// Apollo server
const server = new ApolloServer(config);
server.applyMiddleware({ app });

// Apollo server subscriptions are currently not consistently publishing to the
// client, but leaving in until a resolution is found
// https://github.com/apollographql/graphql-subscriptions/issues/187
server.installSubscriptionHandlers(httpServer);

// Serve static assets in production
if (env === 'production') {
  app.use('/', express.static(path.resolve(__dirname, '../frontend/build')));
  app.use('/', (_, res) => {
    return res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
}

httpServer.listen(expressServer.port, () =>
  console.log(`App listening on port ${expressServer.port}!`)
);
