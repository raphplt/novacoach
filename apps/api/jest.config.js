module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    transform: {
      '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
    },
    coverageDirectory: 'coverage',
    setupFilesAfterEnv: ["<rootDir>/src/__tests__/test-setup.ts"],
  };