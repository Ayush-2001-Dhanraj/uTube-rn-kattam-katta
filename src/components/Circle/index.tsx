import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Circle = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/circle_main.png')}
      resizeMode="contain">
      <View style={styles.image} />
    </ImageBackground>
  );
};

export default Circle;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});
