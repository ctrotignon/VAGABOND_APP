import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Button from './CustomButton';

type ChangePasswordModalProps = {
	isVisible: boolean;
	onClose: () => void;
	onSubmit: (currentPassword: string, newPassword: string) => void;
};

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isVisible, onClose, onSubmit }) => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const handleSubmit = async () => {
		onSubmit(currentPassword, newPassword);
		onClose();
	};

	return (
		<Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<Text style={styles.closeButtonText}>&times;</Text>
					</TouchableOpacity>
					<Text style={styles.modalTitle}>Changer de mot de passe</Text>
					<TextInput style={styles.input} placeholder="Mot de passe actuel" secureTextEntry value={currentPassword} onChangeText={(text) => setCurrentPassword(text)} />
					<TextInput style={styles.input} placeholder="Nouveau mot de passe" secureTextEntry value={newPassword} onChangeText={(text) => setNewPassword(text)} />
					<Button text="Valider" backgroundColor="#0084b4" color="white" height={60} width={250} fontSize={25} onPress={handleSubmit} />
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
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

export default ChangePasswordModal;
