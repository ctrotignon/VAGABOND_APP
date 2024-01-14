import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import FooterMenu from '../components/FooterMenu';

const Stack = createNativeStackNavigator();

type ImageMosaicScreenProps = {};

const Discover: React.FC<ImageMosaicScreenProps> = () => {
	const [images, setImages] = useState<string[]>([]);
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await fetch(`${process.env.ADRESS}/post/allMedias`);
				const fetchedImagesAPI = await response.json();
				setImages((previousImages) => [...previousImages, ...fetchedImagesAPI]);
			} catch (error) {
				console.error('Error fetching images:', error);
			}
		};
		fetchImages();
	}, [page]);

	const loadMoreImages = () => {
		setPage((previousPage) => previousPage + 1);
	};

	const renderItem = ({ item }: { item: string }) => <Image source={{ uri: item }} style={styles.image} />;

	return (
		<View style={styles.container}>
			<FlatList data={images} keyExtractor={(item, index) => index.toString()} renderItem={renderItem} numColumns={3} onEndReached={loadMoreImages} onEndReachedThreshold={0.1} />
			<FooterMenu />
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: Dimensions.get('window').width / 3,
		height: Dimensions.get('window').width / 3,
		margin: 1,
	},
});

export default Discover;
