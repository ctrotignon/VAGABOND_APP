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
const native_stack_1 = require("@react-navigation/native-stack");
const FooterMenu_1 = __importDefault(require("../components/FooterMenu"));
const Stack = (0, native_stack_1.createNativeStackNavigator)();
const Discover = () => {
    const [images, setImages] = (0, react_1.useState)([]);
    const [page, setPage] = (0, react_1.useState)(1);
    (0, react_1.useEffect)(() => {
        const fetchImages = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${process.env.ADRESS}/post/allMedias`);
                const fetchedImagesAPI = yield response.json();
                setImages((previousImages) => [...previousImages, ...fetchedImagesAPI]);
            }
            catch (error) {
                console.error('Error fetching images:', error);
            }
        });
        fetchImages();
    }, [page]);
    const loadMoreImages = () => {
        setPage((previousPage) => previousPage + 1);
    };
    const renderItem = ({ item }) => <react_native_1.Image source={{ uri: item }} style={styles.image}/>;
    return (<react_native_1.View style={styles.container}>
			<react_native_1.FlatList data={images} keyExtractor={(item, index) => index.toString()} renderItem={renderItem} numColumns={3} onEndReached={loadMoreImages} onEndReachedThreshold={0.1}/>
			<FooterMenu_1.default />
		</react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: react_native_1.Dimensions.get('window').width / 3,
        height: react_native_1.Dimensions.get('window').width / 3,
        margin: 1,
    },
});
exports.default = Discover;
