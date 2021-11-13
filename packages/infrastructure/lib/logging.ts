import * as apigw from '@aws-cdk/aws-apigateway';
import { XrayLogLevel } from './constructs/xray-function';

export enum LogLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
  OFF = 'OFF'
}

export function toApigwLogLevel(logLevel: LogLevel): apigw.MethodLoggingLevel {
  switch (logLevel) {
    case LogLevel.INFO:
      return apigw.MethodLoggingLevel.INFO;
    case LogLevel.ERROR:
      return apigw.MethodLoggingLevel.ERROR;
    case LogLevel.OFF:
      return apigw.MethodLoggingLevel.OFF;
  }
}

export function toXrayLogLevel(logLevel: LogLevel): XrayLogLevel {
  switch (logLevel) {
    case LogLevel.INFO:
      return XrayLogLevel.INFO;
    case LogLevel.ERROR:
      return XrayLogLevel.ERROR;
    case LogLevel.OFF:
      return XrayLogLevel.SILENT;
  }
}
