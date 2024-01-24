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
const ChangePasswordModal = ({ isVisible, onClose, onSubmit }) => {
    const [currentPassword, setCurrentPassword] = (0, react_1.useState)('');
    const [newPassword, setNewPassword] = (0, react_1.useState)('');
    const handleSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        onSubmit(currentPassword, newPassword);
        onClose();
    });
    return (<react_native_1.Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
			<react_native_1.View style={styles.modalContainer}>
				<react_native_1.View style={styles.modalContent}>
					<react_native_1.TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<react_native_1.Text style={styles.closeButtonText}>&times;</react_native_1.Text>
					</react_native_1.TouchableOpacity>
					<react_native_1.Text style={styles.modalTitle}>Changer de mot de passe</react_native_1.Text>
					<react_native_1.TextInput style={styles.input} placeholder="Mot de passe actuel" secureTextEntry value={currentPassword} onChangeText={(text) => setCurrentPassword(text)}/>
					<react_native_1.TextInput style={styles.input} placeholder="Nouveau mot de passe" secureTextEntry value={newPassword} onChangeText={(text) => setNewPassword(text)}/>
					<CustomButton_1.default text="Valider" backgroundColor="#0084b4" color="white" height={60} width={250} fontSize={25} onPress={handleSubmit}/>
				</react_native_1.View>
			</react_native_1.View>
		</react_native_1.Modal>);
};
const styles = react_native_1.StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fefefe',
        padding: 20,
        width: '80%',
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    modalTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'orange',
        fontSize: 50,
        fontWeight: 'bold',
        fontFamily: 'JustAnotherHand',
        paddingTop: 50,
        paddingBottom: 70,
        // flex: 1,
    },
    input: {
        marginBottom: 40,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'auto',
        width: '90%',
        // backgroundColor: 'red',
    },
});
exports.default = ChangePasswordModal;
