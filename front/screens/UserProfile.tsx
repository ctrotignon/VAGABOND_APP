import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../App';
import CustomButton from '../components/CustomButton';
import FollowButton from '../components/FollowButton';
import FooterMenu from '../components/FooterMenu';
import * as SecureStore from 'expo-secure-store';

export type UserProfileProps = {
	route: {
		params?: {
			username?: string;
		};
	};
};

const UserProfile: React.FC<UserProfileProps> = ({ route }) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'UserProfile'>>();
	const [postUserId, setpostUserId] = useState<number | undefined>(undefined);
	const [userConnectedId, setUserConnectedId] = useState<number | undefined>(undefined);
	const [followerCount, setFollowerCount] = useState<number>(0);
	const [followingCount, setFollowingCount] = useState<number>(0);
	const username = route.params?.username || '';

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
				const data = await response.json();
				setUserConnectedId(data?.id);
				fetchFollowers();
			} else {
				console.error("Erreur lors de la recupération de l'utilisateur connecté");
			}
		} catch (error) {
			console.error('Erreur de communication avec le serveur', error);
		}
	};
	const fetchPostUserData = async () => {
		try {
			const response = await fetch(`${process.env.ADRESS}/user/${username}`);
			if (response.ok) {
				const data = await response.json();
				console.log('INTO FRONT USERNAME => ID ', data);
				setpostUserId(data);
			} else {
				console.error('Failed to fetch user data');
			}
		} catch (error) {
			console.error('Error fetching user data:', error);
		}
	};

	const fetchFollowers = async () => {
		try {
			const responseFollower = await fetch(`${process.env.ADRESS}/follow/followersCount/${postUserId}`);
			const responseFollowing = await fetch(`${process.env.ADRESS}/follow/followingsCount/${postUserId}`);

			console.log(responseFollower.status);

			if (responseFollower.ok) {
				const dataFollower = await responseFollower.json();
				const dataFollowing = await responseFollowing.json();
				setFollowerCount(dataFollower);
				setFollowingCount(dataFollowing);

				console.log('Follower data user profil', dataFollower);
				console.log('FollowING data user profil', dataFollowing);
			}
		} catch (error) {
			console.error('Error fetching user data:', error);
		}
	};

	const fetchUserDataAndFollowers = async () => {
		await fetchPostUserData();
		if (postUserId !== undefined) {
			await fetchFollowers();
			await fetchImages();
		}
	};

	const [images, setImages] = useState<string[]>([]);
	const [page, setPage] = useState<number>(1);

	const fetchImages = async () => {
		try {
			const response = await fetch(`${process.env.ADRESS}/post/${postUserId}`);
			const fetchedImagesAPI = await response.json();
			setImages((previousImages) => [...previousImages, ...fetchedImagesAPI]);
		} catch (error) {
			console.error('Error fetching images:', error);
		}
	};

	const renderItem = ({ item }: { item: string }) => <Image source={{ uri: item }} style={userProfileStyle.image} />;

	useEffect(() => {
		getUserData();
	}, []);

	useEffect(() => {
		fetchUserDataAndFollowers();
	}, [postUserId]);

	useEffect(() => {
		fetchImages();
	}, [page]);
	return (
		<View style={userProfileStyle.container}>
			<View style={{ flex: 1, alignItems: 'center' }}>
				<View style={{ flex: 1 }}>
					<Image style={userProfileStyle.imageProfile} source={require('../assets/icons/add.png')} />
					<Text style={userProfileStyle.username}>{username}</Text>
				</View>

				<View style={userProfileStyle.followContainer}>
					<Text style={userProfileStyle.followText}>Suiveurs: {followerCount} </Text>
					<Text style={userProfileStyle.followText}>Suivi : {followingCount}</Text>
				</View>
				<View style={userProfileStyle.buttonContainer}>
					<FollowButton followerId={userConnectedId} followingId={postUserId} onPress={fetchFollowers} />
					<CustomButton text="Message" color="white" backgroundColor="orange" width={150} fontSize={17} />
				</View>
			</View>
			<View style={{ flex: 1.25 }}>
				<FlatList data={images} keyExtractor={(item, index) => index.toString()} renderItem={renderItem} numColumns={3} />
			</View>

			<FooterMenu />
		</View>
	);
};

const userProfileStyle = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 30,
	},
	imageProfile: {
		height: 75,
		width: 75,
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
		flex: 0.5,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		width: '100%',
	},
	followText: {
		fontFamily: 'Montserrat',
		fontWeight: 'bold',
		fontSize: 15,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		width: '100%',
	},
	image: {
		width: Dimensions.get('window').width / 3,
		height: Dimensions.get('window').width / 3,
		margin: 1,
	},
});

export default UserProfile;
