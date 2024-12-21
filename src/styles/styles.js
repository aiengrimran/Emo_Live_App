import {StyleSheet, Platform} from 'react-native';
import {colors} from './colors';

// SemiBold 600

const appStyles = StyleSheet.create({
  display1: {
    fontSize: 36,
    fontWeight: '600',
    fontFamily: 'Kanit',
  },
  title1: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Kanit',
  },
  headline: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Kanit',
  },
  headline2: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Kanit',
  },
  paragraph1: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Kanit',
  },
  regularTxtMd: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Kanit',
  },
  regularTxtRg: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Kanit',
  },
  bodyMd: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Kanit',
  },
  bodyRg: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Kanit',
  },
  smallTxt: {
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Kanit',
  },
  small: {
    fontSize: 6,
    fontWeight: '500',
    fontFamily: 'Kanit',
  },
  userAvatar: {
    width: 120,
    height: 120,
    borderRadius: 80,
    borderColor: colors.lines,
    borderWidth: 1,
  },
  header: {
    marginTop: 70,
  },
  backBtn: {
    marginTop: Platform.OS == 'ios' ? 40 : 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    padding: 16,
  },
  bottomBtn: {
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? 40 : 20,
    backgroundColor: colors.accent,
    // backgroundColor: colors.alpha_dark,
    width: '80%',
    borderRadius: 24,
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default appStyles;
