export enum LogLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
  OFF = 'OFF'
}

export const DEFAULT_LOG_LEVEL = LogLevel.ERROR;

export function logLevel(): LogLevel {
  const LOG_LEVEL = process.env.LOG_LEVEL;

  switch (LOG_LEVEL) {
    case LogLevel.INFO:
      return LogLevel.INFO;
    case LogLevel.ERROR:
      return LogLevel.ERROR;
    case LogLevel.OFF:
      return LogLevel.OFF;
    default:
      return DEFAULT_LOG_LEVEL;
  }
}

export function info(message?: any, ...optionalParams: any[]) {
  if (logLevel() === LogLevel.INFO) {
    console.info(message, ...optionalParams);
  }
}

export function error(message?: any, ...optionalParams: any[]) {
  if ([LogLevel.ERROR, LogLevel.INFO].includes(logLevel())) {
    console.error(message, ...optionalParams);
  }
}
