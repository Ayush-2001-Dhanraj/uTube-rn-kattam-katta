import {TouchableOpacity} from 'react-native';
import EntoTcon from 'react-native-vector-icons/Entypo';
import React from 'react';
import styles from './styles';
import normalize from '../../normalize';

type CellProps = {
  name: string;
  handlePress: () => void;
  disabled: boolean;
  fillColor: string;
  iconColor: string;
};

const Cell = ({
  name,
  handlePress,
  disabled,
  fillColor,
  iconColor,
}: CellProps) => {
  const options = ['circle', 'cross'];
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: fillColor}]}
      disabled={options.includes(name) || disabled}
      onPress={handlePress}>
      {options.includes(name) && (
        <EntoTcon size={normalize(40)} color={iconColor} name={name} />
      )}
    </TouchableOpacity>
  );
};

export default Cell;
