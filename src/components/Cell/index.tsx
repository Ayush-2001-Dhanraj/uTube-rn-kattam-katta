import {TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import Circle from '../Circle';
import Cross from '../Cross';

type CellProps = {
  name: string;
  handlePress: () => void;
  disabled: boolean;
  fillColor: string;
  iconColor: string;
};

const Cell = ({name, handlePress, disabled, fillColor}: CellProps) => {
  const options = {circle: <Circle />, cross: <Cross />};
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: fillColor}]}
      disabled={name in options || disabled}
      onPress={handlePress}>
      {name in options ? options[name as keyof typeof options] : null}
    </TouchableOpacity>
  );
};

export default Cell;
