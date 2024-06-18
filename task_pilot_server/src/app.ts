import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes';
import dotenv from 'dotenv';
import activemqMiddleware from './middlewares/activeMqMiddleware';
import activeMQService from './services/activeMqService';

dotenv.config();

const app = express();
app.use(activemqMiddleware);

app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

export default app;

activeMQService.activate();
