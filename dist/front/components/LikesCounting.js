"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const LikesCounting = ({ initialLikes, userLikes }) => {
    return (<react_native_1.View style={styles.container}>
			{userLikes && initialLikes > 1 && (<react_native_1.Text style={styles.text}>
					Vous et {initialLikes - 1} {initialLikes - 1 === 1 ? 'personne aime' : 'personnes aiment'} ça
				</react_native_1.Text>)}
			{userLikes && initialLikes === 1 && <react_native_1.Text>Vous aimez ça</react_native_1.Text>}
			{!userLikes && initialLikes > 0 && (<react_native_1.Text style={styles.text}>
					{initialLikes} {initialLikes === 1 ? 'personne aime' : 'personnes aiment'} ça
				</react_native_1.Text>)}
			{!userLikes && initialLikes === 0 && <react_native_1.Text>Aucune personne n'aime ça</react_native_1.Text>}
		</react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
    },
    text: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
    },
});
exports.default = LikesCounting;
