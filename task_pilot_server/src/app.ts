import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

export default app;
