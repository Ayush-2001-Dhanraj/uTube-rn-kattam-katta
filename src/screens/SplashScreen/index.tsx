import {View} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import AppName from '../../components/AppName';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackList} from '../../App';

type SplashScreenProps = NativeStackScreenProps<RootStackList, 'Splash'>;

const SplashScreen = ({navigation}: SplashScreenProps) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 5000);
  }, []);

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
