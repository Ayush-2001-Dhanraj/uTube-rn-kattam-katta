import {Image, View} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import AppName from '../../components/AppName';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackList} from '../../App';
import SoundService from '../../SoundService';

type SplashScreenProps = NativeStackScreenProps<RootStackList, 'Splash'>;

const SplashScreen = ({navigation}: SplashScreenProps) => {
  useEffect(() => {
    setTimeout(() => {
      if (SoundService.sounds['splash']) {
        SoundService.sounds['splash'].setVolume(1); // Set volume (0.0 to 1.0)
        SoundService.playSound('splash');
      }
    }, 2500);

    setTimeout(() => {
      navigation.replace('Home');
    }, 3500);
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
      <Image
        source={require('../../assets/images/claws_sample_1.png')}
        style={[styles.clawImage, styles.topClaw]}
      />
      <Image
        source={require('../../assets/images/claws_sample_1.png')}
        style={[styles.clawImage, styles.bottomClaw]}
      />
    </>
  );
};

export default SplashScreen;
