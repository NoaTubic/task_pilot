import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Task } from '../models/task';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [Task],
});

export default sequelize;
