import {Image, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MODE} from '../../constants';
import styles from './styles';

interface ActionSectionInterface {
  winner: string;
  currentMode: keyof typeof MODE;
  handleReset: () => void;
  handleNext: () => void;
  artworks: any[];
}

const ActionSection = ({
  winner,
  currentMode,
  handleReset,
  handleNext,
  artworks,
}: ActionSectionInterface) => {
  const [transforms, setTransforms] = useState<Map<number, any>>(new Map());

  useEffect(() => {
    const newTransforms = new Map();
    artworks.forEach((_, index) => {
      // Only apply transform to new artworks that have not been assigned a transform yet
      if (!transforms.has(index)) {
        newTransforms.set(index, [{scale: Math.random() * 1.5 + 0.5}]);
      } else {
        newTransforms.set(index, transforms.get(index)); // Keep old artwork's transform
      }
    });

    setTransforms(newTransforms);
  }, [artworks]);

  return (
    <View style={styles.actionContainer}>
      <View style={styles.movesArtwork}>
        {artworks.map((artwork, index) => {
          return (
            <Image
              key={`actionSection_artwork_${index}`}
              source={artwork}
              style={{
                height: 50,
                width: 50,
                transform: transforms.get(index), // Use the stored transform for each artwork
              }}
            />
          );
        })}
      </View>

      {(currentMode === MODE.SINGLES || currentMode.includes('BOT')) && (
        <TouchableOpacity onPress={handleReset} style={styles.actionBtn}>
          <Text
            style={[styles.actionTxt, winner === 'Draw' && styles.drawBtnTxt]}>
            {winner ? 'Re-match' : 'Reset'}
          </Text>
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
