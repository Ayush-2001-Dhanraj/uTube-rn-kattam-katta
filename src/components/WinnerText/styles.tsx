import {StyleSheet} from 'react-native';
import COLORS from '../../colors';
import normalize from '../../normalize';

const styles = StyleSheet.create({
  winnerTxt: {
    textAlign: 'center',
    fontSize: normalize(20),
    color: COLORS.primary,
    marginTop: 10,
    backgroundColor: COLORS.text_secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  invisible: {
    opacity: 0,
  },
});

export default styles;
