import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, errors, label } = format;

const LOG_LABEL = '[boiler-plate-server]';
const LOG_FOLDER_PATH = path.resolve('logs');

const writeLog = (errorMessage, level) => {
  const logFilePath = path.join(LOG_FOLDER_PATH, `${level}.log`);

  // Ensures the parent folder exists, creating it if necessary
  fs.mkdirSync(LOG_FOLDER_PATH, { recursive: true });

  // Create or append to the file, depending on whether it exists
  if (fs.existsSync(logFilePath)) {
    fs.appendFileSync(logFilePath, `${errorMessage}\n`);
  } else {
    fs.writeFileSync(logFilePath, `${errorMessage}\n`);
  }
};

const customFormat = printf(
  ({ level, message, timestamp: time, stack, label: logLabel, errorObj }) => {
    let errorMessage = `\n[${time}] ${logLabel} ${level.toUpperCase()}: `;

    errorMessage += `${message}`;
    if (errorObj) {
      errorMessage += `\n\t${stack}\n\n\t[Error Details]: ${errorObj}`;
    }
    writeLog(errorMessage, level);
    return errorMessage;
  },
);

const logger = createLogger({
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'DD-MM-YY HH:mm:ss' }),
    label({ label: LOG_LABEL }),
    customFormat,
  ),
  transports: [new transports.Console()],
});

export default logger;
