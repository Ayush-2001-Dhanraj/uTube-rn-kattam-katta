import {StyleSheet} from 'react-native';
import COLORS from '../../colors';

const styles = StyleSheet.create({
  actionBtn: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 8,
    opacity: 1,
    borderWidth: 4,
    borderColor: COLORS.secondary,
  },
  actionContainer: {
    gap: 10,
    marginBottom: 20,
  },
  altTxt: {
    color: COLORS.primary,
  },
  altBtn: {
    backgroundColor: COLORS.main,
    borderWidth: 2,
    borderColor: COLORS.paper,
  },
  disabledBtn: {
    opacity: 0.7,
    borderWidth: 2,
  },
  actionTxt: {
    textAlign: 'center',
    color: COLORS.main,
    fontWeight: 'bold',
    fontSize: 20,
  },
  smallBtn: {
    flex: 0,
  },
  drawBtnTxt: {
    color: COLORS.secondary,
  },
});

export default styles;
