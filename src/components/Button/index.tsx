import {View, Text, Pressable} from 'react-native';
import React from 'react';
import styles from './styles';

type ButtonProps = {
  text: string;
  fullWidth?: boolean;
  borderColor?: string;
  btnStyles?: any;
  btnTextStyles?: any;
};

const Button = ({
  text,
  fullWidth,
  borderColor,
  btnStyles,
  btnTextStyles,
}: ButtonProps) => {
  const handlePress = () => {
    console.log('Pressed');
  };
  return (
    <Pressable
      onPress={handlePress}
      style={[styles.btn, fullWidth && styles.fullWidthBtn, btnStyles]}>
      <Text style={[styles.btnText, btnTextStyles]}>{text}</Text>
    </Pressable>
  );
};

export default Button;
