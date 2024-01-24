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
const native_1 = require("@react-navigation/native");
const react_native_1 = require("react-native");
const CustomButton_1 = __importDefault(require("../components/CustomButton"));
const FollowButton_1 = __importDefault(require("../components/FollowButton"));
const FooterMenu_1 = __importDefault(require("../components/FooterMenu"));
const SecureStore = __importStar(require("expo-secure-store"));
const UserProfile = ({ route }) => {
    var _a;
    const navigation = (0, native_1.useNavigation)();
    const [postUserId, setpostUserId] = (0, react_1.useState)(undefined);
    const [userConnectedId, setUserConnectedId] = (0, react_1.useState)(undefined);
    const [followerCount, setFollowerCount] = (0, react_1.useState)(0);
    const [followingCount, setFollowingCount] = (0, react_1.useState)(0);
    const username = ((_a = route.params) === null || _a === void 0 ? void 0 : _a.username) || '';
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
                const data = yield response.json();
                setUserConnectedId(data === null || data === void 0 ? void 0 : data.id);
                fetchFollowers();
            }
            else {
                console.error("Erreur lors de la recupération de l'utilisateur connecté");
            }
        }
        catch (error) {
            console.error('Erreur de communication avec le serveur', error);
        }
    });
    const fetchPostUserData = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.ADRESS}/user/${username}`);
            if (response.ok) {
                const data = yield response.json();
                console.log('INTO FRONT USERNAME => ID ', data);
                setpostUserId(data);
            }
            else {
                console.error('Failed to fetch user data');
            }
        }
        catch (error) {
            console.error('Error fetching user data:', error);
        }
    });
    const fetchFollowers = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const responseFollower = yield fetch(`${process.env.ADRESS}/follow/followersCount/${postUserId}`);
            const responseFollowing = yield fetch(`${process.env.ADRESS}/follow/followingsCount/${postUserId}`);
            console.log(responseFollower.status);
            if (responseFollower.ok) {
                const dataFollower = yield responseFollower.json();
                const dataFollowing = yield responseFollowing.json();
                setFollowerCount(dataFollower);
                setFollowingCount(dataFollowing);
                console.log('Follower data user profil', dataFollower);
                console.log('FollowING data user profil', dataFollowing);
            }
        }
        catch (error) {
            console.error('Error fetching user data:', error);
        }
    });
    const fetchUserDataAndFollowers = () => __awaiter(void 0, void 0, void 0, function* () {
        yield fetchPostUserData();
        if (postUserId !== undefined) {
            yield fetchFollowers();
            yield fetchImages();
        }
    });
    const [images, setImages] = (0, react_1.useState)([]);
    const [page, setPage] = (0, react_1.useState)(1);
    const fetchImages = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.ADRESS}/post/${postUserId}`);
            const fetchedImagesAPI = yield response.json();
            setImages((previousImages) => [...previousImages, ...fetchedImagesAPI]);
        }
        catch (error) {
            console.error('Error fetching images:', error);
        }
    });
    const renderItem = ({ item }) => <react_native_1.Image source={{ uri: item }} style={userProfileStyle.image}/>;
    (0, react_1.useEffect)(() => {
        getUserData();
    }, []);
    (0, react_1.useEffect)(() => {
        fetchUserDataAndFollowers();
    }, [postUserId]);
    (0, react_1.useEffect)(() => {
        fetchImages();
    }, [page]);
    return (<react_native_1.View style={userProfileStyle.container}>
			<react_native_1.View style={{ flex: 1, alignItems: 'center' }}>
				<react_native_1.View style={{ flex: 1 }}>
					<react_native_1.Image style={userProfileStyle.imageProfile} source={require('../assets/icons/add.png')}/>
					<react_native_1.Text style={userProfileStyle.username}>{username}</react_native_1.Text>
				</react_native_1.View>

				<react_native_1.View style={userProfileStyle.followContainer}>
					<react_native_1.Text style={userProfileStyle.followText}>Suiveurs: {followerCount} </react_native_1.Text>
					<react_native_1.Text style={userProfileStyle.followText}>Suivi : {followingCount}</react_native_1.Text>
				</react_native_1.View>
				<react_native_1.View style={userProfileStyle.buttonContainer}>
					<FollowButton_1.default followerId={userConnectedId} followingId={postUserId} onPress={fetchFollowers}/>
					<CustomButton_1.default text="Message" color="white" backgroundColor="orange" width={150} fontSize={17}/>
				</react_native_1.View>
			</react_native_1.View>
			<react_native_1.View style={{ flex: 1.25 }}>
				<react_native_1.FlatList data={images} keyExtractor={(item, index) => index.toString()} renderItem={renderItem} numColumns={3}/>
			</react_native_1.View>

			<FooterMenu_1.default />
		</react_native_1.View>);
};
const userProfileStyle = react_native_1.StyleSheet.create({
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
        width: react_native_1.Dimensions.get('window').width / 3,
        height: react_native_1.Dimensions.get('window').width / 3,
        margin: 1,
    },
});
exports.default = UserProfile;
