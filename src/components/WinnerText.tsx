import {StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MODE, ScoreInterface} from '../constants';

interface WinnerTextInterface {
  winner: string;
  scores: ScoreInterface;
  currentMode: MODE;
}

const WinnerText = ({winner, scores, currentMode}: WinnerTextInterface) => {
  const [message, setMessage] = useState<string>('');

  const updateMessage = () => {
    if (winner === 'Draw') {
      setMessage(
        currentMode !== MODE.MULTI
          ? 'No one is the winner.'
          : 'Its is a Draw. Try again next round.',
      );
    } else if (scores.circle === scores.cross) {
      setMessage('Love All.');
    } else {
      if (currentMode !== MODE.MULTI) {
        setMessage(`${winner} is the winner.`);
      } else {
        let tempMessage = `${winner} won this round`;
        if (winner === 'cross') {
          tempMessage +=
            scores.cross > scores.circle
              ? ' and is leading.'
              : scores.cross < scores.circle
              ? ' but is trailing.'
              : '';
        } else if (winner === 'circle') {
          tempMessage +=
            scores.circle > scores.cross
              ? ' and is leading.'
              : scores.circle < scores.cross
              ? ' but is trailing.'
              : '';
        }
        setMessage(tempMessage);
      }
    }
  };

  useEffect(() => {
    updateMessage();
  }, [currentMode, winner, scores]);

  return <Text style={styles.winnerTxt}>{winner && message}</Text>;
};

export default WinnerText;

const styles = StyleSheet.create({
  winnerTxt: {
    textAlign: 'center',
    fontSize: 24,
  },
});
