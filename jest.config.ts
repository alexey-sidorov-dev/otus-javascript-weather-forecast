import type { Config } from "jest";

const config: Config = {
  // All imported modules in your tests should be mocked automatically
  automock: false,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: [
  //   "./src/**/*.{js,ts,jsx,tsx}",
  //   "!./**/index.{js,ts}",
  //   "!./**/helpers/**",
  //   "!./**/interfaces/**",
  //   "!./**/types/**",
  //   "!./**/*.d.ts",
  // ],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ["html", "text", "json"],

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },

  // A path to a module which exports an async function that is triggered once before all test suites
  globalSetup: "./test/config/env.setup.ts",

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // Automatically reset mock state between every test
  // resetMocks: false,

  // Automatically restore mock state between every test
  // restoreMocks: false,

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ["./test/config/fetchMock.setup.ts"],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],
};

export default config;
