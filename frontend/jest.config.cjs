module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
    '^.+\\.js$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(primevue|@primevue|@primeuix)/)'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node', 'mjs'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
}
