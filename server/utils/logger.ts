import * as winston from 'winston';

export const logger: winston.Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  level: 'info',
  transports: [
    new winston.transports.File({ filename: `./logs/${getYMDTime()}-error.log`, level: 'error' }),
    new winston.transports.File({ filename: './logs/all.log' }),
  ],
});

function getYMDTime() {
  return new Date().toLocaleDateString().replaceAll('/', '-')
}