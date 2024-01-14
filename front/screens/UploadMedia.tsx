import React, { useState, useEffect } from 'react';
import { Alert, View, Image, Platform, StyleSheet, ImageBackground } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { S3 } from 'aws-sdk';
import Button from '../components/CustomButton';
import FooterMenu from '../components/FooterMenu';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../App';

import base64 from 'base64-js';

const awsConfig = {
	region: 'eu-west-3',
	accessKeyId: 'AKIA2E2CWTVTUVJKOXNR',
	secretAccessKey: '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',
};

const s3 = new S3(awsConfig);

const UploadMediaScreen: React.FC = () => {
	const { navigate } = useNavigation<StackNavigation>();
	const [media, setMedia] = useState<string | null>(null);
	const [mediaURL, setMediaURL] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Permission to access media library is required!');
				}
			}
		})();
	}, []);

	const pickMedia = async () => {
		let result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			base64: true,
		});

		if (!result.canceled) {
			if (Array.isArray(result.assets) && result.assets.length > 0) {
				const fileUri = result.assets[0].uri;
				await saveFileToS3(fileUri);
				setMedia(fileUri);
			} else if (typeof result.assets[0].uri === 'string') {
				const fileUri = result.assets[0].uri;
				await saveFileToS3(fileUri);
				setMedia(fileUri);
			}
		}
	};

	useEffect(() => {
		if (mediaURL) {
			handlePost();
		}
	}, [mediaURL]);

	const handlePost = async () => {
		try {
			const token = await SecureStore.getItemAsync('token');
			if (!token) {
				console.error("Le token n'a pas été trouvé.");
				return;
			}

			if (!mediaURL) {
				console.error('mediaURL is null. Aborting post creation.');
				return;
			}

			const type = 'image';
			const response = await fetch(`${process.env.ADRESS}/post/createPost`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ type, mediaURL }),
			});
			const data = await response.json();

			if (response.ok) {
				console.log('Image uploadé avec succès');
				Alert.alert('Cool !', 'La photo a été partagée avec succès.');
				navigate('HomeConnected');
			} else {
				console.log("Erreur lors de l'envoi des données au serveur");
				console.log('response', response);
				console.log('data', data);
			}
		} catch (error: any) {
			console.error('Erreur:', error.message);
		}
	};

	const saveFileToS3 = async (imagePath: string) => {
		try {
			const fileName = imagePath.split('/').pop();

			console.log('FILE NAME', fileName);

			const sanitizedFileName = fileName?.replace(/[^\w\d-.]/g, '');
			console.log('FILE NAME SANITIZE', sanitizedFileName);

			const fileUri = Platform.OS === 'android' ? imagePath : imagePath;

			const fileData = await FileSystem.readAsStringAsync(fileUri, {
				encoding: FileSystem.EncodingType.Base64,
			});

			const uint8Array = base64.toByteArray(fileData);

			const params: S3.Types.PutObjectRequest = {
				Bucket: 'bucketvagabondaws',
				Key: sanitizedFileName || '',
				Body: uint8Array,
				ContentType: 'image/jpeg',
				ACL: 'public-read',
			};

			const response = await s3.upload(params).promise();
			console.log('S3 Upload Response:', response);

			const objectURL = response.Location;
			setMediaURL(objectURL);
			console.log('File uploaded successfully to S3. URL:', objectURL);
		} catch (error) {
			console.error('Error uploading file to S3:', error);
		}
	};

	return (
		<View style={styles.container}>
			<ImageBackground source={require('../assets/images/upload.jpg')} resizeMode="cover" style={styles.image}>
				<View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
					<Button text="Partage ta photo" color="white" backgroundColor="orange" width={250} height={75} fontSize={20} onPress={() => pickMedia()} />
				</View>
				<FooterMenu />
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'orange',
	},
	image: {
		flex: 1,
		height: '100%',
		width: '100%',
	},
});

export default UploadMediaScreen;
