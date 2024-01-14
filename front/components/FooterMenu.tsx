import React from 'react';
import { StyleSheet, TouchableOpacity, Text, GestureResponderEvent, View } from 'react-native';
import IconButton from './IconButton';

import { useNavigation, useRoute } from '@react-navigation/native';
import { type StackNavigation } from '../App';

const FooterMenu: React.FC = () => {
	const { navigate } = useNavigation<StackNavigation>();
	const { name } = useRoute();
	return (
		<View style={styleFooter.container}>
			<IconButton
				source={require('../assets/icons/home.png')}
				onPress={() => {
					navigate('HomeConnected');
				}}
				isActive={name === 'HomeConnected'}
			/>
			<IconButton
				source={require('../assets/icons/search.png')}
				onPress={() => {
					navigate('Discover');
				}}
				isActive={name === 'Discover'}
			/>
			<IconButton
				source={require('../assets/icons/add.png')}
				onPress={() => {
					navigate('UploadMedia');
				}}
				isActive={name === 'UploadMedia'}
			/>
			<IconButton
				source={require('../assets/icons/map.png')}
				onPress={() => {
					navigate('Map');
				}}
				isActive={name === 'Map'}
			/>
			<IconButton
				source={require('../assets/icons/user.png')}
				onPress={() => {
					navigate('Account');
				}}
				isActive={name === 'Account'}
			/>
		</View>
	);
};

const styleFooter = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100%',
		height: '10%',
		backgroundColor: 'white',
	},
});

export default FooterMenu;
