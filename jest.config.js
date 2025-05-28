module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: [
      '@testing-library/jest-native/extend-expect',
      './jest.setup.js'
    ],
    transformIgnorePatterns: [
      'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|styled-components)'
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testMatch: [
      '**/__tests__/**/*.(ts|tsx|js)',
      '**/*.(test|spec).(ts|tsx|js)'
    ],
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.d.ts',
    ],
    testEnvironment: 'jsdom',
  };