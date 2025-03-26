import {
  Text,
  View,
  FlatList,
  Image,
  Animated,
  ImageBackground,
  Easing,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Cell from '../Cell';
import EntoTcon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import {BoardElement, MODE, ScoreInterface} from '../../constants';
import COLORS from '../../colors';
import WinnerText from '../WinnerText';

interface BoardInterface {
  boardElements: BoardElement[];
  winner: string;
  onPressCell: (index: number) => void;
  winningCombination: number[];
  isCross: boolean;
  disabled: boolean;
  currentMode: keyof typeof MODE;
  scores: ScoreInterface;
  currentHero: any;
  currentOtherHero: any;
  currentBot: any;
}

const Board = ({
  boardElements,
  winner,
  onPressCell,
  winningCombination,
  isCross,
  disabled,
  currentMode,
  scores,
  currentHero,
  currentOtherHero,
  currentBot,
}: BoardInterface) => {
  const generateRandomPosition = () => {
    const top = Math.random() * 150 - 100; // Random between -50 and 50
    const left = Math.random() * 100 - 50; // Random between -50 and 50
    const rotation = Math.random() * 30 - 15; // Random rotation between -15 and 15 degrees
    const scale = Math.random() * 0.5 + 0.5; // Random scale between 0.5 and 1.0
    return {top, left, rotation, scale};
  };

  const heroAnimAngle = useRef(new Animated.Value(0)).current;
  const otherHeroAnimAngle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!winner) {
      const animateCircularMotion = (animatedValue: Animated.Value) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: 100,
              duration: 8000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: -100,
              duration: 8000,
              easing: Easing.bounce,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: 100,
              duration: 8000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: -100,
              duration: 8000,
              easing: Easing.bounce,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: 100,
              duration: 8000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
          ]),
        ).start();
      };

      animateCircularMotion(heroAnimAngle);
      animateCircularMotion(otherHeroAnimAngle);
    } else {
      heroAnimAngle.stopAnimation();
      otherHeroAnimAngle.stopAnimation();
    }
  }, [winner]);

  const heroTranslateX = heroAnimAngle.interpolate({
    inputRange: [0, 90, 180, 270, 360],
    outputRange: [50, 0, -50, 0, 50],
  });

  const heroTranslateY = heroAnimAngle.interpolate({
    inputRange: [0, 90, 180, 270, 360],
    outputRange: [0, 50, 0, -50, 0],
  });

  const otherHeroTranslateX = otherHeroAnimAngle.interpolate({
    inputRange: [0, 90, 180, 270, 360],
    outputRange: [-50, 0, 50, 0, -50],
  });

  const otherHeroTranslateY = otherHeroAnimAngle.interpolate({
    inputRange: [0, 90, 180, 270, 360],
    outputRange: [0, -50, 0, 50, 0],
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginTop: 50,
      }}>
      <Animated.View
        style={[
          styles.heroImageContainer,
          {
            transform: [
              {translateX: heroTranslateX},
              {translateY: heroTranslateY},
            ],
          },
        ]}>
        <Image
          source={currentBot || currentOtherHero}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Floating Animated Other Hero Image */}
      <Animated.View
        style={[
          styles.otherHeroImageContainer,
          {
            transform: [
              {translateX: otherHeroTranslateX},
              {translateY: otherHeroTranslateY},
            ],
          },
        ]}>
        <Image
          source={currentHero}
          style={styles.otherHeroImage}
          resizeMode="contain"
        />
      </Animated.View>

      <View style={{alignItems: 'center'}}>
        {winningCombination.length ? (
          <AntIcon size={40} color={COLORS.primary} name="smile-circle" />
        ) : winner ? (
          <FA5Icon size={40} color={COLORS.secondary} name="sad-cry" />
        ) : (
          <EntoTcon
            size={40}
            color={COLORS.primary}
            name={isCross ? 'cross' : 'circle'}
          />
        )}
      </View>

      <View style={{alignItems: 'center', padding: 8}}>
        {winner ? (
          <Text style={styles.infoTxt}>
            {currentMode == MODE.MULTI ? 'Round Completed' : 'Game Over'}
          </Text>
        ) : (
          <Text style={styles.infoTxt}>
            {currentMode.includes('BOT') && !isCross
              ? 'Bot is thinking...'
              : isCross
              ? `Cross's turn${currentMode.includes('BOT') ? ' (You)' : ''}`
              : "Circle's Turn"}
          </Text>
        )}
      </View>

      <View style={styles.boardWrapper}>
        <FlatList
          numColumns={3}
          data={boardElements}
          keyExtractor={(_, index) => index as unknown as string}
          contentContainerStyle={styles.boardBox}
          columnWrapperStyle={styles.boardBox}
          renderItem={({item, index}) => {
            const fillColor =
              winner === 'Draw'
                ? COLORS.secondary
                : winningCombination.includes(index)
                ? COLORS.main
                : COLORS.primary;

            return (
              <Cell
                name={item}
                handlePress={() => {
                  onPressCell(index);
                }}
                disabled={!!winner || disabled}
                fillColor={fillColor}
                iconColor={
                  fillColor === COLORS.main ? COLORS.primary : COLORS.main
                }
              />
            );
          }}
        />
        <Image
          source={require('../../assets/images/claws_sample_1.png')}
          style={[styles.clawImage, styles.topClaw]}
        />
        <Image
          source={require('../../assets/images/claws_sample_3.png')}
          style={[styles.clawImage, styles.bottomClaw]}
        />
      </View>

      <WinnerText winner={winner} scores={scores} currentMode={currentMode} />

      {winner === 'Draw' && (
        <>
          {[...Array(15)].map((_, index) => {
            const {top, left, rotation, scale} = generateRandomPosition();
            return (
              <Image
                key={`claw-${index}`}
                source={require('../../assets/images/claws_sample_4.png')}
                style={[
                  styles.clawImage,
                  {
                    top: `${top}%`,
                    left: `${left + 10}%`,
                    transform: [{rotate: `${rotation}deg`}, {scale}],
                    zIndex: 100,
                  },
                ]}
              />
            );
          })}
        </>
      )}
    </View>
  );
};

export default Board;
