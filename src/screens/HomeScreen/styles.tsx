import {StyleSheet} from 'react-native';
import COLORS from '../../colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: COLORS.primary,
    width: '90%',
    height: 500,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: COLORS.secondary,
    elevation: 8,
    shadowOffset: {
      height: -8,
      width: 4,
    },
    position: 'relative',
  },
});

export default styles;
