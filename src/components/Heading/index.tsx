import {Text, View, TouchableOpacity, Image} from 'react-native';
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

const modeLogos = [
  {
    key: MODE.SINGLES,
    left: require('../../assets/images/single_usser4.png'),
    right: require('../../assets/images/single_usser4.png'),
  },
  {
    key: MODE.MULTI,
    left: require('../../assets/images/multi_user.png'),
    right: require('../../assets/images/multi_user.png'),
  },
  {
    key: MODE.AI_BOT,
    left: require('../../assets/images/single_usser4.png'),
    right: require('../../assets/images/ai_bot.png'),
  },
  {
    key: MODE.BOT_MID,
    left: require('../../assets/images/single_usser4.png'),
    right: require('../../assets/images/mid_bot.png'),
  },
  {
    key: MODE.BOT_EASY,
    left: require('../../assets/images/single_usser4.png'),
    right: require('../../assets/images/easy_bot.png'),
  },
];

const Heading = ({scores, currentMode, round}: HeadingInterface) => {
  const modeData = modeLogos.find(x => x.key === currentMode);
  return (
    <View style={styles.headingContainer}>
      <View style={styles.headingBox}>
        <Image
          source={require('../../assets/images/circle.png')}
          style={styles.crisCross}
        />
        <Text style={styles.headingTxt}>
          {currentMode === MODE.MULTI && scores.cross}
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
        <Image
          source={require('../../assets/images/cross.png')}
          style={styles.crisCross}
        />
        <Text style={styles.headingTxt}>
          {currentMode === MODE.MULTI && scores.circle}
        </Text>
      </View>
    </View>
  );
};

export default Heading;
