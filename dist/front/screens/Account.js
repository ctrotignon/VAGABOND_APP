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
const SecureStore = __importStar(require("expo-secure-store"));
const FooterMenu_1 = __importDefault(require("../components/FooterMenu"));
const CustomButton_1 = __importDefault(require("../components/CustomButton"));
const changePasswordModal_1 = __importDefault(require("../components/changePasswordModal"));
const native_1 = require("@react-navigation/native");
const Account = ({ setUserConnected }) => {
    const { navigate } = (0, native_1.useNavigation)();
    const [isModalVisible, setModalVisible] = (0, react_1.useState)(false);
    const [userData, setUserData] = (0, react_1.useState)(null);
    const [followerCount, setFollowerCount] = (0, react_1.useState)(0);
    const [followingCount, setFollowingCount] = (0, react_1.useState)(0);
    const getUserData = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = yield SecureStore.getItemAsync('token');
            if (!token) {
                console.error("Le token n'a pas été trouvé.");
                return;
            }
            const response = yield fetch(`${process.env.ADRESS}/user/getUserConnected`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const userInfos = yield response.json();
                console.log(userInfos);
                setUserData(userInfos);
                // console.log(userData?.username);
                console.log('test', userData);
                // Ajoute ici la logique pour informer l'utilisateur du succès
            }
            else {
                console.error('Erreur lors de la mise à jour du mot de passe');
                // Ajoute ici la logique pour informer l'utilisateur de l'échec
            }
        }
        catch (error) {
            console.error('Erreur de communication avec le serveur', error);
            // Ajoute ici la logique pour informer l'utilisateur de l'erreur
        }
    });
    const fetchFollowers = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const responseFollower = yield fetch(`${process.env.ADRESS}/follow/followersCount/${userData === null || userData === void 0 ? void 0 : userData.id}`);
            const responseFollowing = yield fetch(`${process.env.ADRESS}/follow/followingsCount/${userData === null || userData === void 0 ? void 0 : userData.id}`);
            // console.log(response.json());
            console.log(responseFollower.status);
            if (responseFollower.ok) {
                const dataFollower = yield responseFollower.json();
                const dataFollowing = yield responseFollowing.json();
                setFollowerCount(dataFollower);
                setFollowingCount(dataFollowing);
                console.log('Follower data', dataFollower);
                console.log('FollowING data', dataFollowing);
            }
        }
        catch (error) {
            console.error('Error fetching user data:', error);
        }
    });
    const fetchUserDataAndFollowers = () => __awaiter(void 0, void 0, void 0, function* () {
        yield getUserData();
        // Fetch followers only if postUserId is available
        if ((userData === null || userData === void 0 ? void 0 : userData.id) !== undefined) {
            yield fetchFollowers();
        }
    });
    (0, react_1.useEffect)(() => {
        fetchUserDataAndFollowers();
    }, [userData === null || userData === void 0 ? void 0 : userData.id]);
    const handleOpenModal = () => {
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
    };
    const handleLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield SecureStore.deleteItemAsync('token');
            yield SecureStore.deleteItemAsync('user_id');
            console.log('Cookie supprimé avec succès');
            navigate('Home');
            setUserConnected(false);
        }
        catch (error) {
            console.error('Erreur lors de la suppression du cookie :', error);
        }
    });
    const handleChangePassword = (currentPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = yield SecureStore.getItemAsync('token');
            if (!token) {
                console.error("Le token n'a pas été trouvé.");
                return;
            }
            const response = yield fetch(`${process.env.ADRESS}/user/updatePassword`, {
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
            }
            else {
                console.error('Erreur lors de la mise à jour du mot de passe');
            }
        }
        catch (error) {
            console.error('Erreur de communication avec le serveur', error);
        }
        handleCloseModal();
    });
    const handleDeleteAccount = () => __awaiter(void 0, void 0, void 0, function* () {
        react_native_1.Alert.alert('Confirmation', 'Êtes-vous sûr de vouloir supprimer votre compte ?', [
            {
                text: 'Annuler',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => __awaiter(void 0, void 0, void 0, function* () {
                    try {
                        const token = yield SecureStore.getItemAsync('token');
                        if (!token) {
                            console.error("Le token n'a pas été trouvé.");
                            return;
                        }
                        const response = yield fetch(`${process.env.ADRESS}/user/deleteUser`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        if (response.ok) {
                            yield SecureStore.deleteItemAsync('token');
                            navigate('Home');
                        }
                        else {
                            console.error("Erreur lors de la suppression de l'utilisateur :", response.status, response.statusText);
                        }
                    }
                    catch (error) {
                        console.error("Erreur lors de la suppression de l'utilisateur :", error);
                    }
                }),
            },
        ]);
    });
    return (<react_native_1.View style={{ flex: 1 }}>
			<react_native_1.View style={styleAccount.container}>
				<react_native_1.Image style={styleAccount.imageProfile} source={require('../assets/icons/add.png')}/>
				<react_native_1.Text style={styleAccount.username}>{userData === null || userData === void 0 ? void 0 : userData.username}</react_native_1.Text>
			</react_native_1.View>
			<react_native_1.View style={styleAccount.followContainer}>
				<react_native_1.Text style={styleAccount.followText}>Suiveurs: {followerCount} </react_native_1.Text>
				<react_native_1.Text style={styleAccount.followText}>Suivis : {followingCount}</react_native_1.Text>
			</react_native_1.View>
			<react_native_1.View style={styleAccount.buttonContainer}>
				<CustomButton_1.default text="Changer mot de passe" backgroundColor="#0084b4" color="white" width="60%" height={60} fontSize={15} onPress={handleOpenModal}/>
				<changePasswordModal_1.default isVisible={isModalVisible} onClose={handleCloseModal} onSubmit={handleChangePassword}/>
				<CustomButton_1.default text="Se déconnecter" backgroundColor="orange" color="white" width="60%" height={60} fontSize={15} onPress={handleLogout}/>
				<CustomButton_1.default text="Supprimer compte" backgroundColor="red" color="white" width="60%" height={60} fontSize={15} onPress={() => {
            handleDeleteAccount();
        }}/>
			</react_native_1.View>
			<FooterMenu_1.default />
		</react_native_1.View>);
};
const styleAccount = react_native_1.StyleSheet.create({
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
exports.default = Account;
