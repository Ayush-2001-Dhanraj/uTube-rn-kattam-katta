import {Dimensions, StyleSheet} from 'react-native';
import COLORS from '../../colors';
import normalize from '../../normalize';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperContainer: {
    position: 'relative',
  },
  mainContainer: {
    backgroundColor: COLORS.primary,
    width: width > 600 ? 500 : width - 80,
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
    padding: 16,
    zIndex: 1,
  },
  modeSelectionContainer: {
    position: 'absolute',
    zIndex: 1,
    top: -25,
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'auto',
    left: 18,
  },
  startBtn: {
    position: 'absolute',
    zIndex: 1,
    bottom: -22,
    right: -20,
  },
  descriptor: {
    color: COLORS.paper,
    fontSize: normalize(16),
    textAlign: 'center',
  },
  descriptorContainer: {
    backgroundColor: COLORS.main,
    width: '100%',
    marginBottom: 30,
    paddingVertical: 6,
    borderWidth: 2,
    borderRadius: 50,
    fontWeight: 'semibold',
  },
  modeBtnContainer: {
    flex: 1,
    marginTop: 16,
    marginBottom: 8,
    position: 'relative',
  },
  modeCard: {
    backgroundColor: COLORS.paper,
    borderRadius: 8,
    width: 123,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    position: 'absolute',
    borderWidth: 4,
    borderColor: COLORS.paper,
  },
  modeTxt: {
    color: COLORS.main,
    fontWeight: 'bold',
    fontSize: normalize(16),
    textAlign: 'center',
  },
  single: {
    top: 10,
    left: width > 600 ? '10%' : 0,
  },
  multi: {
    right: width > 600 ? '8%' : 0,
    top: 45,
  },
  ai: {
    top: 125,
    left: width > 600 ? '35%' : 65,
    transform: [{rotate: '5deg'}],
  },
  mid: {
    top: 215,
    right: width > 600 ? '20%' : 25,
    transform: [{rotate: '-5deg'}],
  },
  easy: {
    bottom: 10,
    left: width > 600 ? '10%' : 10,
  },
  selectedMode: {
    borderColor: COLORS.secondary,
  },
  artwork: {
    width: 40,
    height: 40,
    position: 'absolute',
    zIndex: -1,
    top: 0,
  },
  clawImage: {
    height: 250,
    width: 250,
    position: 'absolute',
    zIndex: -2,
  },
  topClaw: {
    top: -65,
    right: -65,
    transform: [{rotate: '180deg'}],
  },
  bottomClaw: {
    bottom: -65,
    left: -65,
  },
});

export default styles;
