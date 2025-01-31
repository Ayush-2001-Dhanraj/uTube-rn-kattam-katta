import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {
  CIRCLE_LIGHT_IMG,
  CROSS_LIGHT_IMG,
  MODE,
  MODE_LOGOS,
  ScoreInterface,
} from '../../constants';
import styles from './styles';

interface HeadingInterface {
  scores: ScoreInterface;
  round: number;
  currentMode: keyof typeof MODE;
  toggleModel?: () => void;
}

const Heading = ({scores, currentMode, round}: HeadingInterface) => {
  const modeData = MODE_LOGOS.find(x => x.key === currentMode);
  return (
    <View style={styles.headingContainer}>
      <View style={styles.headingBox}>
        <Image source={CIRCLE_LIGHT_IMG} style={styles.crisCross} />
        <Text style={styles.headingTxt}>
          {currentMode === MODE.MULTI && scores.circle}
        </Text>
      </View>
      <TouchableOpacity style={styles.headingBox} disabled onPress={() => {}}>
        <Text style={styles.heading}>Kattam Katta</Text>
        <View style={styles.modeLogoContainer}>
          <Image source={modeData?.left} style={styles.modeLogo} />
          <Text style={styles.vsTxt}>vs</Text>
          <Image
            source={modeData?.right}
            style={[
              styles.modeLogo,
              {
                transform: [
                  {
                    scale:
                      modeData?.key &&
                      [MODE.BOT_EASY, MODE.BOT_MID, MODE.AI_BOT].includes(
                        modeData?.key,
                      )
                        ? 1.5
                        : 1,
                  },
                ],
              },
            ]}
          />
        </View>
        {/* <Text style={styles.headingTxt}>{currentMode}</Text> */}
        {currentMode === MODE.MULTI && (
          <Text style={styles.headingTxt}>Round: {round}</Text>
        )}
      </TouchableOpacity>
      <View style={styles.headingBox}>
        <Image source={CROSS_LIGHT_IMG} style={styles.crisCross} />
        <Text style={styles.headingTxt}>
          {currentMode === MODE.MULTI && scores.cross}
        </Text>
      </View>
    </View>
  );
};

export default Heading;
