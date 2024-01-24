"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_maps_1 = __importStar(require("react-native-maps"));
const picker_1 = require("@react-native-picker/picker");
const FooterMenu_1 = __importDefault(require("../components/FooterMenu"));
const CustomButton_1 = __importDefault(require("../components/CustomButton"));
const IconButton_1 = __importDefault(require("../components/IconButton"));
const SecureStore = __importStar(require("expo-secure-store"));
const MapScreen = () => {
    const date = new Date().toLocaleDateString('en-GB');
    const [markers, setMarkers] = (0, react_1.useState)([]);
    const [markersByUser, setMarkersByUser] = (0, react_1.useState)([]);
    const [modalVisible, setModalVisible] = (0, react_1.useState)(false);
    const [title, setTitle] = (0, react_1.useState)('');
    const [type, setType] = (0, react_1.useState)('Food');
    const [description, setDescription] = (0, react_1.useState)('');
    const [selectedMarker, setSelectedMarker] = (0, react_1.useState)(null);
    const [isEditMode, setIsEditMode] = (0, react_1.useState)(false);
    const mapRef = (0, react_1.useRef)(null);
    const fetchAllMarkers = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = yield SecureStore.getItemAsync('token');
            const response = yield fetch(`${process.env.ADRESS}/marker/getAllMarkers`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = yield response.json();
                const fetchedMarkers = data.markers.map((marker) => ({
                    id: marker.id,
                    title: marker.title,
                    type: marker.type,
                    description: marker.description,
                    latitude: parseFloat(marker.latitude),
                    longitude: parseFloat(marker.longitude),
                    isUserMarker: false,
                }));
                setMarkers(fetchedMarkers);
            }
            else {
                console.error('Failed to fetch markers');
            }
        }
        catch (error) {
            console.error('Error fetching markers:', error);
        }
    });
    const fetchMarkersByUser = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = yield SecureStore.getItemAsync('token');
            const response = yield fetch(`${process.env.ADRESS}/marker/getMarkersByUser`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = yield response.json();
                const fetchedMarkers = data.markers.map((marker) => ({
                    id: marker.id,
                    title: marker.title,
                    type: marker.type,
                    description: marker.description,
                    latitude: parseFloat(marker.latitude),
                    longitude: parseFloat(marker.longitude),
                    isUserMarker: false,
                }));
                setMarkersByUser(fetchedMarkers);
            }
            else {
                console.error('Failed to fetch markers by user');
            }
        }
        catch (error) {
            console.error('Error fetching markers:', error);
        }
    });
    (0, react_1.useEffect)(() => {
        fetchAllMarkers();
        fetchMarkersByUser();
    }, []);
    const handleMapPress = (event) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { coordinate } = event.nativeEvent;
        const camera = yield ((_a = mapRef.current) === null || _a === void 0 ? void 0 : _a.getCamera());
        if (camera) {
            if (selectedMarker) {
                // Ferme le callout
                setSelectedMarker(null);
            }
            else {
                // Ouvre le modal
                setTitle('');
                setDescription('');
                setModalVisible(true);
            }
        }
    });
    const handleMarkerPress = (event, marker) => {
        event.stopPropagation();
        setSelectedMarker(marker);
    };
    const handleEditMarker = (marker) => __awaiter(void 0, void 0, void 0, function* () {
        setSelectedMarker(marker);
        setTitle(marker.title);
        setType(marker.type);
        setDescription(marker.description);
        setIsEditMode(true);
        setModalVisible(true);
    });
    const getIconName = (type) => {
        const iconMapping = {
            Manger: require('../assets/icons/restaurant.png'),
            Dormir: require('../assets/icons/sleeping.png'),
            'Point de vue': require('../assets/icons/eye.png'),
            'Surf Spot': require('../assets/icons/surfing.png'),
        };
        return iconMapping[type] || require('../assets/icons/question-mark.png');
    };
    const handleSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        if (!title || !description) {
            alert('Veuillez remplir tous les champs.');
            return;
        }
        const camera = yield ((_b = mapRef.current) === null || _b === void 0 ? void 0 : _b.getCamera());
        if (!camera) {
            console.error('La référence à la caméra est nulle.');
            return;
        }
        const region = yield camera.center;
        console.log(region.latitude);
        const newMarker = {
            id: markers.length + 1,
            title,
            type,
            description,
            latitude: region.latitude,
            longitude: region.longitude,
        };
        try {
            const token = yield SecureStore.getItemAsync('token');
            const response = yield fetch(`${process.env.ADRESS}/marker/createMarker`, {
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
                const responseData = yield response.json();
                console.log('Réponse du serveur :', responseData);
                fetchMarkersByUser();
                setModalVisible(false);
            }
            else {
                console.error('Échec de la requête POST');
                alert('Échec de la requête POST');
            }
        }
        catch (error) {
            console.error('Erreur lors de la requête POST', error);
            alert('Erreur lors de la requête POST');
        }
    });
    const handleUpdateMarker = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!selectedMarker) {
            alert('Aucun marqueur sélectionné.');
            return;
        }
        if (!title || !description) {
            alert('Veuillez remplir tous les champs.');
            return;
        }
        try {
            const token = yield SecureStore.getItemAsync('token');
            const response = yield fetch(`${process.env.ADRESS}/marker/updateMarker`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: selectedMarker === null || selectedMarker === void 0 ? void 0 : selectedMarker.id,
                    title,
                    type,
                    description,
                    latitude: selectedMarker === null || selectedMarker === void 0 ? void 0 : selectedMarker.latitude,
                    longitude: selectedMarker === null || selectedMarker === void 0 ? void 0 : selectedMarker.longitude,
                    token: token,
                }),
            });
            if (response.ok) {
                const responseData = yield response.json();
                console.log('Réponse du serveur :', responseData);
                // setMarkers((prevMarkers) => prevMarkers.map((marker) => (marker.id === selectedMarker?.id ? { ...marker, title, type, description } : marker)));
                setMarkers((prevMarkers) => prevMarkers.map((marker) => (selectedMarker && marker.id === selectedMarker.id ? Object.assign(Object.assign({}, selectedMarker), { title, type, description }) : marker)));
            }
            else {
                console.error('Échec de la requête PUT', response.statusText);
                alert('Échec de la requête PUT');
            }
        }
        catch (error) {
            console.error('Erreur lors de la requête PUT', error);
            alert('Erreur lors de la requête PUT');
        }
        finally {
            fetchMarkersByUser();
            setModalVisible(false);
            setIsEditMode(false);
        }
    });
    const handleDeleteMarker = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Selected Marker:', selectedMarker);
        if (!selectedMarker) {
            alert('Aucun marqueur sélectionné.');
            return;
        }
        try {
            const token = yield SecureStore.getItemAsync('token');
            console.log('SELECTED', selectedMarker);
            const response = yield fetch(`${process.env.ADRESS}/marker/deleteMarker/${selectedMarker.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const responseData = yield response.json();
                console.log('Réponse du serveur :', responseData);
                setMarkers((prevMarkers) => prevMarkers.filter((marker) => marker.id !== selectedMarker.id));
            }
            else {
                console.error('Échec de la requête DELETE in response');
                alert('Échec de la requête DELETE');
            }
        }
        catch (error) {
            console.error('Erreur lors de la requête DELETE', error);
            alert('Erreur lors de la requête DELETE');
        }
        finally {
            setModalVisible(false);
            fetchMarkersByUser();
        }
    });
    const closeModal = () => {
        fetchMarkersByUser();
        setModalVisible(false);
        setIsEditMode(false);
    };
    const handleSaveChanges = () => {
        if (isEditMode) {
            handleUpdateMarker();
        }
        else {
            handleSubmit();
        }
    };
    return (<react_native_1.View style={{ flex: 1 }}>
			<react_native_maps_1.default ref={mapRef} style={{ flex: 1 }} onPress={handleMapPress}>
				{markers.map((marker) => (<react_native_maps_1.Marker key={marker.id} coordinate={{ latitude: marker.latitude, longitude: marker.longitude }} onPress={(event) => handleMarkerPress(event, marker)}>
						<react_native_maps_1.Callout testID="marker-callout">
							<react_native_1.View style={styles.calloutContainer}>
								<react_native_1.View style={styles.calloutContent}>
									<react_native_1.Text style={styles.calloutTitle}>{marker.title}</react_native_1.Text>
									<react_native_1.Image source={getIconName(marker.type)} style={styles.icon}/>
									<react_native_1.View>
										<react_native_1.Text style={styles.modalDate}>Le {date}</react_native_1.Text>
										<react_native_1.Text style={styles.calloutDescription}>{marker.description}</react_native_1.Text>
									</react_native_1.View>
									<react_native_1.Text style={styles.coordinatesText}>
										Lat:{marker === null || marker === void 0 ? void 0 : marker.latitude}, Long:{marker === null || marker === void 0 ? void 0 : marker.longitude}
									</react_native_1.Text>
								</react_native_1.View>
							</react_native_1.View>
						</react_native_maps_1.Callout>
					</react_native_maps_1.Marker>))}
				{markersByUser.map((marker) => (<react_native_maps_1.Marker key={marker.id} coordinate={{ latitude: marker.latitude, longitude: marker.longitude }} onPress={(event) => handleMarkerPress(event, marker)}>
						<react_native_maps_1.Callout testID="marker-callout">
							<react_native_1.View style={styles.calloutContainer}>
								<react_native_1.View style={styles.calloutContent}>
									<react_native_1.View style={styles.topIcon}>
										<IconButton_1.default source={require('../assets/icons/edit.png')} tintColor="#0084b4" onPress={() => handleEditMarker(marker)}/>
										<IconButton_1.default source={{ uri: 'https://bucketvagabondaws.s3.eu-west-3.amazonaws.com/delete.png' }} tintColor="orange" onPress={() => handleDeleteMarker()}/>
									</react_native_1.View>
									<react_native_1.Text style={styles.calloutTitle}>{marker.title}</react_native_1.Text>
									<react_native_1.Image source={getIconName(marker.type)} style={styles.icon}/>
									<react_native_1.View>
										<react_native_1.Text style={styles.modalDate}>{date}</react_native_1.Text>
										<react_native_1.Text style={styles.calloutDescription}>{marker.description}</react_native_1.Text>
									</react_native_1.View>
									<react_native_1.Text style={styles.coordinatesText}>
										Lat:{marker === null || marker === void 0 ? void 0 : marker.latitude}, Long:{marker === null || marker === void 0 ? void 0 : marker.longitude}
									</react_native_1.Text>
								</react_native_1.View>
							</react_native_1.View>
						</react_native_maps_1.Callout>
					</react_native_maps_1.Marker>))}
			</react_native_maps_1.default>

			<react_native_1.Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={closeModal}>
				<react_native_1.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<react_native_1.View style={{ width: '85%', paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 20, paddingTop: 10 }}>
						<react_native_1.View style={styles.closingCross}>
							<react_native_1.TouchableOpacity onPress={closeModal}>
								<react_native_1.Text style={styles.closingCrossText}>&times;</react_native_1.Text>
							</react_native_1.TouchableOpacity>
						</react_native_1.View>
						<react_native_1.View style={styles.modalTitleContainer}>
							<react_native_1.Text style={styles.modalTitle}>Partage ta découverte</react_native_1.Text>
						</react_native_1.View>
						<react_native_1.TextInput style={styles.inputTitle} placeholder="Titre" value={title} onChangeText={(text) => setTitle(text)}/>
						<picker_1.Picker style={styles.picker} selectedValue={type} onValueChange={(itemValue) => setType(itemValue)}>
							<picker_1.Picker.Item label="Manger" value="Manger"/>
							<picker_1.Picker.Item label="Dormir" value="Dormir"/>
							<picker_1.Picker.Item label="Point de vue" value="Point de vue"/>
							<picker_1.Picker.Item label="Spot de surf" value="Surf Spot"/>
						</picker_1.Picker>

						<react_native_1.TextInput multiline={true} style={styles.inputDescription} placeholder="Description" value={description} onChangeText={(text) => setDescription(text)}/>
						<react_native_1.View style={styles.buttonContainer}>
							<CustomButton_1.default text="Valider" backgroundColor="#0084b4" color="white" height={60} width={250} fontSize={25} onPress={handleSaveChanges}/>
						</react_native_1.View>
					</react_native_1.View>
				</react_native_1.View>
			</react_native_1.Modal>
			<FooterMenu_1.default />
		</react_native_1.View>);
};
const styles = {
    calloutContainer: {
        minWidth: 200,
        maxWidth: 300,
        minHeight: 200,
        justifyContent: 'space-between',
    },
    topIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'red',
        width: '140%',
    },
    calloutContent: {
        flex: 1,
        paddingRight: 30,
        paddingLeft: 40,
        paddingBottom: 20,
        alignItems: 'center',
        // backgroundColor: 'red',
        // justifyContent: 'flex-end',
        paddingTop: 5,
    },
    calloutTitle: {
        color: 'orange',
        fontSize: 50,
        fontWeight: 'bold',
        fontFamily: 'JustAnotherHand',
        paddingBottom: 25,
    },
    icon: {
        width: 50,
        height: 50,
    },
    modalDate: {
        marginTop: 35,
        marginBottom: 25,
        fontWeight: 'bold',
    },
    calloutDescription: {
        fontSize: 15,
        // fontFamily: 'JustAnotherHand',
        fontFamily: 'Montserrat',
        marginBottom: 25,
    },
    coordinatesText: {
        color: '#0084b4',
        paddingBottom: 10,
    },
    modalTitleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'orange',
        fontSize: 50,
        fontWeight: 'bold',
        fontFamily: 'JustAnotherHand',
        paddingTop: 50,
        paddingBottom: 70,
        flex: 1,
    },
    closingCross: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    closingCrossText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    picker: {
        marginBottom: 10,
    },
    inputTitle: {
        marginTop: 50,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'auto',
    },
    inputDescription: {
        height: '20%',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'auto',
    },
    buttonContainer: {
        paddingTop: 20,
        alignItems: 'center',
    },
};
exports.default = MapScreen;
