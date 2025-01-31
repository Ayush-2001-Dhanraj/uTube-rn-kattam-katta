import React, {useEffect} from 'react';
import {MODE} from './constants';
import styles from './App.styles';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import GameScreen from './screens/GameScreen';
import SoundService from './SoundService';
import {View} from 'react-native';

export type RootStackList = {
  Home: undefined;
  Splash: undefined;
  Game: {currentMode: MODE};
};

const Stack = createNativeStackNavigator<RootStackList>();

const App = () => {
  useEffect(() => {
    SoundService.loadSounds();
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            contentStyle: styles.app,
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
