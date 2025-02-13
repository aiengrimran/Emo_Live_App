import {StyleSheet} from 'react-native';
import {colors} from '../../../../../../styles/colors';
import {appStyles} from '../../Podcast/podcastImport';
const styles = StyleSheet.create({
  singleLive: {
    backgroundColor: colors.LG,
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  messages: {
    height: '60%',
    marginTop: 10,
    bottom: 120,
  },

  sheetMessage: {
    flexDirection: 'row',
    width: '95%',
    paddingHorizontal: 20,
    borderRadius: 4,
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  guest: {
    marginTop: 20,
    paddingVertical: 10,
    width: '95%',
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  list: {
    padding: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default styles;
