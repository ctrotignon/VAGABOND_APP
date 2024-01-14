import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import MapView, { Marker, Callout, MarkerPressEvent } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import FooterMenu from '../components/FooterMenu';
import Button from '../components/CustomButton';
import IconButton from '../components/IconButton';
import * as SecureStore from 'expo-secure-store';

type MarkerData = {
	id: number;
	title: string;
	type: string;
	description: string;
	latitude: number;
	longitude: number;
};

const MapScreen: React.FC = () => {
	const date: string = new Date().toLocaleDateString('en-GB');
	const [markers, setMarkers] = useState<MarkerData[]>([]);
	const [markersByUser, setMarkersByUser] = useState<MarkerData[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [title, setTitle] = useState('');
	const [type, setType] = useState('Food');
	const [description, setDescription] = useState('');
	const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const mapRef = useRef<MapView>(null);

	const fetchAllMarkers = async (): Promise<void> => {
		try {
			const token = await SecureStore.getItemAsync('token');
			const response = await fetch(`${process.env.ADRESS}/marker/getAllMarkers`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				const fetchedMarkers: MarkerData[] = data.markers.map((marker: any) => ({
					id: marker.id,
					title: marker.title,
					type: marker.type,
					description: marker.description,
					latitude: parseFloat(marker.latitude),
					longitude: parseFloat(marker.longitude),
					isUserMarker: false,
				}));
				setMarkers(fetchedMarkers);
			} else {
				console.error('Failed to fetch markers');
			}
		} catch (error) {
			console.error('Error fetching markers:', error);
		}
	};

	const fetchMarkersByUser = async () => {
		try {
			const token = await SecureStore.getItemAsync('token');

			const response = await fetch(`${process.env.ADRESS}/marker/getMarkersByUser`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.ok) {
				const data = await response.json();

				const fetchedMarkers = data.markers.map((marker: any) => ({
					id: marker.id,
					title: marker.title,
					type: marker.type,
					description: marker.description,
					latitude: parseFloat(marker.latitude),
					longitude: parseFloat(marker.longitude),
					isUserMarker: false,
				}));
				setMarkersByUser(fetchedMarkers);
			} else {
				console.error('Failed to fetch markers by user');
			}
		} catch (error) {
			console.error('Error fetching markers:', error);
		}
	};
	useEffect(() => {
		fetchAllMarkers();
		fetchMarkersByUser();
	}, []);

	const handleMapPress = async (event: any) => {
		const { coordinate } = event.nativeEvent;
		const camera = await mapRef.current?.getCamera();

		if (camera) {
			if (selectedMarker) {
				// Ferme le callout
				setSelectedMarker(null);
			} else {
				// Ouvre le modal
				setTitle('');
				setDescription('');
				setModalVisible(true);
			}
		}
	};

	const handleMarkerPress = (event: MarkerPressEvent, marker: MarkerData) => {
		event.stopPropagation();
		setSelectedMarker(marker);
	};

	const handleEditMarker = async (marker: MarkerData) => {
		setSelectedMarker(marker);
		setTitle(marker.title);
		setType(marker.type);
		setDescription(marker.description);
		setIsEditMode(true);
		setModalVisible(true);
	};

	const getIconName = (type: string): ImageSourcePropType => {
		const iconMapping: Record<string, ImageSourcePropType> = {
			Manger: require('../assets/icons/restaurant.png'),
			Dormir: require('../assets/icons/sleeping.png'),
			'Point de vue': require('../assets/icons/eye.png'),
			'Surf Spot': require('../assets/icons/surfing.png'),
		};

		return iconMapping[type] || require('../assets/icons/question-mark.png');
	};

	const handleSubmit = async () => {
		if (!title || !description) {
			alert('Veuillez remplir tous les champs.');
			return;
		}

		const camera = await mapRef.current?.getCamera();

		if (!camera) {
			console.error('La référence à la caméra est nulle.');
			return;
		}

		const region = await camera.center;
		console.log(region.latitude);

		const newMarker: MarkerData = {
			id: markers.length + 1,
			title,
			type,
			description,
			latitude: region.latitude,
			longitude: region.longitude,
		};

		try {
			const token = await SecureStore.getItemAsync('token');
			const response = await fetch(`${process.env.ADRESS}/marker/createMarker`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title: newMarker.title,
					type: newMarker.type,
					description: newMarker.description,
					latitude: parseFloat(newMarker.latitude.toFixed(15)),
					longitude: parseFloat(newMarker.longitude.toFixed(15)),
				}),
			});

			if (response.ok) {
				const responseData = await response.json();
				console.log('Réponse du serveur :', responseData);
				fetchMarkersByUser();

				setModalVisible(false);
			} else {
				console.error('Échec de la requête POST');
				alert('Échec de la requête POST');
			}
		} catch (error) {
			console.error('Erreur lors de la requête POST', error);
			alert('Erreur lors de la requête POST');
		}
	};

	const handleUpdateMarker = async () => {
		if (!selectedMarker) {
			alert('Aucun marqueur sélectionné.');
			return;
		}

		if (!title || !description) {
			alert('Veuillez remplir tous les champs.');
			return;
		}

		try {
			const token = await SecureStore.getItemAsync('token');
			const response = await fetch(`${process.env.ADRESS}/marker/updateMarker`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: selectedMarker?.id,
					title,
					type,
					description,
					latitude: selectedMarker?.latitude,
					longitude: selectedMarker?.longitude,
					token: token,
				}),
			});

			if (response.ok) {
				const responseData = await response.json();
				console.log('Réponse du serveur :', responseData);
				// setMarkers((prevMarkers) => prevMarkers.map((marker) => (marker.id === selectedMarker?.id ? { ...marker, title, type, description } : marker)));
				setMarkers((prevMarkers) => prevMarkers.map((marker) => (selectedMarker && marker.id === selectedMarker.id ? { ...selectedMarker, title, type, description } : marker)));
			} else {
				console.error('Échec de la requête PUT', response.statusText);
				alert('Échec de la requête PUT');
			}
		} catch (error) {
			console.error('Erreur lors de la requête PUT', error);
			alert('Erreur lors de la requête PUT');
		} finally {
			fetchMarkersByUser();
			setModalVisible(false);
			setIsEditMode(false);
		}
	};

	const handleDeleteMarker = async () => {
		console.log('Selected Marker:', selectedMarker);
		if (!selectedMarker) {
			alert('Aucun marqueur sélectionné.');
			return;
		}

		try {
			const token = await SecureStore.getItemAsync('token');
			console.log('SELECTED', selectedMarker);

			const response = await fetch(`${process.env.ADRESS}/marker/deleteMarker/${selectedMarker.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const responseData = await response.json();
				console.log('Réponse du serveur :', responseData);
				setMarkers((prevMarkers) => prevMarkers.filter((marker) => marker.id !== selectedMarker.id));
			} else {
				console.error('Échec de la requête DELETE in response');
				alert('Échec de la requête DELETE');
			}
		} catch (error) {
			console.error('Erreur lors de la requête DELETE', error);
			alert('Erreur lors de la requête DELETE');
		} finally {
			setModalVisible(false);
			fetchMarkersByUser();
		}
	};

	const closeModal = () => {
		fetchMarkersByUser();
		setModalVisible(false);
		setIsEditMode(false);
	};

	const handleSaveChanges = () => {
		if (isEditMode) {
			handleUpdateMarker();
		} else {
			handleSubmit();
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<MapView ref={mapRef} style={{ flex: 1 }} onPress={handleMapPress}>
				{markers.map((marker) => (
					<Marker key={marker.id} coordinate={{ latitude: marker.latitude, longitude: marker.longitude }} onPress={(event) => handleMarkerPress(event, marker)}>
						<Callout testID="marker-callout">
							<View style={styles.calloutContainer}>
								<View style={styles.calloutContent}>
									<Text style={styles.calloutTitle}>{marker.title}</Text>
									<Image source={getIconName(marker.type)} style={styles.icon} />
									<View>
										<Text style={styles.modalDate}>Le {date}</Text>
										<Text style={styles.calloutDescription}>{marker.description}</Text>
									</View>
									<Text style={styles.coordinatesText}>
										Lat:{marker?.latitude}, Long:{marker?.longitude}
									</Text>
								</View>
							</View>
						</Callout>
					</Marker>
				))}
				{markersByUser.map((marker) => (
					<Marker key={marker.id} coordinate={{ latitude: marker.latitude, longitude: marker.longitude }} onPress={(event) => handleMarkerPress(event, marker)}>
						<Callout testID="marker-callout">
							<View style={styles.calloutContainer}>
								<View style={styles.calloutContent}>
									<View style={styles.topIcon}>
										<IconButton source={require('../assets/icons/edit.png')} tintColor="#0084b4" onPress={() => handleEditMarker(marker)} />
										<IconButton source={{ uri: 'https://bucketvagabondaws.s3.eu-west-3.amazonaws.com/delete.png' }} tintColor="orange" onPress={() => handleDeleteMarker()} />
									</View>
									<Text style={styles.calloutTitle}>{marker.title}</Text>
									<Image source={getIconName(marker.type)} style={styles.icon} />
									<View>
										<Text style={styles.modalDate}>{date}</Text>
										<Text style={styles.calloutDescription}>{marker.description}</Text>
									</View>
									<Text style={styles.coordinatesText}>
										Lat:{marker?.latitude}, Long:{marker?.longitude}
									</Text>
								</View>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>

			<Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={closeModal}>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<View style={{ width: '85%', paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 20, paddingTop: 10 }}>
						<View style={styles.closingCross}>
							<TouchableOpacity onPress={closeModal}>
								<Text style={styles.closingCrossText}>&times;</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.modalTitleContainer}>
							<Text style={styles.modalTitle}>Partage ta découverte</Text>
						</View>
						<TextInput style={styles.inputTitle} placeholder="Titre" value={title} onChangeText={(text) => setTitle(text)} />
						<Picker style={styles.picker} selectedValue={type} onValueChange={(itemValue) => setType(itemValue)}>
							<Picker.Item label="Manger" value="Manger" />
							<Picker.Item label="Dormir" value="Dormir" />
							<Picker.Item label="Point de vue" value="Point de vue" />
							<Picker.Item label="Spot de surf" value="Surf Spot" />
						</Picker>

						<TextInput multiline={true} style={styles.inputDescription} placeholder="Description" value={description} onChangeText={(text) => setDescription(text)} />
						<View style={styles.buttonContainer}>
							<Button text="Valider" backgroundColor="#0084b4" color="white" height={60} width={250} fontSize={25} onPress={handleSaveChanges} />
						</View>
					</View>
				</View>
			</Modal>
			<FooterMenu />
		</View>
	);
};

const styles = {
	calloutContainer: {
		minWidth: 200,
		maxWidth: 300,
		minHeight: 200,
		justifyContent: 'space-between' as const,
	},
	topIcon: {
		flexDirection: 'row' as const,
		justifyContent: 'flex-end' as const,
		alignItems: 'center' as const,
		// backgroundColor: 'red',
		width: '140%' as const,
	},
	calloutContent: {
		flex: 1,
		paddingRight: 30,
		paddingLeft: 40,
		paddingBottom: 20,
		alignItems: 'center' as const,
		// backgroundColor: 'red',
		// justifyContent: 'flex-end',
		paddingTop: 5,
	},
	calloutTitle: {
		color: 'orange' as const,
		fontSize: 50,
		fontWeight: 'bold' as const,
		fontFamily: 'JustAnotherHand' as const,
		paddingBottom: 25,
	},
	icon: {
		width: 50,
		height: 50,
	},
	modalDate: {
		marginTop: 35,
		marginBottom: 25,
		fontWeight: 'bold' as const,
	},
	calloutDescription: {
		fontSize: 15,
		// fontFamily: 'JustAnotherHand',
		fontFamily: 'Montserrat' as const,
		marginBottom: 25,
	},
	coordinatesText: {
		color: '#0084b4' as const,
		paddingBottom: 10,
	},
	modalTitleContainer: {
		flex: 1,
		alignItems: 'center' as const,
		justifyContent: 'center' as const,
	},
	modalTitle: {
		alignItems: 'center' as const,
		justifyContent: 'center' as const,
		color: 'orange' as const,
		fontSize: 50,
		fontWeight: 'bold' as const,
		fontFamily: 'JustAnotherHand' as const,
		paddingTop: 50,
		paddingBottom: 70,
		flex: 1,
	},
	closingCross: {
		flexDirection: 'row' as const,
		alignItems: 'flex-start' as const,
		justifyContent: 'flex-end' as const,
	},
	closingCrossText: {
		fontSize: 30,
		fontWeight: 'bold' as const,
	},

	picker: {
		marginBottom: 10,
	},
	inputTitle: {
		marginTop: 50,
		padding: 10,
		borderColor: 'black' as const,
		borderWidth: 1,
		borderRadius: 5,
		textAlign: 'auto' as const,
	},
	inputDescription: {
		height: '20%' as const,
		padding: 10,
		borderColor: 'black' as const,
		borderWidth: 1,
		borderRadius: 5,
		textAlign: 'auto' as const,
	},
	buttonContainer: {
		paddingTop: 20,
		alignItems: 'center' as const,
	},
};

export default MapScreen;
