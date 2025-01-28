import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {MODE} from '../../constants';
import styles from './styles';

interface ActionSectionInterface {
  winner: string;
  currentMode: keyof typeof MODE;
  handleReset: () => void;
  handleNext: () => void;
}

const ActionSection = ({
  winner,
  currentMode,
  handleReset,
  handleNext,
}: ActionSectionInterface) => {
  return (
    <View style={styles.actionContainer}>
      {(currentMode === MODE.SINGLES || currentMode.includes('BOT')) && (
        <TouchableOpacity onPress={handleReset} style={styles.actionBtn}>
          <Text style={styles.actionTxt}>{winner ? 'Re-match' : 'Reset'}</Text>
        </TouchableOpacity>
      )}

      {currentMode === MODE.MULTI && (
        <>
          <TouchableOpacity
            onPress={handleReset}
            style={[styles.actionBtn, styles.altBtn]}>
            <Text style={[styles.actionTxt, styles.altTxt]}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!winner}
            onPress={handleNext}
            style={[styles.actionBtn, !winner && styles.disabledBtn]}>
            <Text style={styles.actionTxt}>Next</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ActionSection;
