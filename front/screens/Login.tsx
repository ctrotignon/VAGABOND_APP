import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import TitleApp from '../components/TitleApp';
import Button from '../components/CustomButton';
import IconButton from '../components/IconButton';
import { RootStackParamList } from '../App';

type LoginProps = {
	setUserConnected: React.Dispatch<React.SetStateAction<boolean>>;
};

const image = {
	uri: 'https://images.unsplash.com/photo-1528150177508-7cc0c36cda5c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

export const validatePassword = (password: string): boolean => {
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	return passwordRegex.test(password);
};

const Login: React.FC<LoginProps> = ({ setUserConnected }) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		checkTokenAndNavigate();
	}, []);

	const setCookie = async (key: string, data: string) => {
		await SecureStore.setItemAsync(key, data);
	};

	const checkTokenAndNavigate = async () => {
		const token = await SecureStore.getItemAsync('token');
		if (token) {
			setUserConnected(true);
			navigation.navigate('HomeConnected');
		}
	};

	// const validateEmail = (email: string): boolean => {
	// 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	// 	return emailRegex.test(email);
	// };

	const handleLogin = async () => {
		try {
			if (!validatePassword(password)) {
				Alert.alert('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.');
				return;
			}

			const response = await fetch(`${process.env.ADRESS}/user/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});
			const data = await response.json();

			if (response.ok) {
				await setCookie('token', data?.token);
				console.log(SecureStore.getItemAsync('token'));

				setUserConnected(true);
				navigation.navigate('HomeConnected');
			} else {
				Alert.alert('Identifiants incorrects login');
			}
		} catch (error) {
			console.error('Erreur lors de la requête:', error);
			// Gestion des erreurs
		}
	};

	return (
		<View style={styles.container}>
			<ImageBackground source={{ uri: 'https://bucketvagabondaws.s3.eu-west-3.amazonaws.com/login1.jpg' }} resizeMode="cover" style={styles.image} onError={(error) => console.error('Image load error:', error.nativeEvent.error)}>
				<TitleApp />
				<View style={styles.containerForm}>
					<TextInput style={styles.input} autoCapitalize="none" placeholder="Pseudo" placeholderTextColor="white" value={username} onChangeText={(text) => setUsername(text)} />
					<View style={styles.inputPasswordContainer}>
						<TextInput style={styles.inputPassword} autoCapitalize="none" placeholder="Mot de passe" placeholderTextColor="white" secureTextEntry={!showPassword} value={password} onChangeText={(text) => setPassword(text)} />
						<IconButton source={showPassword ? require('../assets/icons/show.png') : require('../assets/icons/hide.png')} onPress={() => setShowPassword(!showPassword)} tintColor="white" />
					</View>
					<Button text="Se connecter" width="80%" height={60} backgroundColor="#0084b4" color="white" fontSize={25} onPress={handleLogin} />
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	containerForm: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	input: {
		width: '70%',
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		marginBottom: 30,
		borderRadius: 10,
		backgroundColor: 'rgba(0,0,0,0.4)',
		color: 'white',
		fontSize: 20,
	},
	inputPasswordContainer: {
		width: '70%',
		height: 60,
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 15,
		marginBottom: 30,
		borderRadius: 10,
		backgroundColor: 'rgba(0,0,0,0.4)',

		flexDirection: 'row',
	},
	inputPassword: {
		color: 'white',
		fontSize: 20,
		width: '80%',
	},
	image: {
		flex: 1,
		height: '100%',
		width: '100%',
	},
});

export default Login;
