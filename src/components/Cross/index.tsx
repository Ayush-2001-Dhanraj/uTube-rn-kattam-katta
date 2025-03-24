import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Cross = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/cross_main.png')}
      resizeMode="contain">
      <View style={styles.image} />
    </ImageBackground>
  );
};

export default Cross;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});
