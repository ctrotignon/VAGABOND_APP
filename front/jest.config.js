module.exports = {
	preset: 'jest-expo',
	setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
	transform: {
		'^.+\\.tsx?$': 'babel-jest',
	},
	moduleNameMapper: {
		'/\\.(png|jpg|jpeg|gif|svg)$/': '../front/mocks/fileMock.js',
	},
};
