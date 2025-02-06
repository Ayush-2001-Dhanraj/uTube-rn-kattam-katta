import {StyleSheet} from 'react-native';
import COLORS from '../../colors';
import normalize from '../../normalize';

const styles = StyleSheet.create({
  winnerTxt: {
    textAlign: 'center',
    fontSize: normalize(20),
    color: COLORS.primary,
    marginTop: 10,
  },
});

export default styles;
