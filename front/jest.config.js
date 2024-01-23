// module.exports = {
// 	preset: 'jest-expo',
// 	setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
// 	transform: {
// 		'^.+\\.tsx?$': 'babel-jest',
// 	},
// 	moduleNameMapper: {
// 		'/\\.(png|jpg|jpeg|gif|svg)$/': '../front/mocks/fileMock.js',
// 	},
// };

module.exports = {
	preset: 'jest-expo',
	setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
	transform: {
		'^.+\\.tsx?$': 'babel-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	moduleNameMapper: {
		'/\\.(png|jpg|jpeg|gif|svg)$/': '../front/mocks/fileMock.js',
	},
};
