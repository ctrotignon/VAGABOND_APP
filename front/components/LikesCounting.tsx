import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type LikesCountingProps = {
	initialLikes: number;
	userLikes: boolean;
};

const LikesCounting: React.FC<LikesCountingProps> = ({ initialLikes, userLikes }) => {
	return (
		<View style={styles.container}>
			{userLikes && initialLikes > 1 && (
				<Text style={styles.text}>
					Vous et {initialLikes - 1} {initialLikes - 1 === 1 ? 'personne aime' : 'personnes aiment'} ça
				</Text>
			)}
			{userLikes && initialLikes === 1 && <Text>Vous aimez ça</Text>}
			{!userLikes && initialLikes > 0 && (
				<Text style={styles.text}>
					{initialLikes} {initialLikes === 1 ? 'personne aime' : 'personnes aiment'} ça
				</Text>
			)}
			{!userLikes && initialLikes === 0 && <Text>Aucune personne n'aime ça</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 10,
	},
	text: {
		fontFamily: 'Montserrat',
		fontWeight: 'bold',
	},
});

export default LikesCounting;
