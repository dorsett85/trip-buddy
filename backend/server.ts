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
server.installSubscriptionHandlers(httpServer);

// Serve static assets in production
if (env === 'production') {
  app.use('/', express.static(path.resolve(__dirname, '../frontend/build')));
  app.use('/', (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
}

httpServer.listen(expressServer.port, () =>
  console.log(`App listening on port ${expressServer.port}!`)
);
