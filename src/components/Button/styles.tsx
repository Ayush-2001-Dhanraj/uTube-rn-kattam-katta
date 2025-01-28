import {StyleSheet} from 'react-native';
import COLORS from '../../colors';

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
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.primary,
  },
});

export default styles;
