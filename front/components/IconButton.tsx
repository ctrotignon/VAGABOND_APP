import React from 'react';
import { StyleSheet, TouchableOpacity, Text, GestureResponderEvent, Image, ImageProps, ImageStyle } from 'react-native';

type IconButtonProps = {
	source: ImageProps['source'];
	isActive?: boolean;
	onPress?: (event: GestureResponderEvent) => void;
	tintColor?: string;
};

const IconButton: React.FC<IconButtonProps> = ({ source, onPress, isActive, tintColor }) => {
	const containerStyle = [styleIconButton.container, isActive && styleIconButton.activeContainer];
	const imageStyle = [styleIconButton.image, isActive && styleIconButton.activeImage];
	if (tintColor) {
		imageStyle.push({ tintColor });
	}

	return (
		<TouchableOpacity onPress={onPress} style={containerStyle}>
			<Image style={imageStyle} source={source} />
		</TouchableOpacity>
	);
};

const styleIconButton = StyleSheet.create({
	container: {
		padding: 10,
	},
	activeContainer: {
		backgroundColor: 'orange',
		borderRadius: 15,
	},
	image: {
		width: 30,
		height: 30,
	},
	activeImage: {
		tintColor: 'white',
	},
});

export default IconButton;
