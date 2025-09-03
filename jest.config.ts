import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: ['**/?(*.)+(test).ts'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    }
};

export default config;