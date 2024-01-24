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
const CustomButton_1 = __importDefault(require("./CustomButton"));
const SecureStore = __importStar(require("expo-secure-store"));
const Comment = ({ postId }) => {
    const [comments, setComments] = (0, react_1.useState)([]);
    const [content, setcontent] = (0, react_1.useState)('');
    const [isModalVisible, setIsModalVisible] = (0, react_1.useState)(false);
    const commentListRef = (0, react_1.useRef)(null);
    const [likes, setLikes] = (0, react_1.useState)(420);
    const [liked, setLiked] = (0, react_1.useState)(false);
    const handleLikePress = () => {
        liked ? setLikes(likes - 1) : setLikes(likes + 1);
        setLiked(!liked);
    };
    const addComment = (postId, content) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield SecureStore.getItemAsync('token');
        try {
            const response = yield fetch(`${process.env.ADRESS}/comment/addComment`, {
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
                const data = yield response.json();
            }
        }
        catch (error) {
            console.error('Error sending comment:', error);
        }
    });
    const fetchCommentsFromDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.ADRESS}/comment/getComments/${postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = yield response.json();
            setComments(data);
        }
        catch (error) {
            console.error('Error fetching comments:', error);
        }
    });
    (0, react_1.useEffect)(() => {
        fetchCommentsFromDatabase();
    }, [postId]);
    (0, react_1.useEffect)(() => { }, [comments]);
    const handleSubmit = () => {
        var _a;
        if (content.trim() !== '') {
            const newComment = {
                id: comments.length + 1,
                // userName: ,
                content: content,
            };
            setComments([...comments, newComment]);
            setcontent('');
            addComment(postId, content);
            (_a = commentListRef.current) === null || _a === void 0 ? void 0 : _a.scrollToOffset({ animated: true, offset: 999999 });
        }
    };
    const openModal = () => {
        setIsModalVisible(true);
    };
    const closeModal = () => {
        setIsModalVisible(false);
    };
    return (<react_native_1.View style={styles.imageContainer}>
			<react_native_1.TouchableOpacity onPress={openModal}>
				<react_native_1.Image style={styles.image} source={require('../assets/icons/chat.png')}/>
			</react_native_1.TouchableOpacity>

			<react_native_1.Modal visible={isModalVisible} animationType="slide" transparent={false}>
				<react_native_1.View style={styles.modalContainer}>
					<react_native_1.TouchableOpacity onPress={closeModal} style={{ alignItems: 'flex-end' }}>
						<react_native_1.Text style={styles.closeButton}>&times;</react_native_1.Text>
					</react_native_1.TouchableOpacity>

					<react_native_1.FlatList ref={commentListRef} style={{ flex: 2, marginBottom: 20 }} data={comments} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (<react_native_1.View style={styles.commentItem}>
								{/* <Text>{item.userName}</Text> */}
								<react_native_1.Text>{item.content}</react_native_1.Text>
							</react_native_1.View>)} inverted/>
					<react_native_1.View style={styles.commentInputContainer}>
						<react_native_1.TextInput multiline={true} style={styles.commentInput} placeholder="Ajouter un commentaire..." value={content} onChangeText={(text) => setcontent(text)}/>

						<CustomButton_1.default text="Valider" color="white" backgroundColor="#0084b4" width={250} fontSize={20} onPress={handleSubmit}/>
					</react_native_1.View>
				</react_native_1.View>
			</react_native_1.Modal>
		</react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
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
exports.default = Comment;
