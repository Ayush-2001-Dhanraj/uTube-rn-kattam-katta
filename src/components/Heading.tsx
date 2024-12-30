import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import EntoTcon from 'react-native-vector-icons/Entypo';
import React from 'react';
import {MODE, ScoreInterface} from '../constants';

interface HeadingInterface {
  scores: ScoreInterface;
  round: number;
  currentMode: MODE;
  toggleModel: () => void;
}

const Heading = ({
  scores,
  currentMode,
  toggleModel,
  round,
}: HeadingInterface) => {
  return (
    <View style={styles.headingContainer}>
      <View style={styles.headingBox}>
        <EntoTcon size={32} color="#000" name="cross" />
        <Text style={styles.headingTxt}>
          {currentMode === MODE.MULTI && scores.cross}
        </Text>
      </View>
      <TouchableOpacity style={styles.headingBox} onPress={toggleModel}>
        <Text style={styles.heading}>Kattam Katta</Text>
        <Text style={styles.headingTxt}>{currentMode}</Text>
        {currentMode === MODE.MULTI && (
          <Text style={styles.headingTxt}>Round: {round}</Text>
        )}
      </TouchableOpacity>
      <View style={styles.headingBox}>
        <EntoTcon size={32} color="#000" name="circle" />
        <Text style={styles.headingTxt}>
          {currentMode === MODE.MULTI && scores.circle}
        </Text>
      </View>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  headingBox: {
    gap: 20,
  },
  headingTxt: {
    textAlign: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 4,
    textShadowRadius: 4,
    textShadowOffset: {
      height: 2,
      width: 2,
    },
  },
  headingContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
