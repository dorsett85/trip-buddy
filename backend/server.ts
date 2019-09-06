import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { expressServer } from './config/config';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api', (req: any, res: any) => {
  console.log(req);
  return res.json('success');
});

// Serve static assets if not on the webpack dev server
app.use('/', express.static(path.resolve(__dirname, '../build')));
app.use('/', (req: any, res: any) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.listen(expressServer.port, () =>
  console.log(`App listening on port ${expressServer.port}!`)
);
