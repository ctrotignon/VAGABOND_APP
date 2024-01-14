import React from 'react';
import { DimensionValue, GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';

type CustomButtonProps = {
	text: string;
	backgroundColor?: string;
	color?: string;
	fontSize?: number;
	width?: DimensionValue;
	height?: DimensionValue;
	onPress?: (event: GestureResponderEvent) => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({ text, backgroundColor, color, fontSize, height, width, onPress }) => {
	return (
		<TouchableOpacity style={[styleButton.button, { backgroundColor }, { height }, { width }]} onPress={onPress}>
			<Text style={[styleButton.text, { color }, { fontSize }]}>{text}</Text>
		</TouchableOpacity>
	);
};

const styleButton = StyleSheet.create({
	button: {
		width: '80%',
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		marginBottom: 30,
		borderRadius: 50,
	},
	text: {
		fontFamily: 'Montserrat',
		fontSize: 25,
		fontWeight: 'bold',
	},
});

export default CustomButton;
