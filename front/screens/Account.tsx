import React, { useState, useEffect } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import FooterMenu from '../components/FooterMenu';
import CustomButton from '../components/CustomButton';
import ChangePasswordModal from '../components/changePasswordModal';

import { useNavigation } from '@react-navigation/native';
import { type StackNavigation } from '../App';

type AccountProps = {
	setUserConnected: React.Dispatch<React.SetStateAction<boolean>>;
};
const Account: React.FC<AccountProps> = ({ setUserConnected }) => {
	const { navigate } = useNavigation<StackNavigation>();

	const [isModalVisible, setModalVisible] = useState(false);
	const [userData, setUserData] = useState<{ username: string; profileImage: string; id: number } | null>(null);
	const [followerCount, setFollowerCount] = useState<number>(0);
	const [followingCount, setFollowingCount] = useState<number>(0);

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
				console.log(userInfos);

				setUserData(userInfos);
				// console.log(userData?.username);
				console.log('test', userData);

				// Ajoute ici la logique pour informer l'utilisateur du succès
			} else {
				console.error('Erreur lors de la mise à jour du mot de passe');
				// Ajoute ici la logique pour informer l'utilisateur de l'échec
			}
		} catch (error) {
			console.error('Erreur de communication avec le serveur', error);
			// Ajoute ici la logique pour informer l'utilisateur de l'erreur
		}
	};

	const fetchFollowers = async () => {
		try {
			const responseFollower = await fetch(`${process.env.ADRESS}/follow/followersCount/${userData?.id}`);
			const responseFollowing = await fetch(`${process.env.ADRESS}/follow/followingsCount/${userData?.id}`);
			// console.log(response.json());
			console.log(responseFollower.status);

			if (responseFollower.ok) {
				const dataFollower = await responseFollower.json();
				const dataFollowing = await responseFollowing.json();
				setFollowerCount(dataFollower);
				setFollowingCount(dataFollowing);
				console.log('Follower data', dataFollower);
				console.log('FollowING data', dataFollowing);
			}
		} catch (error) {
			console.error('Error fetching user data:', error);
		}
	};
	const fetchUserDataAndFollowers = async () => {
		await getUserData();
		// Fetch followers only if postUserId is available
		if (userData?.id !== undefined) {
			await fetchFollowers();
		}
	};

	useEffect(() => {
		fetchUserDataAndFollowers();
	}, [userData?.id]);

	const handleOpenModal = () => {
		setModalVisible(true);
	};

	const handleCloseModal = () => {
		setModalVisible(false);
	};

	const handleLogout = async () => {
		try {
			await SecureStore.deleteItemAsync('token');
			await SecureStore.deleteItemAsync('user_id');
			console.log('Cookie supprimé avec succès');
			navigate('Home');
			setUserConnected(false);
		} catch (error) {
			console.error('Erreur lors de la suppression du cookie :', error);
		}
	};

	const handleChangePassword = async (currentPassword: string, newPassword: string) => {
		try {
			const token = await SecureStore.getItemAsync('token');
			if (!token) {
				console.error("Le token n'a pas été trouvé.");
				return;
			}
			const response = await fetch(`${process.env.ADRESS}/user/updatePassword`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					currentPassword,
					newPassword,
				}),
			});

			if (response.ok) {
				console.log('Mot de passe mis à jour avec succès');
			} else {
				console.error('Erreur lors de la mise à jour du mot de passe');
			}
		} catch (error) {
			console.error('Erreur de communication avec le serveur', error);
		}
		handleCloseModal();
	};

	const handleDeleteAccount = async () => {
		Alert.alert('Confirmation', 'Êtes-vous sûr de vouloir supprimer votre compte ?', [
			{
				text: 'Annuler',
				style: 'cancel',
			},
			{
				text: 'OK',
				onPress: async () => {
					try {
						const token = await SecureStore.getItemAsync('token');

						if (!token) {
							console.error("Le token n'a pas été trouvé.");
							return;
						}

						const response = await fetch(`${process.env.ADRESS}/user/deleteUser`, {
							method: 'DELETE',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${token}`,
							},
						});

						if (response.ok) {
							await SecureStore.deleteItemAsync('token');
							navigate('Home');
						} else {
							console.error("Erreur lors de la suppression de l'utilisateur :", response.status, response.statusText);
						}
					} catch (error) {
						console.error("Erreur lors de la suppression de l'utilisateur :", error);
					}
				},
			},
		]);
	};

	return (
		<View style={{ flex: 1 }}>
			<View style={styleAccount.container}>
				<Image style={styleAccount.imageProfile} source={require('../assets/icons/add.png')} />
				<Text style={styleAccount.username}>{userData?.username}</Text>
			</View>
			<View style={styleAccount.followContainer}>
				<Text style={styleAccount.followText}>Suiveurs: {followerCount} </Text>
				<Text style={styleAccount.followText}>Suivis : {followingCount}</Text>
			</View>
			<View style={styleAccount.buttonContainer}>
				<CustomButton text="Changer mot de passe" backgroundColor="#0084b4" color="white" width="60%" height={60} fontSize={15} onPress={handleOpenModal} />
				<ChangePasswordModal isVisible={isModalVisible} onClose={handleCloseModal} onSubmit={handleChangePassword} />
				<CustomButton text="Se déconnecter" backgroundColor="orange" color="white" width="60%" height={60} fontSize={15} onPress={handleLogout} />
				<CustomButton
					text="Supprimer compte"
					backgroundColor="red"
					color="white"
					width="60%"
					height={60}
					fontSize={15}
					onPress={() => {
						handleDeleteAccount();
					}}
				/>
			</View>
			<FooterMenu />
		</View>
	);
};

const styleAccount = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 30,
	},
	buttonContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: 'red',
	},
	imageProfile: {
		height: 125,
		width: 125,
	},
	username: {
		fontSize: 50,
		fontFamily: 'JustAnotherHand',
		color: 'orange',
		paddingTop: 30,
		paddingBottom: 10,
	},
	followContainer: {
		flexDirection: 'row',
		height: 100,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		width: '100%',
	},
	followText: {
		fontFamily: 'Montserrat',
		fontWeight: 'bold',
		fontSize: 20,
	},
});

export default Account;
