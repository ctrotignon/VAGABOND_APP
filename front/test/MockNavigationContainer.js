// // MockNavigationContainer.ts

// import React from 'react';
// import { View } from 'react-native';

// type MockNavigationContainerProps = {
// 	children?: React.ReactNode;
// };

// const MockNavigationContainer: React.FC<MockNavigationContainerProps> = ({ children }) => {
// 	return <>{children}</>;
// };

// export default MockNavigationContainer;
import React from 'react';
import { View } from 'react-native';

const MockNavigationContainer = ({ children }) => {
	return <>{children}</>;
};

export default MockNavigationContainer;
