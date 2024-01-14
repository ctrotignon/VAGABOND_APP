import React, { useState, useEffect, useRef } from 'react';

import { View, Text, Image, TouchableOpacity, Modal, TextInput, FlatList, StyleSheet } from 'react-native';

import CustomButton from './CustomButton';
import LikeButton from './LikeButton';
import * as SecureStore from 'expo-secure-store';

type CommentComponentProps = {
	postId: number;
};

type CommentState = {
	id: number;
	// userName: string;
	content: string;
};

type CommentData = {
	id: number;
	user_id: number;
	content: string;
};

const Comment: React.FC<CommentComponentProps> = ({ postId }) => {
	const [comments, setComments] = useState<CommentState[]>([]);
	const [content, setcontent] = useState<string>('');
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const commentListRef = useRef<FlatList>(null);

	const [likes, setLikes] = useState(420);
	const [liked, setLiked] = useState(false);

	const handleLikePress = () => {
		liked ? setLikes(likes - 1) : setLikes(likes + 1);
		setLiked(!liked);
	};

	const addComment = async (postId: number, content: string) => {
		const token = await SecureStore.getItemAsync('token');
		try {
			const response = await fetch(`${process.env.ADRESS}/comment/addComment`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					postId: postId,
					content,
				}),
			});

			if (response.ok) {
				const data = await response.json();
			}
		} catch (error) {
			console.error('Error sending comment:', error);
		}
	};

	const fetchCommentsFromDatabase = async () => {
		try {
			const response = await fetch(`${process.env.ADRESS}/comment/getComments/${postId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();
			setComments(data);
		} catch (error) {
			console.error('Error fetching comments:', error);
		}
	};

	useEffect(() => {
		fetchCommentsFromDatabase();
	}, [postId]);
	useEffect(() => {}, [comments]);
	const handleSubmit = () => {
		if (content.trim() !== '') {
			const newComment: CommentState = {
				id: comments.length + 1,
				// userName: ,
				content: content,
			};

			setComments([...comments, newComment]);
			setcontent('');

			addComment(postId, content);
			commentListRef.current?.scrollToOffset({ animated: true, offset: 999999 });
		}
	};

	const openModal = () => {
		setIsModalVisible(true);
	};

	const closeModal = () => {
		setIsModalVisible(false);
	};

	return (
		<View style={styles.imageContainer}>
			<TouchableOpacity onPress={openModal}>
				<Image style={styles.image} source={require('../assets/icons/chat.png')} />
			</TouchableOpacity>

			<Modal visible={isModalVisible} animationType="slide" transparent={false}>
				<View style={styles.modalContainer}>
					<TouchableOpacity onPress={closeModal} style={{ alignItems: 'flex-end' }}>
						<Text style={styles.closeButton}>&times;</Text>
					</TouchableOpacity>

					<FlatList
						ref={commentListRef}
						style={{ flex: 2, marginBottom: 20 }}
						data={comments}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<View style={styles.commentItem}>
								{/* <Text>{item.userName}</Text> */}
								<Text>{item.content}</Text>
							</View>
						)}
						inverted
					/>
					<View style={styles.commentInputContainer}>
						<TextInput multiline={true} style={styles.commentInput} placeholder="Ajouter un commentaire..." value={content} onChangeText={(text) => setcontent(text)} />

						<CustomButton text="Valider" color="white" backgroundColor="#0084b4" width={250} fontSize={20} onPress={handleSubmit} />
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	imageContainer: {
		paddingTop: 10,
	},
	modalContainer: {
		flex: 1,
		marginTop: 50,
		padding: 20,
	},
	closeButton: {
		color: 'black',
		fontSize: 40,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	commentInputContainer: {
		height: '25%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	commentInput: {
		width: '100%',
		height: '30%',
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 5,
		padding: 8,
		marginRight: 10,
		marginBottom: 20,
	},
	addCommentButton: {
		height: 50,
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		margin: 20,
		borderRadius: 50,
		backgroundColor: '#0084b4',
	},
	textAddCommentButton: {
		fontFamily: 'Montserrat',
		fontSize: 15,
		color: 'white',
	},
	commentItem: {
		flex: 1,
		marginTop: 15,
		padding: 8,
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 5,
		backgroundColor: 'orange',
	},
	image: {
		width: 50,
		height: 50,
	},
});

export default Comment;
