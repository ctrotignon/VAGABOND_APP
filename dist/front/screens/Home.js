"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const native_1 = require("@react-navigation/native");
const CustomButton_1 = __importDefault(require("../components/CustomButton"));
const TitleApp_1 = __importDefault(require("../components/TitleApp"));
const HomeScreen = () => {
    const { navigate } = (0, native_1.useNavigation)();
    return (<react_native_1.View style={styles.container}>
			<react_native_1.ImageBackground source={{ uri: 'https://bucketvagabondaws.s3.eu-west-3.amazonaws.com/ballon.jpg' }} resizeMode="cover" style={styles.image}>
				<TitleApp_1.default />
				<react_native_1.View style={styles.containerForm}>
					<CustomButton_1.default text="Se connecter" width="80%" height={60} backgroundColor="#0084b4" color="white" fontSize={25} onPress={() => {
            navigate('Login');
        }}/>
					<CustomButton_1.default text="Créer un compte" width="80%" height={60} fontSize={25} backgroundColor="#000000ab" color="white" onPress={() => {
            navigate('Register');
        }}/>
				</react_native_1.View>
			</react_native_1.ImageBackground>
		</react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Montserrat',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerForm: {
        flex: 3,
        flexDirection: 'column',
        fontFamily: 'Montserrat',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});
exports.default = HomeScreen;
