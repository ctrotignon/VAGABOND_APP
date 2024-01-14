import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useNavigation, useRoute } from '@react-navigation/native';
import { type StackNavigation } from '../App';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import Button from './CustomButton';
import LikeButton from './LikeButton';
import Comment from './Comment';
import LikesCounting from './LikesCounting';

type PostProps = {
	mediaPath: string;
	postId: number;
	username: string;
	userImage: string;
};

const Post: React.FC<PostProps> = ({ username, mediaPath, userImage, postId }) => {
	const [userId, setUserId] = useState(null);
	const { navigate } = useNavigation<StackNavigation>();
	const { name } = useRoute();
	const [likes, setLikes] = useState(0);
	const [liked, setLiked] = useState(false);
	const [usernameFetched, setUsernameFetched] = useState('');
	const [loading, setLoading] = useState(true);

	const getUserId = async () => {
		try {
			const response = await fetch(`${process.env.ADRESS}/user/${username}`);
			if (response.ok) {
				const userID = await response.json();
				setUserId(userID);
			} else {
				console.error("Erreur lors de la récupération de l'id de l'utilisateur");
			}
		} catch (error) {
			console.error('Erreur de communication avec le serveur', error);
		}
	};

	const getLikeByPost = async () => {
		try {
			const response = await fetch(`${process.env.ADRESS}/like/${postId}`);
			if (response.ok) {
				const likeCount = await response.json();
				setLikes(likeCount.likeCount);
			} else {
				console.error('Erreur lors de la récupération du nombre de likes pour le post');
			}
		} catch (error) {
			console.error('Erreur de communication avec le serveur', error);
		}
	};

	const Like = async () => {
		try {
			const response = await fetch(`${process.env.ADRESS}/like/${postId}/${userId}`, {
				method: liked ? 'DELETE' : 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					post_id: postId,
					user_id: userId,
				}),
			});

			if (response.ok) {
				console.log('requête like');
			} else {
				console.error('Erreur lors de la requête de like');
			}
		} catch (error) {
			console.error('Erreur lors de la requête de like', error);
		}
	};

	const userAlreadyLikedPost = async () => {
		try {
			const userLikedResponse = await fetch(`${process.env.ADRESS}/like/userLiked/${postId}/${userId}`);
			if (userLikedResponse.ok) {
				const userLikedData = await userLikedResponse.json();
				setLiked(userLikedData.likeExists);
			} else {
				console.error("Erreur lors de la récupération de l'état 'liked' pour l'utilisateur");
			}
		} catch (error) {
			console.error('Erreur lors de la requête de suivi', error);
		}
	};

	const fetchData = async () => {
		try {
			await getUserId();
			await getLikeByPost();
			await userAlreadyLikedPost();
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleLikePress = async () => {
		await getUserId();

		setLiked((prevLiked) => !prevLiked);

		liked ? setLikes((prevLikes) => prevLikes - 1) : setLikes((prevLikes) => prevLikes + 1);

		await Like();
	};

	const getUserData = async () => {
		try {
			const token = await SecureStore.getItemAsync('token');
			if (!token) {
				console.error("Le token n'a pas été trouvé.");
				return;
			}
			const response = await fetch(`${process.env.ADRESS}/user/getUserConnected`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const userInfos = await response.json();
				setUsernameFetched(userInfos.username);
			} else {
				console.error('Erreur lors de la mise à jour du mot de passe');
			}
		} catch (error) {
			console.error('Erreur de communication avec le serveur', error);
		}
	};

	const handleProfilPress = () => {
		getUserData();
		if (usernameFetched !== username) {
			navigate('UserProfile', { username });
		} else {
			navigate('Account');
		}
	};

	if (loading) {
		return <Text>Loading...</Text>;
	}

	return (
		<View style={stylePost.postContainer}>
			<View style={stylePost.postHeader}>
				<View style={stylePost.userContainer}>
					<TouchableOpacity onPress={handleProfilPress}>
						<Image style={stylePost.userImage} source={{ uri: userImage }} />
					</TouchableOpacity>
					<TouchableOpacity onPress={handleProfilPress}>
						<Text style={stylePost.userText}>{username}</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Image source={{ uri: mediaPath }} style={stylePost.postImage} />
			<View>
				<LikesCounting initialLikes={likes} />
				<View style={stylePost.iconContainer}>
					<LikeButton initialLikes={likes} onLikePress={handleLikePress} />
					<Comment postId={postId} />
				</View>
			</View>
		</View>
	);
};

const stylePost = StyleSheet.create({
	postContainer: {
		marginVertical: 5,
		backgroundColor: 'white',
		padding: 10,
	},
	postHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	userContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
	},
	userImage: {
		height: 40,
		width: 40,
		borderRadius: 100,
	},
	userText: {
		fontFamily: 'JustAnotherHand',
		fontSize: 35,
		paddingHorizontal: 10,
		paddingTop: 20,
		paddingBottom: 10,
		fontWeight: 'bold',
		color: 'orange',
	},
	postImage: {
		flex: 1,
		aspectRatio: 1,
		resizeMode: 'cover',
	},
	iconContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		padding: 10,
		borderTopWidth: 2,
		borderTopColor: '#0084b4',
	},
});

export default Post;
