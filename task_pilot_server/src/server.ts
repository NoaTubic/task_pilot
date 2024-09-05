import http from 'http';
import https from 'https';
import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
import app from './app';
import sequelize from './config/database';

dotenv.config();

const HTTPS_PORT = process.env.HTTPS_PORT || 443;
const HTTP_PORT = process.env.HTTP_PORT || 80;

const privateKeyPath = process.env.SSL_PRIVATE_KEY_PATH;
const certificatePath = process.env.SSL_CERTIFICATE_PATH;

if (!privateKeyPath || !certificatePath) {
  throw new Error('SSL_PRIVATE_KEY_PATH and SSL_CERTIFICATE_PATH must be defined in the environment variables');
}

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');

const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

const httpApp = express();
httpApp.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});
const httpServer = http.createServer(httpApp);

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Database connected and synchronized');

    httpsServer.listen(HTTPS_PORT, () => {
      console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
    });

    httpServer.listen(HTTP_PORT, () => {
      console.log(`HTTP Server is running on port ${HTTP_PORT} and redirecting to HTTPS`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
