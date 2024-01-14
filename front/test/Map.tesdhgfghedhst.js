// // import React from 'react';
// // import { render, waitFor } from '@testing-library/react-native';
// // import MapScreen from '../screens/MapScreen'; // Assure-toi que le chemin d'accès est correct
// // import MockNavigationContainer from './MockNavigationContainer';

// // // Mock des dépendances nécessaires (SecureStore, fetch, etc.)
// // jest.mock('@react-native-picker/picker');
// // jest.mock('expo-secure-store', () => ({
// // 	getItemAsync: jest.fn(),
// // }));

// // // Mock de la fonction fetch
// // const mockedFetch = jest.spyOn(global, 'fetch');

// // mockedFetch.mockResolvedValue({
// // 	ok: true,
// // 	json: () => Promise.resolve({ markers: [] }),
// // } as Response);

// // describe('<Map />', () => {
// // 	it('should fetch markers and render them correctly', async () => {
// // 		const mockMarkers = [
// // 			{
// // 				id: 1,
// // 				title: 'Test Marker 1',
// // 				type: 'Food',
// // 				description: 'This is a test marker',
// // 				latitude: 37.7749,
// // 				longitude: -122.4194,
// // 			},
// // 			{
// // 				id: 2,
// // 				title: 'Test Marker 2',
// // 				type: 'Sleep',
// // 				description: 'Another test marker',
// // 				latitude: 37.7749,
// // 				longitude: -122.4194,
// // 			},
// // 		];

// // 		// Mock de la réponse de la requête fetch
// // 		mockedFetch.mockResolvedValueOnce({
// // 			ok: true,
// // 			json: () => Promise.resolve({ markers: mockMarkers }),
// // 		} as Response);

// // 		// Rendu du composant avec les données simulées
// // 		const { getByTestId } = render(
// // 			(
// // 				<MockNavigationContainer>
// // 					<MapScreen />
// // 				</MockNavigationContainer>
// // 			) as React.ReactElement<any>
// // 		);
// // 		// Attendez que la fonction fetch soit appelée
// // 		await waitFor(() => expect(mockedFetch).toHaveBeenCalled());

// // 		// Vérifiez que les marqueurs sont correctement rendus
// // 		mockMarkers.forEach((marker) => {
// // 			const callout = getByTestId(`marker-callout-${marker.id}`);
// // 			expect(callout).toBeTruthy();
// // 			expect(callout.props.children.props.children[0].props.children).toBe(marker.title);
// // 			expect(callout.props.children.props.children[2].props.children[1].props.children).toBe(marker.description);
// // 		});

// // 		// Vérifiez qu'aucun autre élément n'est rendu
// // 		expect(() => getByTestId('map-view')).toThrow();
// // 		expect(() => getByTestId('some-other-element')).toThrow();
// // 	});
// // });
// // import React from 'react';
// // import { render, waitFor } from '@testing-library/react-native';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';

// // import MapScreen from '../screens/MapScreen'; // Assure-toi que le chemin d'accès est correct
// // import MockNavigationContainer from './MockNavigationContainer';

// // // Mock des dépendances nécessaires (SecureStore, fetch, etc.)
// // jest.mock('@react-native-picker/picker');
// // jest.mock('expo-secure-store', () => ({
// // 	getItemAsync: jest.fn(),
// // }));

// // // Mock de la fonction fetch
// // const mockedFetch = jest.spyOn(global, 'fetch');

// // // Espionne la fonction fetch avant de la remplacer
// // beforeAll(() => {
// // 	mockedFetch.mockImplementation(() =>
// // 		Promise.resolve({
// // 			ok: true,
// // 			json: () => Promise.resolve({ markers: mockMarkers }),
// // 		})
// // 	);
// // });

// // // N'oublie pas de restaurer la fonction fetch après les tests
// // afterAll(() => {
// // 	mockedFetch.mockRestore();
// // });

// // const Stack = createStackNavigator();

// // describe('<Map />', () => {
// // 	it('should fetch markers and render them correctly', async () => {
// // 		const mockMarkers = [
// // 			{
// // 				id: 1,
// // 				title: 'Test Marker 1',
// // 				type: 'Food',
// // 				description: 'This is a test marker',
// // 				latitude: 37.7749,
// // 				longitude: -122.4194,
// // 			},
// // 			{
// // 				id: 2,
// // 				title: 'Test Marker 2',
// // 				type: 'Sleep',
// // 				description: 'Another test marker',
// // 				latitude: 37.7749,
// // 				longitude: -122.4194,
// // 			},
// // 		];

// // 		// Mock de la réponse de la requête fetch
// // 		mockedFetch.mockResolvedValueOnce({
// // 			ok: true,
// // 			json: () => Promise.resolve({ markers: mockMarkers }),
// // 		});

// // 		// Rendu du composant avec les données simulées
// // 		const { getByTestId } = render(
// // 			<NavigationContainer>
// // 				<MockNavigationContainer>
// // 					<Stack.Screen name="Map" component={MapScreen} />
// // 				</MockNavigationContainer>
// // 			</NavigationContainer>
// // 		);

// // 		// Attendez que la fonction fetch soit appelée
// // 		await waitFor(() => expect(mockedFetch).toHaveBeenCalled());

// // 		// Vérifiez que les marqueurs sont correctement rendus
// // 		mockMarkers.forEach((marker) => {
// // 			const callout = getByTestId(`marker-callout-${marker.id}`);
// // 			expect(callout).toBeTruthy();
// // 			expect(callout.props.children.props.children[0].props.children).toBe(marker.title);
// // 			expect(callout.props.children.props.children[2].props.children[1].props.children).toBe(marker.description);
// // 		});

// // 		// Vérifiez qu'aucun autre élément n'est rendu
// // 		expect(() => getByTestId('map-view')).toThrow();
// // 		expect(() => getByTestId('some-other-element')).toThrow();
// // 	});
// // });
// import React from 'react';
// import { render, waitFor } from '@testing-library/react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// // ... autres imports ...

// jest.useFakeTimers();

// const Stack = createStackNavigator();

// describe('<Map />', () => {
// 	it('should fetch markers and render them correctly', async () => {
// 		const mockMarkers = [
// 			// ... tes marqueurs simulés ...
// 		];

// 		const originalFetch = global.fetch;

// 		beforeEach(() => {
// 			global.fetch = jest.fn(() =>
// 				Promise.resolve({
// 					ok: true,
// 					json: () => Promise.resolve({ markers: mockMarkers }),
// 				})
// 			);
// 		});

// 		afterEach(() => {
// 			global.fetch = originalFetch;
// 		});

// 		// Rendu du composant avec les données simulées
// 		const { getByTestId } = render(
// 			<NavigationContainer>
// 				<MockNavigationContainer>
// 					<Stack.Screen name="Map" component={MapScreen} />
// 				</MockNavigationContainer>
// 			</NavigationContainer>
// 		);

// 		// Attendez que la fonction fetch soit appelée
// 		await waitFor(() =>
// 			expect(global.fetch).toHaveBeenCalledWith('http://localhost:443/marker/getAllMarkers', {
// 				method: 'GET',
// 				headers: {
// 					Authorization: 'Bearer mockToken', // Remplace cela par la valeur attendue
// 				},
// 			})
// 		);

// 		// ... le reste de ton test pour vérifier le rendu des marqueurs ...
// 	});
// });
