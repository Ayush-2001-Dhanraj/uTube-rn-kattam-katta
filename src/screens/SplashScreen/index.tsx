import {Text, View, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import AppName from '../../components/AppName';

const SplashScreen = () => {
  return (
    <>
      <View style={styles.logoGifContainer}>
        <FastImage
          resizeMode="contain"
          style={styles.splashAnimation}
          source={require('../../assets/gifs/splash_logo_transparent.gif')}
        />
      </View>
      <AppName />
    </>
  );
};

export default SplashScreen;
