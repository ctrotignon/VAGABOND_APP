import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, PixelRatio, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import TitleApp from '../components/TitleApp';
import Button from '../components/CustomButton';
import IconButton from '../components/IconButton';
import { type StackNavigation } from '../App';

type RegisterProps = {
	navigation: StackNavigation;
	setUserConnected: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormState = {
	username: string;
	email: string;
	password: string;
	confirmedPassword: string;
};

const Register: React.FC<RegisterProps> = ({ navigation, setUserConnected }) => {
	const fontScale = PixelRatio.getFontScale();
	const getFontSize = (size: any) => size / fontScale;
	const [formState, setFormState] = useState<FormState>({
		username: '',
		email: '',
		password: '',
		confirmedPassword: '',
	});
	const [showPasswordMessage, setShowPasswordMessage] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [passwordValid, setPasswordValid] = useState<boolean>(true);

	const handleInputChange = (name: keyof FormState, value: string) => {
		setFormState({ ...formState, [name]: value });
	};

	const checkPassword = (text: string) => {
		const isValid = validatePassword(text);
		setPasswordValid(isValid);
		setShowPasswordMessage(!isValid);
	};

	const setCookie = async (key: string, data: string) => {
		const cookie = await SecureStore.setItemAsync(key, data);
		return cookie;
	};

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePassword = (password: string): boolean => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return passwordRegex.test(password);
	};

	const handleSubmit = async () => {
		const { username, email, password, confirmedPassword } = formState;

		if (!validateEmail(email)) {
			Alert.alert("Format d'email invalide");
			return;
		}

		if (!validatePassword(password)) {
			Alert.alert("Chouette ! Ton mot de passe devrait être une petite aventure en soi ! Assure-toi qu'il comporte au moins 8 caractères, incluant une majuscule, une minuscule, un chiffre, et même un petit caractère spécial pour le pimenter !");
			setPasswordValid(false);
			return;
		}

		if (password !== confirmedPassword) {
			alert('Les mots de passe ne correspondent pas');
			return;
		}

		try {
			const response = await fetch(`${process.env.ADRESS}/user/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, username, password }),
			});
			const data = await response.json();

			if (response.ok) {
				setCookie('token', data?.token);

				setFormState({
					username: '',
					email: '',
					password: '',
					confirmedPassword: '',
				});
				console.log('Formulaire soumis avec succès');
			} else {
				console.log("Erreur lors de l'envoi des données au serveur");
			}

			const cookie = await SecureStore.getItemAsync('token');

			if (cookie) {
				setUserConnected(true);
				navigation.navigate('HomeConnected');
			}
		} catch (error: any) {
			console.error('Erreur:', error.message);
		}
	};
	const handlePasswordBlur = () => {
		setShowPasswordMessage(false);
	};

	return (
		<View style={styles.container}>
			<ImageBackground source={require('../assets/images/avion.jpg')} resizeMode="cover" style={styles.image}></ImageBackground>
			<TitleApp />
			<View style={styles.containerTitle}>
				<Text style={[{ fontSize: getFontSize(30) }, styles.title]}>Bienvenue !</Text>
				<Text style={[{ fontSize: getFontSize(25) }, styles.title]}>Inscris-toi, voyage, découvre.</Text>
			</View>
			<View style={styles.containerForm}>
				<TextInput style={[styles.input, { marginTop: 10 }]} autoCapitalize="none" placeholder="E-mail" placeholderTextColor="white" onChangeText={(text) => handleInputChange('email', text)} keyboardType="email-address" />
				<TextInput style={styles.input} autoCapitalize="none" placeholder="Nom d'utilisateur" placeholderTextColor="white" onChangeText={(text) => handleInputChange('username', text)} />
				<View style={styles.inputPasswordContainer}>
					<TextInput
						style={styles.inputPassword}
						autoCapitalize="none"
						placeholder="Mot de passe"
						placeholderTextColor="white"
						onChangeText={(text) => {
							handleInputChange('password', text);
							checkPassword(text);
						}}
						secureTextEntry={!showPassword}
						onFocus={() => {
							setPasswordValid(true);
							setShowPasswordMessage(false);
						}}
						onBlur={handlePasswordBlur}
					/>
					<IconButton source={showPassword ? require('../assets/icons/show.png') : require('../assets/icons/hide.png')} onPress={() => setShowPassword(!showPassword)} tintColor="white" />
				</View>
				<View style={styles.messageContainer}>{showPasswordMessage && <Text style={styles.passwordBubbleText}>8 caractères minimum, une majuscule, une minuscule, un chiffre, et un caractère spécial</Text>}</View>
				<View style={[styles.inputPasswordContainer, { marginBottom: 30 }]}>
					<TextInput
						style={styles.inputPassword}
						autoCapitalize="none"
						placeholder="Confirmer Mot de passe"
						placeholderTextColor="white"
						onChangeText={(text) => {
							handleInputChange('confirmedPassword', text);
							checkPassword(text);
						}}
						secureTextEntry={!showConfirmPassword}
					/>
					<IconButton source={showConfirmPassword ? require('../assets/icons/show.png') : require('../assets/icons/hide.png')} onPress={() => setShowConfirmPassword(!showConfirmPassword)} tintColor="white" />
				</View>
				{/* <TextInput style={[styles.input, { marginBottom: 30 }]} autoCapitalize="none" placeholder="Confirmer mot de passe" placeholderTextColor="white" onChangeText={(text) => handleInputChange('confirmedPassword', text)} secureTextEntry /> */}
				<Button text="S'inscrire" width="80%" height={60} backgroundColor="#0084b4" color="white" fontSize={25} onPress={handleSubmit} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	messageContainer: {
		// marginTop: 15,
	},

	container: {
		fontFamily: 'Montserrat',
		flex: 1,
		backgroundColor: 'white',
	},
	containerTitle: {
		flex: 1,
		flexDirection: 'column',
		width: '100%',
		fontFamily: 'Montserrat',
		justifyContent: 'center',
		alignItems: 'center',
	},
	containerForm: {
		flex: 4,
		flexDirection: 'column',
		fontFamily: 'Montserrat',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	title: {
		flex: 0.5,
		flexDirection: 'row',
		flexWrap: 'wrap',
		textAlign: 'center',
		marginBottom: 20,
		color: '#0084b4',
	},
	input: {
		width: '72.5%',
		height: 55,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		marginTop: 30,
		borderRadius: 10,
		fontFamily: 'Montserrat',
		backgroundColor: 'rgba(0,0,0,0.4)',
		color: 'white',
		fontSize: 20,
	},
	inputPasswordContainer: {
		width: '72.5%',
		height: 55,
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 15,
		marginTop: 30,
		borderRadius: 10,
		fontFamily: 'Montserrat',
		backgroundColor: 'rgba(0,0,0,0.4)',
		color: 'white',
		fontSize: 20,
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
		position: 'absolute',
	},

	passwordBubbleText: {
		color: 'black',
		textAlign: 'center',
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export default Register;
