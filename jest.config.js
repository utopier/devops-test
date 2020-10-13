/* eslint-disable */
module.exports = {
	// globals: {
	// 	'ts-jest': {
	// 		tsConfig: 'tsconfig.json',
	// 		diagnostics: true,
	// 	},
	// },
	// moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json'],
	// transform: {
	// 	'^.+\\.(ts|tsx)?$': 'ts-jest',
	// },
	// testEnvironment: 'node',
	// preset: 'ts-jest',
	transformIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
	setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};
