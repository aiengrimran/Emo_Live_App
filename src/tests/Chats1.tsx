import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../styles/colors';
import {ChatClient} from 'react-native-agora-chat';
import appStyles from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Chats1() {
  const [liveType, setLiveType] = useState('');
  const [beautySettings, setBeautySettings] = useState(false);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          marginTop: 55,
          flex: 1,
          width: '100%',
          // height: '100%',
          //   marginTop: 100,
        }}
        source={require('../assets/images/parts/flowerBg.jpg')}>
        <View
          style={{
            height: '60%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}>
          <TouchableOpacity style={{marginTop: 20, marginLeft: 30}}>
            <Icon name="chevron-left" size={25} color={colors.complimentary} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: '40%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}>
          <View style={{alignItems: 'center'}}>
            {beautySettings && liveType == 'video' && (
              <View
                style={{
                  // display: beautySettings ? 'flex' : 'none',
                  position: 'absolute', // Keeps it from affecting other elements
                  top: 0, // Adjust as needed
                  left: 20,
                  right: 0,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '90%',
                  justifyContent: 'space-evenly',
                  // justifyContent: 'space-between',
                }}>
                <TouchableOpacity style={{alignItems: 'center'}}>
                  <Icon
                    name="camera-flip-outline"
                    color={colors.complimentary}
                    size={30}
                  />
                  <Text style={styles.filterTxt}>Switch Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems: 'center'}}>
                  <Icon
                    name="emoticon-happy-outline"
                    color={colors.complimentary}
                    size={30}
                  />
                  <Text style={styles.filterTxt}>Sticker/Beautify</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems: 'center'}}>
                  <Icon name="mirror" color={colors.complimentary} size={30} />
                  <Text style={styles.filterTxt}>Mirror Camera</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={{width: '100%', marginTop: 80}}>
              {liveType == 'video' && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '90%',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={[appStyles.bodyMd, {color: colors.complimentary}]}>
                    Beauty Settings & more
                  </Text>
                  <Switch
                    trackColor={{
                      false: colors.complimentary,
                      true: colors.accent,
                    }}
                    thumbColor={colors.complimentary}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setBeautySettings}
                    value={beautySettings}
                  />
                </View>
              )}

              <View style={{alignItems: 'center', width: '100%'}}>
                <TouchableOpacity style={styles.btn}>
                  <Text style={[appStyles.paragraph1]}>Go Live</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    width: '80%',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    onPress={() => setLiveType('video')}
                    style={[
                      styles.tab,
                      liveType == 'video' ? {borderBottomWidth: 6} : {},
                    ]}>
                    <Text
                      style={[appStyles.bodyMd, {color: colors.complimentary}]}>
                      Video Live
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setLiveType('audio')}
                    style={[
                      styles.tab,
                      liveType == 'audio' ? {borderBottomWidth: 6} : {},
                    ]}>
                    <Text
                      style={[appStyles.bodyMd, {color: colors.complimentary}]}>
                      Audio Live
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setLiveType('secured')}
                    style={[
                      styles.tab,
                      liveType == 'secured' ? {borderBottomWidth: 6} : {},
                    ]}>
                    <Text
                      style={[appStyles.bodyMd, {color: colors.complimentary}]}>
                      Secured Live
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    borderBottomColor: '#FAEB3B',
    paddingBottom: 5,
    // padding: 10,
  },
  filterTxt: {
    ...appStyles.regularTxtMd,
    marginTop: 5,
    color: colors.complimentary,
  },
  btn: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#FAEB3B',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
