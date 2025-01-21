import {Text} from 'react-native';
import React from 'react';
import styles from './styles';

type AppNameProps = {
  large?: boolean;
};

const AppName = ({large}: AppNameProps) => {
  return (
    <>
      <Text style={[styles.appName, large && styles.largeName]}>
        Kattam Katta
      </Text>
    </>
  );
};

export default AppName;
