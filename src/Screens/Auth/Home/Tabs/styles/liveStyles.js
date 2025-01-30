import {colors} from '../../../../../styles/colors';
import {StyleSheet} from 'react-native';
import appStyles from '../../../../../styles/styles';
const liveStyles = StyleSheet.create({
  chatAvatar: {width: 60, height: 60, borderRadius: 35},
  sofa: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: '#874975',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    backgroundColor: '#11132c',
    color: colors.complimentary,
    borderWidth: 1,
    width: '50%',
    borderStartEndRadius: 48,
    borderRadius: 50,
    alignSelf: 'flex-start',
    borderStartStartRadius: 48,
  },
  action: {
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.LG,
  },
  sheetAvatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.lines,
  },
  sheetUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginVertical: 20,
  },
  followBtn: {
    width: '45%',
    borderRadius: 25,
    padding: 20,
    borderColor: colors.complimentary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetStatus: {
    flexDirection: 'row',
    width: '70%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  points: {
    flexDirection: 'row',
    backgroundColor: colors.semantic,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 30,
  },
  sheetAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '90%',
    alignSelf: 'center',
  },
  btn1: {
    position: 'relative',
    flexDirection: 'row',
    width: '99%',
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usersList: {
    flexDirection: 'row',
    width: '99%',
    justifyContent: 'space-around',
  },

  sheetBtnTxt: {
    ...appStyles.regularTxtMd,
    color: colors.body_text,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  heading: {
    ...appStyles.headline,
    color: colors.complimentary,
    textAlign: 'center',
    alignSelf: 'center',
  },
  image: {
    flex: 1,
    padding: 10,
  },
  reportBtn: {
    borderRadius: 25,
    paddingHorizontal: 10,
    borderColor: colors.body_text,
    borderWidth: 1,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 30,
    left: 30,
    paddingVertical: 5,
  },
  users: {
    flexDirection: 'row',
    width: '99%',
    justifyContent: 'space-around',
  },
});

export default liveStyles;
