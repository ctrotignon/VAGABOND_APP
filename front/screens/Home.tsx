import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../App';

import CustomButton from '../components/CustomButton';
import TitleApp from '../components/TitleApp';

const HomeScreen: React.FC = () => {
	const { navigate } = useNavigation<StackNavigation>();
	return (
		<View style={styles.container}>
			<ImageBackground source={{ uri: 'https://bucketvagabondaws.s3.eu-west-3.amazonaws.com/ballon.jpg' }} resizeMode="cover" style={styles.image}>
				<TitleApp />
				<View style={styles.containerForm}>
					<CustomButton
						text="Se connecter"
						width="80%"
						height={60}
						backgroundColor="#0084b4"
						color="white"
						fontSize={25}
						onPress={() => {
							navigate('Login');
						}}
					/>
					<CustomButton
						text="Créer un compte"
						width="80%"
						height={60}
						fontSize={25}
						backgroundColor="#000000ab"
						color="white"
						onPress={() => {
							navigate('Register');
						}}
					/>
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		fontFamily: 'Montserrat',
		justifyContent: 'center',
		alignItems: 'center',
	},
	containerForm: {
		flex: 3,
		flexDirection: 'column',
		fontFamily: 'Montserrat',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	image: {
		flex: 1,
		height: '100%',
		width: '100%',
	},
});

export default HomeScreen;
