"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const IconButton_1 = __importDefault(require("./IconButton"));
const native_1 = require("@react-navigation/native");
const FooterMenu = () => {
    const { navigate } = (0, native_1.useNavigation)();
    const { name } = (0, native_1.useRoute)();
    return (<react_native_1.View style={styleFooter.container}>
			<IconButton_1.default source={require('../assets/icons/home.png')} onPress={() => {
            navigate('HomeConnected');
        }} isActive={name === 'HomeConnected'}/>
			<IconButton_1.default source={require('../assets/icons/search.png')} onPress={() => {
            navigate('Discover');
        }} isActive={name === 'Discover'}/>
			<IconButton_1.default source={require('../assets/icons/add.png')} onPress={() => {
            navigate('UploadMedia');
        }} isActive={name === 'UploadMedia'}/>
			<IconButton_1.default source={require('../assets/icons/map.png')} onPress={() => {
            navigate('Map');
        }} isActive={name === 'Map'}/>
			<IconButton_1.default source={require('../assets/icons/user.png')} onPress={() => {
            navigate('Account');
        }} isActive={name === 'Account'}/>
		</react_native_1.View>);
};
const styleFooter = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '10%',
        backgroundColor: 'white',
    },
});
exports.default = FooterMenu;
