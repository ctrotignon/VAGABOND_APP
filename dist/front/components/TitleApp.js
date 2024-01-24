"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const TitleApp = () => {
    const fontScale = react_native_1.PixelRatio.getFontScale();
    console.log(fontScale);
    const getFontSize = (size) => size / fontScale;
    return (<react_native_1.View style={styleTitleApp.container}>
			<react_native_1.Text style={styleTitleApp.text}>Vagabond</react_native_1.Text>
		</react_native_1.View>);
};
const styleTitleApp = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        flex: 1.5,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 90,
        fontFamily: 'JustAnotherHand',
        padding: 20,
        color: 'orange',
    },
});
exports.default = TitleApp;
