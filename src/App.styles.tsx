import {StyleSheet} from 'react-native';
import COLORS from './colors';

const styles = StyleSheet.create({
  container: {
    borderWidth: 6,
    borderColor: COLORS.secondary,
    flex: 1,
  },
  app: {
    backgroundColor: COLORS.main,
    flex: 1,
    gap: 10,
    position: 'relative',
    // padding: 10,
  },
});

export default styles;
