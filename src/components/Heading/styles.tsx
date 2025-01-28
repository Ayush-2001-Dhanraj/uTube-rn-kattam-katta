import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headingBox: {
    gap: 20,
  },
  headingTxt: {
    textAlign: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 4,
    textShadowRadius: 4,
    textShadowOffset: {
      height: 2,
      width: 2,
    },
  },
  headingContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default styles;
