import React, { useState, useEffect, useRef } from 'react';
import { Text, View, FlatList, Image, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import FooterMenu from '../components/FooterMenu';
import Post from '../components/Post';

type PostData = {
	username: string;
	id: number;
	mediaPath: string;
	userImage: string;
};

const HomeConnected: React.FC = () => {
	const [postsData, setPostsData] = useState<PostData[]>([]);
	const flatListRef = useRef<FlatList | null>(null);

	const fetchPosts = async () => {
		try {
			const response = await fetch(`${process.env.ADRESS}/post/allPosts`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				console.error('Error fetching posts:', response.statusText);
				return;
			}

			const data = await response.json();
			console.log('DATA dazmùefmzrrl', data.posts.length);

			// Fetch usernames based on user_ids
			const usernamePromises = data.posts.map(async (post: { user_id: number }) => {
				console.log('USER_ID', post.user_id);
				const userId = post.user_id;

				try {
					const userResponse = await fetch(`${process.env.ADRESS}/user/getUserById/${userId}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});

					const userData = await userResponse.json();
					console.log('userData', userData);

					if (userResponse.ok) {
						return userData;
					} else {
						console.error(`Error fetching user data for user ID ${userId}:`, userResponse.statusText);
						return 'Utilisateur non trouvé';
					}
				} catch (error) {
					console.error('Error fetching user data:', error.message);
					return 'Utilisateur non trouvé';
				}
			});

			// Wait for all promises to be resolved
			const usernames = await Promise.all(usernamePromises);

			const updatedPostsData: PostData[] = data.posts.map((post: { id: number; user_id: number; mediaURL: string }, index: number) => ({
				username: usernames[index],
				id: post.id,
				mediaPath: post.mediaURL,
				userImage: 'https://bucketvagabondaws.s3.eu-west-3.amazonaws.com/van.avif',
			}));

			setPostsData(updatedPostsData);
		} catch (error: any) {
			console.error('Erreur:', error.message);
		}
	};
	useEffect(() => {
		fetchPosts();
	}, []);

	useFocusEffect(
		React.useCallback(() => {
			fetchPosts();
			// if (flatListRef.current && postsData.length > 0) {
			// 	const initialScrollIndex = postsData.length - 1;
			// 	flatListRef.current.scrollToIndex({ index: initialScrollIndex, animated: true });
			// }
		}, [])
	);

	return (
		<View style={styles.container}>
			<FlatList
				ref={flatListRef}
				style={styles.postList}
				data={postsData}
				keyExtractor={(item) => item.id.toString()} // Convert id to string for key
				renderItem={({ item }) => <Post username={item.username} mediaPath={item.mediaPath} userImage={item.userImage} postId={item.id} key={item.id.toString()} />}
				inverted
				// initialScrollIndex={postsData.length - 1}
			/>
			{/* <FlatList
				style={styles.postList}
				data={postsData}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <Post username={item.username} mediaPath={item.mediaPath} userImage={item.userImage} postId={item.id} key={item.id.toString()} />}
				inverted
				// initialScrollIndex={postsData.length - 1}
				// getItemLayout={
				// 	(data, index) => ({
				// 		length: 250,
				// 		offset: 250 * index,
				// 		index,
				// 	}) // Remplacez POST_ITEM_HEIGHT par la hauteur estimée de chaque élément
				// }
			/> */}

			<FooterMenu />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'orange',
	},
	postList: {
		width: '100%',
	},
});

export default HomeConnected;
