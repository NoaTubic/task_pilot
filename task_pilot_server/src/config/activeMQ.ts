import dotenv from 'dotenv';

dotenv.config();

export const activemqConfig = {
  host: process.env.ACTIVEMQ_HOST || 'localhost',
  port: parseInt(process.env.ACTIVEMQ_PORT ?? '61614', 10),
  username: process.env.ACTIVEMQ_USERNAME || 'admin',
  password: process.env.ACTIVEMQ_PASSWORD || 'admin',
};


//http://localhost:8161/admin
