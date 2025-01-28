import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './styles';
import Button from '../../components/Button';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View
          style={{
            position: 'absolute',
            zIndex: 1000,
            top: -25,
            marginHorizontal: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <Button text="Mode Selection" />
        </View>
        <Button
          btnStyles={{
            position: 'absolute',
            zIndex: 1000,
            bottom: -20,
            right: -20,
          }}
          text="Start"
        />
      </View>
    </View>
  );
};

export default HomeScreen;
