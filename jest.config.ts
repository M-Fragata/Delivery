

import type { Config } from 'jest';

const config: Config = {

  bail: true,

  clearMocks: true,

  coverageProvider: "v8",

  preset: "ts-jest/presets/default-esm",
  extensionsToTreatAsEsm: [".ts"],

  testEnvironment: "node",

  testMatch: [
    "<rootDir>/src/**/*test.ts"
  ],

  moduleNameMapper: {
    // Isso remove o .js de QUALQUER import que termine assim
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // Caso o erro persista em arquivos de subpastas, use esta:
    '^(.+)\\.js$': '$1',
  },

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },

};

export default config;
