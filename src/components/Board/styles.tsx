import {StyleSheet} from 'react-native';
import COLORS from '../../colors';
import normalize from '../../normalize';

const styles = StyleSheet.create({
  boardBox: {
    gap: 4,
  },
  boardWrapper: {
    backgroundColor: COLORS.secondary,
    padding: 4,
    height: 300,
    width: 300,
    elevation: 8,
    position: 'relative',
  },
  infoTxt: {
    fontSize: normalize(20),
    color: COLORS.primary,
    zIndex: 1,
    fontWeight: 'bold',
  },
  clawImage: {
    height: 250,
    width: 250,
    position: 'absolute',
    zIndex: -1,
  },
  topClaw: {top: -65, left: -65},
  bottomClaw: {
    bottom: -65,
    right: -65,
    transform: [{rotate: '180deg'}],
  },
});

export default styles;
