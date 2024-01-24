"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const CustomButton = ({ text, backgroundColor, color, fontSize, height, width, onPress }) => {
    return (<react_native_1.TouchableOpacity style={[styleButton.button, { backgroundColor }, { height }, { width }]} onPress={onPress}>
			<react_native_1.Text style={[styleButton.text, { color }, { fontSize }]}>{text}</react_native_1.Text>
		</react_native_1.TouchableOpacity>);
};
const styleButton = react_native_1.StyleSheet.create({
    button: {
        width: '80%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        marginBottom: 30,
        borderRadius: 50,
    },
    text: {
        fontFamily: 'Montserrat',
        fontSize: 25,
        fontWeight: 'bold',
    },
});
exports.default = CustomButton;
