import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest preset to handle TypeScript files
  testEnvironment: 'node', // Use Node environment for testing
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'], // Ensure Jest knows about TypeScript extensions
};

export default config;
