import {View, Text, Pressable} from 'react-native';
import React from 'react';
import styles from './styles';

type ButtonProps = {
  text: string;
  fullWidth?: boolean;
  borderColor?: string;
  btnStyles?: any;
  btnTextStyles?: any;
  disabled?: boolean;
  onPress?: () => void;
};

const Button = ({
  text,
  fullWidth,
  btnStyles,
  btnTextStyles,
  disabled,
  onPress,
}: ButtonProps) => {
  const handlePress = () => {
    onPress?.();
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
      style={[styles.btn, fullWidth && styles.fullWidthBtn, btnStyles]}>
      <Text style={[styles.btnText, btnTextStyles]}>{text}</Text>
    </Pressable>
  );
};

export default Button;
