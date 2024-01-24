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
const SecureStore = __importStar(require("expo-secure-store"));
const native_1 = require("@react-navigation/native");
const react_native_1 = require("react-native");
const LikeButton_1 = __importDefault(require("./LikeButton"));
const Comment_1 = __importDefault(require("./Comment"));
const LikesCounting_1 = __importDefault(require("./LikesCounting"));
const Post = ({ username, mediaPath, userImage, postId }) => {
    const [userId, setUserId] = (0, react_1.useState)(null);
    const { navigate } = (0, native_1.useNavigation)();
    const { name } = (0, native_1.useRoute)();
    const [likes, setLikes] = (0, react_1.useState)(0);
    const [liked, setLiked] = (0, react_1.useState)(false);
    const [usernameFetched, setUsernameFetched] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(true);
    const getUserId = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.ADRESS}/user/${username}`);
            if (response.ok) {
                const userID = yield response.json();
                setUserId(userID);
            }
            else {
                console.error("Erreur lors de la récupération de l'id de l'utilisateur");
            }
        }
        catch (error) {
            console.error('Erreur de communication avec le serveur', error);
        }
    });
    const getLikeByPost = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.ADRESS}/like/${postId}`);
            if (response.ok) {
                const likeCount = yield response.json();
                setLikes(likeCount.likeCount);
            }
            else {
                console.error('Erreur lors de la récupération du nombre de likes pour le post');
            }
        }
        catch (error) {
            console.error('Erreur de communication avec le serveur', error);
        }
    });
    const Like = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.ADRESS}/like/${postId}/${userId}`, {
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
            }
            else {
                console.error('Erreur lors de la requête de like');
            }
        }
        catch (error) {
            console.error('Erreur lors de la requête de like', error);
        }
    });
    const userAlreadyLikedPost = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userLikedResponse = yield fetch(`${process.env.ADRESS}/like/userLiked/${postId}/${userId}`);
            if (userLikedResponse.ok) {
                const userLikedData = yield userLikedResponse.json();
                setLiked(userLikedData.likeExists);
            }
            else {
                console.error("Erreur lors de la récupération de l'état 'liked' pour l'utilisateur");
            }
        }
        catch (error) {
            console.error('Erreur lors de la requête de suivi', error);
        }
    });
    const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield getUserId();
            yield getLikeByPost();
            yield userAlreadyLikedPost();
        }
        finally {
            setLoading(false);
        }
    });
    (0, react_1.useEffect)(() => {
        fetchData();
    }, []);
    const handleLikePress = () => __awaiter(void 0, void 0, void 0, function* () {
        yield getUserId();
        setLiked((prevLiked) => !prevLiked);
        liked ? setLikes((prevLikes) => prevLikes - 1) : setLikes((prevLikes) => prevLikes + 1);
        yield Like();
    });
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
                setUsernameFetched(userInfos.username);
            }
            else {
                console.error('Erreur lors de la mise à jour du mot de passe');
            }
        }
        catch (error) {
            console.error('Erreur de communication avec le serveur', error);
        }
    });
    const handleProfilPress = () => {
        getUserData();
        if (usernameFetched !== username) {
            navigate('UserProfile', { username });
        }
        else {
            navigate('Account');
        }
    };
    if (loading) {
        return <react_native_1.Text>Loading...</react_native_1.Text>;
    }
    return (<react_native_1.View style={stylePost.postContainer}>
			<react_native_1.View style={stylePost.postHeader}>
				<react_native_1.View style={stylePost.userContainer}>
					<react_native_1.TouchableOpacity onPress={handleProfilPress}>
						<react_native_1.Image style={stylePost.userImage} source={{ uri: userImage }}/>
					</react_native_1.TouchableOpacity>
					<react_native_1.TouchableOpacity onPress={handleProfilPress}>
						<react_native_1.Text style={stylePost.userText}>{username}</react_native_1.Text>
					</react_native_1.TouchableOpacity>
				</react_native_1.View>
			</react_native_1.View>
			<react_native_1.Image source={{ uri: mediaPath }} style={stylePost.postImage}/>
			<react_native_1.View>
				<LikesCounting_1.default initialLikes={likes}/>
				<react_native_1.View style={stylePost.iconContainer}>
					<LikeButton_1.default initialLikes={likes} onLikePress={handleLikePress}/>
					<Comment_1.default postId={postId}/>
				</react_native_1.View>
			</react_native_1.View>
		</react_native_1.View>);
};
const stylePost = react_native_1.StyleSheet.create({
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
exports.default = Post;
