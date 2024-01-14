import React from 'react';
import { StyleSheet, View, Text, PixelRatio, Image } from 'react-native';

const TitleApp: React.FC = () => {
	const fontScale = PixelRatio.getFontScale();
	console.log(fontScale);

	const getFontSize = (size: any) => size / fontScale;
	return (
		<View style={styleTitleApp.container}>
			<Text style={styleTitleApp.text}>Vagabond</Text>
		</View>
	);
};

const styleTitleApp = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		flex: 1.5,
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 90,
		fontFamily: 'JustAnotherHand',
		padding: 20,
		color: 'orange',
	},
});

export default TitleApp;
