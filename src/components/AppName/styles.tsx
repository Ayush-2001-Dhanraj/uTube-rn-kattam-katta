import {StyleSheet} from 'react-native';
import COLORS from '../../colors';
import normalize from '../../normalize';

const styles = StyleSheet.create({
  appName: {
    color: COLORS.text,
    textAlign: 'center',
    fontSize: normalize(20),
    fontWeight: '600',
    marginBottom: 20,
  },
  largeName: {
    fontSize: normalize(24),
  },
});

export default styles;
