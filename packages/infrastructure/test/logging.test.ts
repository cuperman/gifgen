import { LogLevel, toApigwLogLevel, toXrayLogLevel } from '../lib/logging';

describe('logging', () => {
  describe('toApigwLogLevel', () => {
    it('converts LogLevel to API Gateway log level', () => {
      expect(toApigwLogLevel(LogLevel.INFO)).toEqual('INFO');
      expect(toApigwLogLevel(LogLevel.ERROR)).toEqual('ERROR');
      expect(toApigwLogLevel(LogLevel.OFF)).toEqual('OFF');
    });
  });

  describe('toXrayLogLevel', () => {
    it('converts LogLevel to X-Ray log level', () => {
      expect(toXrayLogLevel(LogLevel.INFO)).toEqual('info');
      expect(toXrayLogLevel(LogLevel.ERROR)).toEqual('error');
      expect(toXrayLogLevel(LogLevel.OFF)).toEqual('silent');
    });
  });
});
