import * as logger from '../src/logger';

describe('logger', () => {
  const OLD_ENV = process.env;
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterEach(() => {
    process.env = OLD_ENV; // Restore old environment
    errorSpy.mockClear();
    infoSpy.mockClear();
  });

  describe('with default settings', () => {
    describe('logLevel', () => {
      it('is ERROR', () => {
        expect(logger.logLevel()).toEqual(logger.LogLevel.ERROR);
      });
    });

    describe('error', () => {
      it('logs to standard error', () => {
        logger.error('Something went wrong :(');
        expect(errorSpy).toHaveBeenCalled();
      });
    });

    describe('info', () => {
      it('is suppressed', () => {
        logger.info('Hello, World!');
        expect(infoSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('log level OFF', () => {
    describe('logLevel', () => {
      it('is OFF', () => {
        process.env.LOG_LEVEL = 'OFF';
        expect(logger.logLevel()).toEqual(logger.LogLevel.OFF);
      });
    });

    describe('error', () => {
      it('is suppressed', () => {
        process.env.LOG_LEVEL = 'OFF';
        logger.error('Something went wrong :(');
        expect(errorSpy).not.toHaveBeenCalled();
      });
    });

    describe('info', () => {
      it('is suppressed', () => {
        process.env.LOG_LEVEL = 'OFF';
        logger.info('Hello, World!');
        expect(infoSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('log level INFO', () => {
    describe('logLevel', () => {
      it('is INFO', () => {
        process.env.LOG_LEVEL = 'INFO';
        expect(logger.logLevel()).toEqual(logger.LogLevel.INFO);
      });
    });

    describe('error', () => {
      it('logs to standard error', () => {
        process.env.LOG_LEVEL = 'INFO';
        logger.error('Something went wrong :(');
        expect(errorSpy).toHaveBeenCalled();
      });
    });

    describe('info', () => {
      it('logs to standard out', () => {
        process.env.LOG_LEVEL = 'INFO';
        logger.info('Hello, World!');
        expect(infoSpy).toHaveBeenCalled();
      });
    });
  });
});
