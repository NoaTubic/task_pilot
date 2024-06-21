import pino from 'pino';
import fs from 'fs';
import path from 'path';

const logsFolderPath = path.join(__dirname, '..', '..', 'logs');
if (!fs.existsSync(logsFolderPath)) {
  fs.mkdirSync(logsFolderPath);
}

const combinedLogFilePath = path.join(logsFolderPath, 'combined.log');
const errorLogFilePath = path.join(logsFolderPath, 'error.log');

const combinedLogStream = fs.createWriteStream(combinedLogFilePath, { flags: 'a' });
const errorLogStream = fs.createWriteStream(errorLogFilePath, { flags: 'a' });

const logger = pino({
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
}, pino.multistream([
  { stream: combinedLogStream },
  { level: 'error', stream: errorLogStream },
  { stream: process.stdout }
]));

const consoleLogger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

export { logger, consoleLogger };
