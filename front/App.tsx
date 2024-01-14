import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Home, Register, Login, HomeConnected, Discover, UploadMedia, Map, Account, UserProfile } from './screens';
import AuthMiddleware from './services/AuthMiddleware';
import { UserProfileProps } from './screens/UserProfile'; //

type AppProps = {};

export type ScreenNames = ['Home', 'Register', 'Login', 'HomeConnected', 'Discover', 'UploadMedia', 'Map', 'Account', 'UserProfile'];
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NativeStackNavigationProp<RootStackParamList>;
const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC<AppProps> = () => {
	const [fontsLoaded, setFontsLoaded] = useState(false);
	const [userConnected, setUserConnected] = useState(false);

	async function loadFonts() {
		await Font.loadAsync({
			Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
			JustAnotherHand: require('./assets/fonts/JustAnotherHand-Regular.ttf'),
		});
	}

	if (!fontsLoaded) {
		return <AppLoading startAsync={loadFonts} onFinish={() => setFontsLoaded(true)} onError={(error) => console.warn(error)} />;
	}

	return (
		<NavigationContainer>
			<AuthMiddleware>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Register">{(props) => <Register {...props} setUserConnected={setUserConnected} />}</Stack.Screen>
					<Stack.Screen name="Login">{(props) => <Login {...props} setUserConnected={setUserConnected} />}</Stack.Screen>
					{userConnected && (
						<>
							<Stack.Screen name="HomeConnected" component={HomeConnected} />
							<Stack.Screen name="Discover" component={Discover} />
							<Stack.Screen name="UploadMedia" component={UploadMedia} />
							<Stack.Screen name="Map" component={Map} />
							<Stack.Screen name="Account">{(props) => <Account {...props} setUserConnected={setUserConnected} />}</Stack.Screen>
							<Stack.Screen name="UserProfile">{(props: UserProfileProps) => <UserProfile {...props} />}</Stack.Screen>
						</>
					)}
				</Stack.Navigator>
			</AuthMiddleware>
		</NavigationContainer>
	);
};

export default App;
