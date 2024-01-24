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
exports.validatePassword = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const native_1 = require("@react-navigation/native");
const SecureStore = __importStar(require("expo-secure-store"));
const TitleApp_1 = __importDefault(require("../components/TitleApp"));
const CustomButton_1 = __importDefault(require("../components/CustomButton"));
const IconButton_1 = __importDefault(require("../components/IconButton"));
const image = {
    uri: 'https://images.unsplash.com/photo-1528150177508-7cc0c36cda5c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
exports.validatePassword = validatePassword;
const Login = ({ setUserConnected }) => {
    const navigation = (0, native_1.useNavigation)();
    const [username, setUsername] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        checkTokenAndNavigate();
    }, []);
    const setCookie = (key, data) => __awaiter(void 0, void 0, void 0, function* () {
        yield SecureStore.setItemAsync(key, data);
    });
    const checkTokenAndNavigate = () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield SecureStore.getItemAsync('token');
        if (token) {
            setUserConnected(true);
            navigation.navigate('HomeConnected');
        }
    });
    // const validateEmail = (email: string): boolean => {
    // 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // 	return emailRegex.test(email);
    // };
    const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!(0, exports.validatePassword)(password)) {
                react_native_1.Alert.alert('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.');
                return;
            }
            const response = yield fetch(`${process.env.ADRESS}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = yield response.json();
            if (response.ok) {
                yield setCookie('token', data === null || data === void 0 ? void 0 : data.token);
                console.log(SecureStore.getItemAsync('token'));
                setUserConnected(true);
                navigation.navigate('HomeConnected');
            }
            else {
                react_native_1.Alert.alert('Identifiants incorrects login');
            }
        }
        catch (error) {
            console.error('Erreur lors de la requête:', error);
            // Gestion des erreurs
        }
    });
    return (<react_native_1.View style={styles.container}>
			<react_native_1.ImageBackground source={{ uri: 'https://bucketvagabondaws.s3.eu-west-3.amazonaws.com/login1.jpg' }} resizeMode="cover" style={styles.image} onError={(error) => console.error('Image load error:', error.nativeEvent.error)}>
				<TitleApp_1.default />
				<react_native_1.View style={styles.containerForm}>
					<react_native_1.TextInput style={styles.input} autoCapitalize="none" placeholder="Pseudo" placeholderTextColor="white" value={username} onChangeText={(text) => setUsername(text)}/>
					<react_native_1.View style={styles.inputPasswordContainer}>
						<react_native_1.TextInput style={styles.inputPassword} autoCapitalize="none" placeholder="Mot de passe" placeholderTextColor="white" secureTextEntry={!showPassword} value={password} onChangeText={(text) => setPassword(text)}/>
						<IconButton_1.default source={showPassword ? require('../assets/icons/show.png') : require('../assets/icons/hide.png')} onPress={() => setShowPassword(!showPassword)} tintColor="white"/>
					</react_native_1.View>
					<CustomButton_1.default text="Se connecter" width="80%" height={60} backgroundColor="#0084b4" color="white" fontSize={25} onPress={handleLogin}/>
				</react_native_1.View>
			</react_native_1.ImageBackground>
		</react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerForm: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    input: {
        width: '70%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        marginBottom: 30,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        color: 'white',
        fontSize: 20,
    },
    inputPasswordContainer: {
        width: '70%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        marginBottom: 30,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
    },
    inputPassword: {
        color: 'white',
        fontSize: 20,
        width: '80%',
    },
    image: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});
exports.default = Login;
