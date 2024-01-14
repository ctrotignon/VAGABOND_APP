import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, GestureResponderEvent } from 'react-native';
import Button from './CustomButton';
import * as SecureStore from 'expo-secure-store';

interface FollowButtonProps {
	followerId?: number;
	followingId?: number;
	onPress?: () => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({ followerId, followingId, onPress }) => {
	const [isFollowing, setIsFollowing] = useState(false);

	useEffect(() => {
		const fetchIsFollowing = async () => {
			try {
				const storedIsFollowing = await SecureStore.getItemAsync('isFollowing');
				if (storedIsFollowing !== null) {
					setIsFollowing(JSON.parse(storedIsFollowing));
				}
			} catch (error) {
				console.error('Erreur lors de la récupération de isFollowing depuis SecureStore', error);
			}
		};

		fetchIsFollowing();
	}, []);

	const handleToggleFollow = async () => {
		try {
			if (!followingId) {
				console.error('Invalid followingId:', followingId);
				return;
			}

			const response = await fetch(`${process.env.ADRESS}/follow/${followerId}/${followingId}`, {
				method: isFollowing ? 'DELETE' : 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					follower_user_id: followerId,
					following_user_id: followingId,
				}),
			});

			if (response.ok) {
				setIsFollowing((prev) => !prev);
				await SecureStore.setItemAsync('isFollowing', JSON.stringify(!isFollowing));
				onPress && onPress();
			} else {
				console.error('Erreur lors de la requête de suivi');
			}
		} catch (error) {
			console.error('Erreur lors de la requête de suivi', error);
		}
	};

	return (
		<View>
			<Button text={isFollowing ? 'Ne plus suivre' : 'Suivre'} color="white" backgroundColor="#0084b4" width={150} fontSize={17} onPress={handleToggleFollow} />
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		padding: 10,
		backgroundColor: '#3498db',
		borderRadius: 5,
	},
});

export default FollowButton;
