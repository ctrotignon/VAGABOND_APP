import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

type LikeButtonProps = {
	initialLikes: number;
	onLikePress: () => void;
};

const LikeButton: React.FC<LikeButtonProps> = ({ onLikePress }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={onLikePress}>
				<Image style={styles.image} source={require('../assets/icons/hand.png')} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},

	image: {
		width: 50,
		height: 50,
	},
});

export default LikeButton;
