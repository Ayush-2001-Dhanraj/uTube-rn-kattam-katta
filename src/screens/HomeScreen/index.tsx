import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Button from '../../components/Button';
import {
  CIRCLE_LIGHT_IMG,
  CROSS_LIGHT_IMG,
  MODE,
  ModeToDescription,
} from '../../constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackList} from '../../App';
import SoundService from '../../SoundService';

const artworkLocations = [
  require('../../assets/images/circle_main.png'),
  require('../../assets/images/cross_main.png'),
];

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

type HomeScreenProps = NativeStackScreenProps<RootStackList, 'Home'>;

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [selectedMode, setSelectedMode] = useState<MODE>();

  const [artworks, setArtworks] = useState<any[]>([]);

  const handlePressStart = () => {
    if (SoundService.sounds['tap']) {
      SoundService.sounds['tap'].setVolume(1); // Set volume (0.0 to 1.0)
      SoundService.playSound('tap');
    }
    if (selectedMode) navigation.navigate('Game', {currentMode: selectedMode});
  };

  const handleChangeSelectedMode = (newMode: MODE) => {
    if (SoundService.sounds['tap']) {
      SoundService.sounds['tap'].setVolume(1); // Set volume (0.0 to 1.0)
      SoundService.playSound('tap');
    }
    setSelectedMode(newMode);
  };

  useEffect(() => {
    const tempArtworks = [];
    for (let index = 0; index < 40; index++) {
      const randomTop = Math.random() * screenHeight;
      const randomLeft = Math.random() * (screenWidth + 200);

      tempArtworks.push(
        <Image
          source={
            artworkLocations[
              Math.floor(Math.random() * artworkLocations.length)
            ]
          }
          style={[
            styles.artwork,
            {
              top: randomTop,
              left: randomLeft,
            },
          ]}
        />,
      );
    }
    setArtworks(tempArtworks);
  }, []);

  const modes = [
    {key: MODE.SINGLES, label: 'Single', style: styles.single},
    {key: MODE.MULTI, label: 'Multi', style: styles.multi},
    {key: MODE.AI_BOT, label: 'AI Bot', style: styles.ai},
    {key: MODE.BOT_MID, label: 'Medium Bot', style: styles.mid},
    {key: MODE.BOT_EASY, label: 'Easy Bot', style: styles.easy},
  ];

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapperContainer}>
          <View style={styles.mainContainer}>
            {/* Mode Selection Header */}
            <View style={styles.modeSelectionContainer}>
              <Button disabled text="Mode Selection" />
            </View>

            {/* Mode Buttons */}
            <View style={styles.modeBtnContainer}>
              {modes.map(mode => (
                <TouchableOpacity
                  key={mode.key}
                  style={[
                    styles.modeCard,
                    mode.style,
                    selectedMode === mode.key && styles.selectedMode,
                  ]}
                  onPress={() => handleChangeSelectedMode(mode.key)}>
                  <Text style={styles.modeTxt}>{mode.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Descriptor Section */}
            <View style={styles.descriptorContainer}>
              <Text style={styles.descriptor}>
                {!selectedMode
                  ? 'Select a mode'
                  : ModeToDescription[selectedMode]}
              </Text>
            </View>

            {/* Start Button */}
            <Button
              btnStyles={styles.startBtn}
              onPress={handlePressStart}
              text="Start"
              disabled={!selectedMode}
            />
          </View>
          <Image
            source={require('../../assets/images/claws_sample_3.png')}
            style={[styles.clawImage, styles.topClaw]}
          />
          <Image
            source={require('../../assets/images/claws_sample_3.png')}
            style={[styles.clawImage, styles.bottomClaw]}
          />
        </View>

        {/* Artwork Section */}
      </View>
      {artworks.map((artwork, index) =>
        React.cloneElement(artwork, {key: `artwork-${index}`}),
      )}
    </>
  );
};

export default HomeScreen;
