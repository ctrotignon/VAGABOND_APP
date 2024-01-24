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
const CustomButton_1 = __importDefault(require("./CustomButton"));
const SecureStore = __importStar(require("expo-secure-store"));
const FollowButton = ({ followerId, followingId, onPress }) => {
    const [isFollowing, setIsFollowing] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const fetchIsFollowing = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const storedIsFollowing = yield SecureStore.getItemAsync('isFollowing');
                if (storedIsFollowing !== null) {
                    setIsFollowing(JSON.parse(storedIsFollowing));
                }
            }
            catch (error) {
                console.error('Erreur lors de la récupération de isFollowing depuis SecureStore', error);
            }
        });
        fetchIsFollowing();
    }, []);
    const handleToggleFollow = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!followingId) {
                console.error('Invalid followingId:', followingId);
                return;
            }
            const response = yield fetch(`${process.env.ADRESS}/follow/${followerId}/${followingId}`, {
                method: isFollowing ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    follower_user_id: followerId,
                    following_user_id: followingId,
                }),
            });
            if (response.ok) {
                setIsFollowing((prev) => !prev);
                yield SecureStore.setItemAsync('isFollowing', JSON.stringify(!isFollowing));
                onPress && onPress();
            }
            else {
                console.error('Erreur lors de la requête de suivi');
            }
        }
        catch (error) {
            console.error('Erreur lors de la requête de suivi', error);
        }
    });
    return (<react_native_1.View>
			<CustomButton_1.default text={isFollowing ? 'Ne plus suivre' : 'Suivre'} color="white" backgroundColor="#0084b4" width={150} fontSize={17} onPress={handleToggleFollow}/>
		</react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: '#3498db',
        borderRadius: 5,
    },
});
exports.default = FollowButton;
