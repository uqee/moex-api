module.exports = {
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/$1',
  },
  preset: 'ts-jest',
  rootDir: 'src',
  testEnvironment: 'node',
}
