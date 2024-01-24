"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const LikeButton = ({ onLikePress }) => {
    return (<react_native_1.View style={styles.container}>
			<react_native_1.TouchableOpacity onPress={onLikePress}>
				<react_native_1.Image style={styles.image} source={require('../assets/icons/hand.png')}/>
			</react_native_1.TouchableOpacity>
		</react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {},
    image: {
        width: 50,
        height: 50,
    },
});
exports.default = LikeButton;
