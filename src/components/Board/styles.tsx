import {StyleSheet} from 'react-native';
import COLORS from '../../colors';

const styles = StyleSheet.create({
  boardBox: {
    gap: 4,
  },
  infoTxt: {
    fontSize: 20,
    color: COLORS.primary,
    zIndex: 1,
    fontWeight: 'bold',
  },
  clawImage: {
    height: 250,
    width: 250,
    position: 'absolute',
    zIndex: -2,
  },
  topClaw: {top: -65, left: -65},
  bottomClaw: {
    bottom: -65,
    right: -65,
    transform: [{rotate: '180deg'}],
  },
});

export default styles;
