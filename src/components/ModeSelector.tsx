import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {MODE, ModeToDescription} from '../constants';

interface ModelSectorInterface {
  currentMode: MODE;
  modalVisible: boolean;
  onChangeMode: (key: keyof typeof MODE) => void;
  toggleModel: () => void;
}

const ModeSelector = ({
  currentMode,
  modalVisible,
  onChangeMode,
  toggleModel,
}: ModelSectorInterface) => {
  return (
    <Modal visible={modalVisible} transparent>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.modelHeading}>Mode Selection</Text>
          {Object.keys(MODE).map(key => (
            <TouchableOpacity
              onPress={() => onChangeMode(key as keyof typeof MODE)}
              style={[
                styles.modeBtn,
                currentMode === MODE[key as keyof typeof MODE] &&
                  styles.selectedMode,
              ]}
              key={key}>
              <Text style={styles.modeName}>{key}</Text>
              <Text style={styles.modeDescription}>
                {ModeToDescription[MODE[key as keyof typeof MODE]]}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.startBtn} onPress={toggleModel}>
            <Text style={styles.startTxt}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModeSelector;

const styles = StyleSheet.create({
  selectedMode: {
    elevation: 8,
    borderTopRightRadius: 50,
  },
  startTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'right',
  },
  startBtn: {
    backgroundColor: '#000',
    padding: 8,
    paddingHorizontal: 32,
    borderTopRightRadius: 50,
  },
  modelHeading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modeBtn: {
    flexDirection: 'row',
    width: '80%',
    gap: 10,
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#fff',
  },
  modeName: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 80,
  },
  modeDescription: {
    fontSize: 16,
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 8,
    elevation: 8,
    borderRadius: 8,
    gap: 10,
  },
  modalBackdrop: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
