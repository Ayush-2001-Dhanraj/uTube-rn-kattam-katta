import {StyleSheet} from 'react-native';
import COLORS from './colors';

const styles = StyleSheet.create({
  app: {
    backgroundColor: COLORS.main,
    flex: 1,
    padding: 8,
    gap: 10,
    borderWidth: 4,
    borderColor: COLORS.secondary,
  },
});

export default styles;
