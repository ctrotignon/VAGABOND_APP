import React from 'react';
import { View, GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';

const CalloutMap: React.FC = () => {
	return (
		<View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, width: 'auto' }}>
			<Text style={styles.calloutTitle}>{marker.title}</Text>
			<View style={styles.callOutContent}>
				<Image source={getIconName(marker.type)} style={{ width: 50, height: 50 }} />
				<View>
					<Text style={styles.modalDate}>Le {date}</Text>
					<Text multiline={true} style={styles.callOutDescription}>
						{marker.description}
					</Text>
				</View>
			</View>
			<Text style={styles.coordinatesText}>
				Lat:{marker?.latitude}, Long:{marker?.longitude}
			</Text>
		</View>
	);
};

const styles = {
	modalTitleContainer: {
		flex: 1,
		alignItems: 'center' as const,
		justifyContent: 'center' as const,
	},
	modalTitle: {
		alignItems: 'center' as const,
		justifyContent: 'center' as const,
		color: 'orange' as const,
		fontSize: 50,
		fontWeight: 'bold' as const,
		fontFamily: 'JustAnotherHand' as const,
		paddingBottom: 70,
		flex: 1,
	},
	modalDate: {
		marginBottom: 10,
	},
	closingCross: {
		alignItems: 'flex-end' as const,
		justifyContent: 'center' as const,
	},
	closingCrossText: {
		fontSize: 30,
		fontWeight: 'bold' as const,
	},
	coordinatesText: {
		marginBottom: 10,
		color: '#0084b4' as const,
	},
	picker: {
		marginBottom: 10,
	},
	inputTitle: {
		marginTop: 50,
		padding: 10,
		borderColor: 'black' as const,
		borderWidth: 1,
		borderRadius: 5,
		textAlign: 'auto' as const,
	},
	inputDescription: {
		height: '20%' as const,
		padding: 10,
		borderColor: 'black' as const,
		borderWidth: 1,
		borderRadius: 5,
		textAlign: 'auto' as const,
	},
	buttonContainer: {
		paddingTop: 20,
		alignItems: 'center' as const,
	},
	calloutTitle: {
		alignItems: 'center' as const,
		justifyContent: 'center' as const,
		color: 'orange',
		fontSize: 10,
		fontWeight: 'bold' as const,
		fontFamily: 'JustAnotherHand' as const,
		paddingBottom: 10,
		flex: 1,
		width: 100,
	},
	callOutContent: {
		height: 150,
		width: '100%' as const,
		flexDirection: 'row' as const,
		alignItems: 'center' as const,
		justifyContent: 'space-evenly' as const,
		marginBottom: 20,
	},
	callOutDescription: {
		flexWrap: 'wrap' as const,
		fontWeight: 'bold' as const,
		width: 200,
		fontSize: 18,
	},
};

export default CalloutMap;
