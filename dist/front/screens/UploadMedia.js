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
const ImagePicker = __importStar(require("expo-image-picker"));
const FileSystem = __importStar(require("expo-file-system"));
const aws_sdk_1 = require("aws-sdk");
const CustomButton_1 = __importDefault(require("../components/CustomButton"));
const FooterMenu_1 = __importDefault(require("../components/FooterMenu"));
const native_1 = require("@react-navigation/native");
const base64_js_1 = __importDefault(require("base64-js"));
const awsConfig = {
    region: 'eu-west-3',
    accessKeyId: 'AKIA2E2CWTVTUVJKOXNR',
    secretAccessKey: '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',
};
const s3 = new aws_sdk_1.S3(awsConfig);
const UploadMediaScreen = () => {
    const { navigate } = (0, native_1.useNavigation)();
    const [media, setMedia] = (0, react_1.useState)(null);
    const [mediaURL, setMediaURL] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            if (react_native_1.Platform.OS !== 'web') {
                const { status } = yield ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permission to access media library is required!');
                }
            }
        }))();
    }, []);
    const pickMedia = () => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            base64: true,
        });
        if (!result.canceled) {
            if (Array.isArray(result.assets) && result.assets.length > 0) {
                const fileUri = result.assets[0].uri;
                yield saveFileToS3(fileUri);
                setMedia(fileUri);
            }
            else if (typeof result.assets[0].uri === 'string') {
                const fileUri = result.assets[0].uri;
                yield saveFileToS3(fileUri);
                setMedia(fileUri);
            }
        }
    });
    (0, react_1.useEffect)(() => {
        if (mediaURL) {
            handlePost();
        }
    }, [mediaURL]);
    const handlePost = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = yield SecureStore.getItemAsync('token');
            if (!token) {
                console.error("Le token n'a pas été trouvé.");
                return;
            }
            if (!mediaURL) {
                console.error('mediaURL is null. Aborting post creation.');
                return;
            }
            const type = 'image';
            const response = yield fetch(`${process.env.ADRESS}/post/createPost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ type, mediaURL }),
            });
            const data = yield response.json();
            if (response.ok) {
                console.log('Image uploadé avec succès');
                react_native_1.Alert.alert('Cool !', 'La photo a été partagée avec succès.');
                navigate('HomeConnected');
            }
            else {
                console.log("Erreur lors de l'envoi des données au serveur");
                console.log('response', response);
                console.log('data', data);
            }
        }
        catch (error) {
            console.error('Erreur:', error.message);
        }
    });
    const saveFileToS3 = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const fileName = imagePath.split('/').pop();
            console.log('FILE NAME', fileName);
            const sanitizedFileName = fileName === null || fileName === void 0 ? void 0 : fileName.replace(/[^\w\d-.]/g, '');
            console.log('FILE NAME SANITIZE', sanitizedFileName);
            const fileUri = react_native_1.Platform.OS === 'android' ? imagePath : imagePath;
            const fileData = yield FileSystem.readAsStringAsync(fileUri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            const uint8Array = base64_js_1.default.toByteArray(fileData);
            const params = {
                Bucket: 'bucketvagabondaws',
                Key: sanitizedFileName || '',
                Body: uint8Array,
                ContentType: 'image/jpeg',
                ACL: 'public-read',
            };
            const response = yield s3.upload(params).promise();
            console.log('S3 Upload Response:', response);
            const objectURL = response.Location;
            setMediaURL(objectURL);
            console.log('File uploaded successfully to S3. URL:', objectURL);
        }
        catch (error) {
            console.error('Error uploading file to S3:', error);
        }
    });
    return (<react_native_1.View style={styles.container}>
			<react_native_1.ImageBackground source={require('../assets/images/upload.jpg')} resizeMode="cover" style={styles.image}>
				<react_native_1.View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
					<CustomButton_1.default text="Partage ta photo" color="white" backgroundColor="orange" width={250} height={75} fontSize={20} onPress={() => pickMedia()}/>
				</react_native_1.View>
				<FooterMenu_1.default />
			</react_native_1.ImageBackground>
		</react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
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
exports.default = UploadMediaScreen;
