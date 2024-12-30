import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {MODE} from '../constants';

interface ActionSectionInterface {
  winner: string;
  currentMode: MODE;
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
      {currentMode === MODE.SINGLES && (
        <TouchableOpacity
          onPress={handleReset}
          style={[styles.actionBtn, styles.fullWidth]}>
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
            style={[
              styles.actionBtn,
              styles.fullWidth,
              !winner && styles.disabledBtn,
            ]}>
            <Text style={styles.actionTxt}>Next</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ActionSection;

const styles = StyleSheet.create({
  altTxt: {
    color: '#000',
  },
  altBtn: {
    backgroundColor: '#fff',
  },
  disabledBtn: {
    opacity: 0.7,
  },
  actionTxt: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  fullWidth: {
    flex: 1,
  },
  smallBtn: {
    flex: 0,
  },
  actionBtn: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
