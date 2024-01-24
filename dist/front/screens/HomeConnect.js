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
const native_1 = require("@react-navigation/native");
const FooterMenu_1 = __importDefault(require("../components/FooterMenu"));
const Post_1 = __importDefault(require("../components/Post"));
const HomeConnected = () => {
    const [postsData, setPostsData] = (0, react_1.useState)([]);
    const flatListRef = (0, react_1.useRef)(null);
    const fetchPosts = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.ADRESS}/post/allPosts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                console.error('Error fetching posts:', response.statusText);
                return;
            }
            const data = yield response.json();
            console.log('DATA dazmùefmzrrl', data.posts.length);
            // Fetch usernames based on user_ids
            const usernamePromises = data.posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
                console.log('USER_ID', post.user_id);
                const userId = post.user_id;
                try {
                    const userResponse = yield fetch(`${process.env.ADRESS}/user/getUserById/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const userData = yield userResponse.json();
                    console.log('userData', userData);
                    if (userResponse.ok) {
                        return userData;
                    }
                    else {
                        console.error(`Error fetching user data for user ID ${userId}:`, userResponse.statusText);
                        return 'Utilisateur non trouvé';
                    }
                }
                catch (error) {
                    console.error('Error fetching user data:', error.message);
                    return 'Utilisateur non trouvé';
                }
            }));
            // Wait for all promises to be resolved
            const usernames = yield Promise.all(usernamePromises);
            const updatedPostsData = data.posts.map((post, index) => ({
                username: usernames[index],
                id: post.id,
                mediaPath: post.mediaURL,
                userImage: 'https://bucketvagabondaws.s3.eu-west-3.amazonaws.com/van.avif',
            }));
            setPostsData(updatedPostsData);
        }
        catch (error) {
            console.error('Erreur:', error.message);
        }
    });
    (0, react_1.useEffect)(() => {
        fetchPosts();
    }, []);
    (0, native_1.useFocusEffect)(react_1.default.useCallback(() => {
        fetchPosts();
        // if (flatListRef.current && postsData.length > 0) {
        // 	const initialScrollIndex = postsData.length - 1;
        // 	flatListRef.current.scrollToIndex({ index: initialScrollIndex, animated: true });
        // }
    }, []));
    return (<react_native_1.View style={styles.container}>
			<react_native_1.FlatList ref={flatListRef} style={styles.postList} data={postsData} keyExtractor={(item) => item.id.toString()} // Convert id to string for key
     renderItem={({ item }) => <Post_1.default username={item.username} mediaPath={item.mediaPath} userImage={item.userImage} postId={item.id} key={item.id.toString()}/>} inverted/>
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

			<FooterMenu_1.default />
		</react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
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
exports.default = HomeConnected;
