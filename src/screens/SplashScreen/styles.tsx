import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  splashAnimation: {
    height: 100,
    width: 100,
  },
  logoGifContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clawImage: {
    height: 250,
    width: 250,
    position: 'absolute',
    zIndex: -2,
  },
  topClaw: {top: -65, left: -65},
  bottomClaw: {
    bottom: -65,
    right: -65,
    transform: [{rotate: '180deg'}],
  },
});

export default styles;
