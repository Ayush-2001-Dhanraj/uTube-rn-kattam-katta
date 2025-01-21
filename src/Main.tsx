import {SafeAreaView} from 'react-native';
import React from 'react';
import styles from './App.styles';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.app}></SafeAreaView>
    </NavigationContainer>
  );
};

export default Main;
