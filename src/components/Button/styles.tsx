import {StyleSheet} from 'react-native';
import COLORS from '../../colors';
import normalize from '../../normalize';

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.main,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  fullWidthBtn: {
    width: '100%',
  },
  btnText: {
    fontSize: normalize(20),
    textAlign: 'center',
    color: COLORS.primary,
  },
});

export default styles;
