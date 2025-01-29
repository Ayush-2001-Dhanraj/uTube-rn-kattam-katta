import {StyleSheet} from 'react-native';
import COLORS from '../../colors';

const styles = StyleSheet.create({
  headingBox: {
    gap: 5,
  },
  headingTxt: {
    textAlign: 'center',
    color: COLORS.text,
    fontSize: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 4,
    color: COLORS.text,
    borderColor: COLORS.primary,
  },
  headingContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  crisCross: {
    height: 50,
    width: 50,
  },
  modeLogoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  modeLogo: {height: 50, width: 50},
  vsTxt: {
    color: COLORS.text,
  },
});

export default styles;
