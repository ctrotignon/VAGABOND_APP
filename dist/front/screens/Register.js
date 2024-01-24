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
const TitleApp_1 = __importDefault(require("../components/TitleApp"));
const CustomButton_1 = __importDefault(require("../components/CustomButton"));
const IconButton_1 = __importDefault(require("../components/IconButton"));
const Register = ({ navigation, setUserConnected }) => {
    const fontScale = react_native_1.PixelRatio.getFontScale();
    const getFontSize = (size) => size / fontScale;
    const [formState, setFormState] = (0, react_1.useState)({
        username: '',
        email: '',
        password: '',
        confirmedPassword: '',
    });
    const [showPasswordMessage, setShowPasswordMessage] = (0, react_1.useState)(false);
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const [showConfirmPassword, setShowConfirmPassword] = (0, react_1.useState)(false);
    const [passwordValid, setPasswordValid] = (0, react_1.useState)(true);
    const handleInputChange = (name, value) => {
        setFormState(Object.assign(Object.assign({}, formState), { [name]: value }));
    };
    const checkPassword = (text) => {
        const isValid = validatePassword(text);
        setPasswordValid(isValid);
        setShowPasswordMessage(!isValid);
    };
    const setCookie = (key, data) => __awaiter(void 0, void 0, void 0, function* () {
        const cookie = yield SecureStore.setItemAsync(key, data);
        return cookie;
    });
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };
    const handleSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        const { username, email, password, confirmedPassword } = formState;
        if (!validateEmail(email)) {
            react_native_1.Alert.alert("Format d'email invalide");
            return;
        }
        if (!validatePassword(password)) {
            react_native_1.Alert.alert("Chouette ! Ton mot de passe devrait être une petite aventure en soi ! Assure-toi qu'il comporte au moins 8 caractères, incluant une majuscule, une minuscule, un chiffre, et même un petit caractère spécial pour le pimenter !");
            setPasswordValid(false);
            return;
        }
        if (password !== confirmedPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }
        try {
            const response = yield fetch(`${process.env.ADRESS}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password }),
            });
            const data = yield response.json();
            if (response.ok) {
                setCookie('token', data === null || data === void 0 ? void 0 : data.token);
                setFormState({
                    username: '',
                    email: '',
                    password: '',
                    confirmedPassword: '',
                });
                console.log('Formulaire soumis avec succès');
            }
            else {
                console.log("Erreur lors de l'envoi des données au serveur");
            }
            const cookie = yield SecureStore.getItemAsync('token');
            if (cookie) {
                setUserConnected(true);
                navigation.navigate('HomeConnected');
            }
        }
        catch (error) {
            console.error('Erreur:', error.message);
        }
    });
    const handlePasswordBlur = () => {
        setShowPasswordMessage(false);
    };
    return (<react_native_1.View style={styles.container}>
			<react_native_1.ImageBackground source={require('../assets/images/avion.jpg')} resizeMode="cover" style={styles.image}></react_native_1.ImageBackground>
			<TitleApp_1.default />
			<react_native_1.View style={styles.containerTitle}>
				<react_native_1.Text style={[{ fontSize: getFontSize(30) }, styles.title]}>Bienvenue !</react_native_1.Text>
				<react_native_1.Text style={[{ fontSize: getFontSize(25) }, styles.title]}>Inscris-toi, voyage, découvre.</react_native_1.Text>
			</react_native_1.View>
			<react_native_1.View style={styles.containerForm}>
				<react_native_1.TextInput style={[styles.input, { marginTop: 10 }]} autoCapitalize="none" placeholder="E-mail" placeholderTextColor="white" onChangeText={(text) => handleInputChange('email', text)} keyboardType="email-address"/>
				<react_native_1.TextInput style={styles.input} autoCapitalize="none" placeholder="Nom d'utilisateur" placeholderTextColor="white" onChangeText={(text) => handleInputChange('username', text)}/>
				<react_native_1.View style={styles.inputPasswordContainer}>
					<react_native_1.TextInput style={styles.inputPassword} autoCapitalize="none" placeholder="Mot de passe" placeholderTextColor="white" onChangeText={(text) => {
            handleInputChange('password', text);
            checkPassword(text);
        }} secureTextEntry={!showPassword} onFocus={() => {
            setPasswordValid(true);
            setShowPasswordMessage(false);
        }} onBlur={handlePasswordBlur}/>
					<IconButton_1.default source={showPassword ? require('../assets/icons/show.png') : require('../assets/icons/hide.png')} onPress={() => setShowPassword(!showPassword)} tintColor="white"/>
				</react_native_1.View>
				<react_native_1.View style={styles.messageContainer}>{showPasswordMessage && <react_native_1.Text style={styles.passwordBubbleText}>8 caractères minimum, une majuscule, une minuscule, un chiffre, et un caractère spécial</react_native_1.Text>}</react_native_1.View>
				<react_native_1.View style={[styles.inputPasswordContainer, { marginBottom: 30 }]}>
					<react_native_1.TextInput style={styles.inputPassword} autoCapitalize="none" placeholder="Confirmer Mot de passe" placeholderTextColor="white" onChangeText={(text) => {
            handleInputChange('confirmedPassword', text);
            checkPassword(text);
        }} secureTextEntry={!showConfirmPassword}/>
					<IconButton_1.default source={showConfirmPassword ? require('../assets/icons/show.png') : require('../assets/icons/hide.png')} onPress={() => setShowConfirmPassword(!showConfirmPassword)} tintColor="white"/>
				</react_native_1.View>
				{/* <TextInput style={[styles.input, { marginBottom: 30 }]} autoCapitalize="none" placeholder="Confirmer mot de passe" placeholderTextColor="white" onChangeText={(text) => handleInputChange('confirmedPassword', text)} secureTextEntry /> */}
				<CustomButton_1.default text="S'inscrire" width="80%" height={60} backgroundColor="#0084b4" color="white" fontSize={25} onPress={handleSubmit}/>
			</react_native_1.View>
		</react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    messageContainer: {
    // marginTop: 15,
    },
    container: {
        fontFamily: 'Montserrat',
        flex: 1,
        backgroundColor: 'white',
    },
    containerTitle: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        fontFamily: 'Montserrat',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerForm: {
        flex: 4,
        flexDirection: 'column',
        fontFamily: 'Montserrat',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    title: {
        flex: 0.5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'center',
        marginBottom: 20,
        color: '#0084b4',
    },
    input: {
        width: '72.5%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        marginTop: 30,
        borderRadius: 10,
        fontFamily: 'Montserrat',
        backgroundColor: 'rgba(0,0,0,0.4)',
        color: 'white',
        fontSize: 20,
    },
    inputPasswordContainer: {
        width: '72.5%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        marginTop: 30,
        borderRadius: 10,
        fontFamily: 'Montserrat',
        backgroundColor: 'rgba(0,0,0,0.4)',
        color: 'white',
        fontSize: 20,
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
        position: 'absolute',
    },
    passwordBubbleText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
exports.default = Register;
