import {StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {MODE, ScoreInterface} from '../../constants';

interface WinnerTextInterface {
  winner: string;
  scores: ScoreInterface;
  currentMode: keyof typeof MODE;
}

const WinnerText = ({winner, scores, currentMode}: WinnerTextInterface) => {
  const [message, setMessage] = useState<string>('');

  const getDrawMessage = () =>
    currentMode === MODE.MULTI
      ? 'It is a Draw. Try harder next round.'
      : 'No one is the winner.';

  const getWinnerMessage = () => {
    if (currentMode === MODE.MULTI) {
      const leadingText =
        scores.cross > scores.circle
          ? ' and is leading.'
          : scores.cross < scores.circle
          ? ' but is trailing.'
          : '';
      return `${winner} won this round${
        winner === 'cross' || winner === 'circle' ? leadingText : ''
      }`;
    }

    if (currentMode.includes('BOT')) {
      // assuming circle is the BOT
      if (scores.circle > scores.cross)
        return "It's a BOT's world and u are happy to be living in it!";
      else return 'You won this time.';
    }

    return `${winner} is the winner.`;
  };

  useEffect(() => {
    if (winner === 'Draw') {
      setMessage(getDrawMessage());
    } else if (scores.circle === scores.cross) {
      setMessage('Love All.');
    } else {
      setMessage(getWinnerMessage());
    }
  }, [currentMode, winner, scores]);

  return <Text style={styles.winnerTxt}>{winner && message}</Text>;
};

export default WinnerText;
