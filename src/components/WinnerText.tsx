import {StyleSheet, Text} from 'react-native';
import React from 'react';

interface WinnerTextInterface {
  winner: string;
}

const WinnerText = ({winner}: WinnerTextInterface) => {
  return (
    <Text style={styles.winnerTxt}>
      {winner && `${winner === 'Draw' ? 'No one' : winner} is the winner.`}
    </Text>
  );
};

export default WinnerText;

const styles = StyleSheet.create({
  winnerTxt: {
    textAlign: 'center',
    fontSize: 24,
  },
});
