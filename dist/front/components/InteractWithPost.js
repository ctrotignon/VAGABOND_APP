"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const LikesCounting_1 = __importDefault(require("./LikesCounting"));
const LikeButton_1 = __importDefault(require("./LikeButton"));
const Comment_1 = __importDefault(require("./Comment"));
const InteractWithPost = ({ initialLikes, onLikePress }) => {
    return (<react_native_1.View style={styles.container}>
			<react_native_1.View>
				<LikesCounting_1.default initialLikes={initialLikes}/>
			</react_native_1.View>
			<react_native_1.View style={styles.iconContainer}>
				<LikeButton_1.default initialLikes={initialLikes} onLikePress={onLikePress}/>
				<Comment_1.default />
			</react_native_1.View>
		</react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'red',
    },
});
exports.default = InteractWithPost;
