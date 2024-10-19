import type { Config } from 'jest';

export default async (): Promise<Config> => {
  return {
    testEnvironment: 'node',
    roots: ['<rootDir>/test'],
    testMatch: ['**/*.test.ts'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    },
    watchPathIgnorePatterns: ['/__tapes__/'],
    setupFilesAfterEnv: ['<rootDir>/test/config/setup-tests.ts']
  };
};
