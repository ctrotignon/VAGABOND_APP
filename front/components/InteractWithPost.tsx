import React from 'react';
import { View, StyleSheet } from 'react-native';
import LikesCounting from './LikesCounting';
import LikeButton from './LikeButton';
import Comment from './Comment';

type ButtonProps = {
	initialLikes: number;
	onLikePress: () => void;
};

const InteractWithPost: React.FC<ButtonProps> = ({ initialLikes, onLikePress }) => {
	return (
		<View style={styles.container}>
			<View>
				<LikesCounting initialLikes={initialLikes} />
			</View>
			<View style={styles.iconContainer}>
				<LikeButton initialLikes={initialLikes} onLikePress={onLikePress} />
				<Comment />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'blue',
		flex: 1,
	},
	iconContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: 'red',
	},
});

export default InteractWithPost;
