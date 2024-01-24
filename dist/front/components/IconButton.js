"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const IconButton = ({ source, onPress, isActive, tintColor }) => {
    const containerStyle = [styleIconButton.container, isActive && styleIconButton.activeContainer];
    const imageStyle = [styleIconButton.image, isActive && styleIconButton.activeImage];
    if (tintColor) {
        imageStyle.push({ tintColor });
    }
    return (<react_native_1.TouchableOpacity onPress={onPress} style={containerStyle}>
			<react_native_1.Image style={imageStyle} source={source}/>
		</react_native_1.TouchableOpacity>);
};
const styleIconButton = react_native_1.StyleSheet.create({
    container: {
        padding: 10,
    },
    activeContainer: {
        backgroundColor: 'orange',
        borderRadius: 15,
    },
    image: {
        width: 30,
        height: 30,
    },
    activeImage: {
        tintColor: 'white',
    },
});
exports.default = IconButton;
