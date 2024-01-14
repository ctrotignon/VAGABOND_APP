import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { type StackNavigation } from '../App';

const AuthMiddleware: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { navigate } = useNavigation<StackNavigation>();

	useEffect(() => {
		const checkToken = async () => {
			try {
				const token = await SecureStore.getItemAsync('token');
				if (!token) {
					console.log('Token not found, redirecting to the login page.');
					navigate('Home');
				} else {
					console.log('Token found.');
				}
			} catch (error) {
				console.error('Error checking token:', error);
			}
		};

		checkToken();
	}, []);

	return <>{children}</>;
};

export default AuthMiddleware;
