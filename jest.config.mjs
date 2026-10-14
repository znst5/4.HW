export default {
  roots: ['<rootDir>/src', '<rootDir>/e2e'],

  transformIgnorePatterns: [
    "/node_modules/(?!puppeteer)"
  ],

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },

  projects: [
    {
      displayName: 'unit',
      testEnvironment: 'jest-environment-jsdom',
      testMatch: ['<rootDir>/src/**/*.test.js'],
      transform: {
        '^.+\\.jsx?$': 'babel-jest',
      },
    },
    {
      displayName: 'e2e',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/e2e/**/*.test.js'],
      transform: {
        '^.+\\.jsx?$': 'babel-jest',
      },
    }
  ]
};
