import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import EntoTcon from 'react-native-vector-icons/Entypo';
import {MODE, ModeToDescription} from '../../constants';
import SoundService from '../../SoundService';
import normalize from '../../normalize';

interface ModelSectorInterface {
  modalVisible: boolean;
  onChangeMode: (key: keyof typeof MODE) => void;
  toggleModel: () => void;
  canClose: boolean;
}

const ModeSelector = ({
  modalVisible,
  onChangeMode,
  toggleModel,
  canClose,
}: ModelSectorInterface) => {
  const [selectedMode, setSelectedMode] = useState<keyof typeof MODE>(
    MODE.BOT_EASY,
  );

  const handleOnPressStart = () => {
    if (SoundService.sounds['tap']) {
      SoundService.sounds['tap'].setVolume(1); // Set volume (0.0 to 1.0)
      SoundService.playSound('tap');
    }
    onChangeMode(selectedMode);
    toggleModel();
  };

  const handleModeChange = (newMode: keyof typeof MODE) => {
    if (SoundService.sounds['tap']) {
      SoundService.sounds['tap'].setVolume(1); // Set volume (0.0 to 1.0)
      SoundService.playSound('tap');
    }
    setSelectedMode(newMode);
  };

  return (
    <Modal visible={modalVisible} transparent animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.modelHeading}>Mode Selection</Text>
            {canClose && (
              <EntoTcon
                size={32}
                color="#000"
                name="circle-with-cross"
                onPress={toggleModel}
              />
            )}
          </View>
          {Object.keys(MODE).map(key => (
            <TouchableOpacity
              onPress={() => handleModeChange(key as keyof typeof MODE)}
              style={[
                styles.modeBtn,
                selectedMode === MODE[key as keyof typeof MODE] &&
                  styles.selectedMode,
              ]}
              key={key}>
              <Text style={styles.modeName}>{key}</Text>
              <Text style={styles.modeDescription}>
                {ModeToDescription[MODE[key as keyof typeof MODE]]}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.startBtn}
            onPress={handleOnPressStart}>
            <Text style={styles.startTxt}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModeSelector;

const styles = StyleSheet.create({
  titleSection: {flexDirection: 'row'},
  selectedMode: {
    elevation: 8,
    borderTopRightRadius: 50,
  },
  startTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: normalize(20),
    textAlign: 'right',
  },
  startBtn: {
    backgroundColor: '#000',
    padding: 8,
    paddingHorizontal: 32,
    borderTopRightRadius: 50,
  },
  modelHeading: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    flex: 1,
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
    fontSize: normalize(16),
    fontWeight: 'bold',
    width: 90,
  },
  modeDescription: {
    fontSize: normalize(16),
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
