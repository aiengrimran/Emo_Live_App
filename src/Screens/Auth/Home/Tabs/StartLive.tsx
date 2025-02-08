import {
  View,
  Text,
  StyleSheet,
  Platform,
  Switch,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  AppState,
  ImageBackground,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import StartModal from './Components/StartModal';
import appStyles from '../../../../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../../styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import {setLiveForm} from '../../../../store/slice/usersSlice';

interface StartLiveProps {
  navigation: any;
}
export default function StartLive({navigation}: StartLiveProps) {
  const dispatch = useDispatch();
  const {liveForm} = useSelector((state: any) => state.user);
  const [beautySettings, setBeautySettings] = useState(false);
  const [liveType, setLiveType] = useState('');
  const [modal, setModal] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          marginTop: 55,
          flex: 1,
          width: '100%',
        }}
        source={require('../../../../assets/images/parts/flowerBg.jpg')}>
        <View
          style={{
            height: '60%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}>
          <Text style={styles.heading}>Start Live</Text>
        </View>

        <View
          style={{
            height: '40%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}>
          <View style={{alignItems: 'center'}}>
            {beautySettings && liveType == 'video' && (
              <View style={styles.filter}>
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
              {liveForm.liveType == 'video' && (
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
                <TouchableOpacity
                  onPress={() => {
                    if (!liveForm.liveType) {
                      Alert.alert('Error', 'Please Select Live Type');
                      return;
                    }
                    setModal(true);
                  }}
                  style={styles.btn}>
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
                    onPress={() => {
                      dispatch(
                        setLiveForm({field: 'liveType', value: 'video'}),
                      );
                    }}
                    style={[
                      styles.tab,
                      liveForm.liveType == 'video'
                        ? {borderBottomWidth: 6}
                        : {},
                    ]}>
                    <Text
                      style={[appStyles.bodyMd, {color: colors.complimentary}]}>
                      Video Live
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(
                        setLiveForm({field: 'liveType', value: 'podcast'}),
                      );
                    }}
                    style={[
                      styles.tab,
                      liveForm.liveType == 'podcast'
                        ? {borderBottomWidth: 6}
                        : {},
                    ]}>
                    <Text
                      style={[appStyles.bodyMd, {color: colors.complimentary}]}>
                      Audio Live
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    // onPress={() => {
                    //   dispatch(
                    //     setLiveForm({field: 'liveType', value: 'podcast'}),
                    //   );
                    // }}
                    style={[
                      styles.tab,
                      liveForm.liveType == 'secured'
                        ? {borderBottomWidth: 6}
                        : {},
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
        <StartModal navigation={navigation} modal={modal} setModal={setModal} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LG,
  },
  heading: {
    ...appStyles.headline,
    color: colors.complimentary,
    textAlign: 'center',
  },
  label: {
    ...appStyles.paragraph1,
    color: colors.complimentary,
    marginTop: 10,
  },
  inputBox: {
    marginTop: 5,
    borderColor: colors.complimentary,
    borderWidth: 1,
    color: colors.complimentary,
    padding: 12,
    borderRadius: 4,
  },
  filter: {
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
  },
  genderBtn: {
    borderColor: 'grey',
    justifyContent: 'center',
    padding: 15,
    width: '52%',
  },
  genderTxt: {
    color: '#fff',
    textAlign: 'center',
  },
  rightBtn: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  leftBtn: {
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  btn: {
    marginTop: 20,
    width: '99%',
    alignSelf: 'center',
    borderColor: colors.accent,
    borderWidth: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 9,
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
