import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  app: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
  heroImageContainer: {
    position: 'absolute',
    top: -50,
    right: 0,
    zIndex: 200,
  },

  otherHeroImageContainer: {
    position: 'absolute',
    top: -50,
    left: 0,
    zIndex: 200,
  },
});

export default styles;
