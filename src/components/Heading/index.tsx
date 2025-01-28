import {Text, View, TouchableOpacity} from 'react-native';
import EntoTcon from 'react-native-vector-icons/Entypo';
import React from 'react';
import {MODE, ScoreInterface} from '../../constants';
import styles from './styles';

interface HeadingInterface {
  scores: ScoreInterface;
  round: number;
  currentMode: keyof typeof MODE;
  toggleModel?: () => void;
}

const Heading = ({scores, currentMode, round}: HeadingInterface) => {
  return (
    <View style={styles.headingContainer}>
      <View style={styles.headingBox}>
        <EntoTcon size={32} color="#000" name="cross" />
        <Text style={styles.headingTxt}>
          {currentMode === MODE.MULTI && scores.cross}
        </Text>
      </View>
      <TouchableOpacity style={styles.headingBox} onPress={() => {}}>
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
