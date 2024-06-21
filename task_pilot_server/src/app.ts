import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes';
import dotenv from 'dotenv';
import activemqMiddleware from './middlewares/activeMqMiddleware';
import activeMQService from './services/activeMqService';
import { logger } from './config/logger'

import loggerMiddleware from './middlewares/loggerMiddleware';
import setHeaders from './middlewares/setHeadersMiddleware';


dotenv.config();

const app = express();
app.disable('x-powered-by');

app.use(setHeaders);


app.use(bodyParser.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
app.use(loggerMiddleware);

app.use(activemqMiddleware);

app.use('/tasks', taskRoutes);

export default app;

activeMQService.activate();
