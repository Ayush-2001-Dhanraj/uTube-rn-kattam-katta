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
    width: '80%',
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
  },
  modeSelectionContainer: {
    position: 'absolute',
    zIndex: 1000,
    top: -25,
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'auto',
  },
  startBtn: {
    position: 'absolute',
    zIndex: 1000,
    bottom: -20,
    right: -20,
  },
  descriptor: {
    color: COLORS.paper,
    fontSize: 20,
    textAlign: 'center',
  },
  descriptorContainer: {
    backgroundColor: COLORS.main,
    width: '100%',
    marginBottom: 30,
    paddingVertical: 10,
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
    fontWeight: 'semibold',
    fontSize: 20,
    textAlign: 'center',
  },
  single: {
    top: 10,
  },
  multi: {
    right: 0,
    top: 45,
  },
  ai: {
    top: 125,
    left: 65,
    transform: [{rotate: '5deg'}],
  },
  mid: {
    top: 215,
    right: 25,
    transform: [{rotate: '-5deg'}],
  },
  easy: {
    bottom: 10,
  },
  selectedMode: {
    borderColor: COLORS.secondary,
  },
  artwork: {
    width: 100,
    height: 100,
    position: 'absolute',
    zIndex: -1,
    top: 0,
  },
});

export default styles;
