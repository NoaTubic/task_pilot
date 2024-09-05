import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import activemqMiddleware from './middlewares/activeMqMiddleware';
import activeMQService from './services/activeMqService';
import { logger } from './config/logger';
import loggerMiddleware from './middlewares/loggerMiddleware';
import setHeaders from './middlewares/setHeadersMiddleware';
import authRoutes from './routes/authRoutes';
import errorHandler from './middlewares/errorHandlerMiddleware';
import { corsMiddleware } from './middlewares/corsMiddleware';

dotenv.config();

const app = express();
app.disable('x-powered-by');


app.use(corsMiddleware);

app.use(setHeaders);
app.use(bodyParser.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(activemqMiddleware);
app.use(loggerMiddleware);
app.use(errorHandler);
activeMQService.activate();

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

export default app;
