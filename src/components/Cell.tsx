import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import EntoTcon from 'react-native-vector-icons/Entypo';
import React from 'react';

type CellProps = {
  name: string;
  handlePress: () => void;
  disabled: boolean;
  fillColor: string;
};

const Cell = ({name, handlePress, disabled, fillColor}: CellProps) => {
  const options = ['circle', 'cross'];
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: fillColor}]}
      disabled={options.includes(name) || disabled}
      onPress={handlePress}>
      {options.includes(name) && (
        <EntoTcon size={50} color="#000" name={name} />
      )}
    </TouchableOpacity>
  );
};

export default Cell;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 100,
  },
});
