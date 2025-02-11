import {
  View,
  Text,
  StyleSheet,
  Platform,
  Switch,
  Linking,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  AppState,
  ImageBackground,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import StartModal from './Components/StartModal';
import appStyles from '../../../../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../../styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import {setLiveForm, setLiveFormFull} from '../../../../store/slice/usersSlice';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {checkCamPermission} from '../../../../scripts';

interface StartLiveProps {
  navigation: any;
}
export default function StartLive({navigation}: StartLiveProps) {
  const dispatch = useDispatch();
  const camRef = useRef<Camera>(null);
  const {liveForm} = useSelector((state: any) => state.user);
  const [beautySettings, setBeautySettings] = useState(false);
  const [editor, setEditor] = useState<any>({
    device: '',
    ready: false,
    type: '',
  });
  const [liveType, setLiveType] = useState('');
  const [modal, setModal] = useState<boolean>(false);
  const devices = useCameraDevices();
  // useEffect(() => {
  //   async function getPermission() {
  //     const permission = await Camera.requestCameraPermission();
  //     console.log(`Camera permission status: ${permission}`);
  //     if (permission === 'denied') await Linking.openSettings();
  //   }
  //   getPermission();
  // }, []);

  const useSpecificCamera = (position: 'front' | 'back') => {
    return devices.find(device => device.position === position);
  };
  const startCamera = async () => {
    const permission = await checkCamPermission();
    if (!permission) {
      Alert.alert('Permission', ' required');
      return;
    }
    let back = useSpecificCamera('back');
    // console.log(back);
    if (!back) {
      Alert.alert('Camera Device', 'Not found');
      return;
    }
    if (back) {
      setEditor(() => ({type: 'back', device: back, ready: true}));
    }
  };
  const switchCamera = () => {
    if (editor.type == 'back') {
      let front = useSpecificCamera('front');
      setEditor(() => ({type: 'back', device: front, ready: true}));
      return;
    }
    let back = useSpecificCamera('back');
    setEditor(() => ({type: 'back', device: back, ready: true}));
  };

  const capturePhoto = async () => {
    try {
      // camRef.
      const file = await camRef.current?.takePhoto();
      Alert.alert('Photo captured', '');
      console.log(file);
    } catch (error) {
      console.log(error);
    }
  };
  // const device = devices.back;

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          marginTop: Platform.OS == 'ios' ? 55 : 0,
          flex: 1,
          width: '100%',
        }}
        source={require('../../../../assets/images/parts/flowerBg.jpg')}>
        <View
          style={{
            height: '77%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}>
          <Text style={styles.heading}>Start Live</Text>
          {editor.ready && editor.device && (
            <Camera
              ref={camRef}
              style={StyleSheet.absoluteFill}
              device={editor.device}
              isActive={editor.ready}
              photo={true}
              preview={true}
            />
          )}
          {beautySettings && liveForm.liveType == 'video' && (
            <View style={styles.filter}>
              <TouchableOpacity
                onPress={switchCamera}
                style={{alignItems: 'center'}}>
                <Icon
                  name="camera-flip-outline"
                  color={colors.complimentary}
                  size={30}
                />
                <Text style={styles.filterTxt}>Switch Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={capturePhoto}
                style={{alignItems: 'center'}}>
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
        </View>

        <View
          style={{
            height: '23%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}>
          <View style={{alignItems: 'center'}}>
            <View style={{width: '100%', marginTop: 10}}>
              {liveForm.liveType == 'video' && (
                <View style={styles.beautify}>
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
                    onValueChange={(value: boolean) => {
                      setBeautySettings(value);
                      if (editor.ready) {
                        setEditor((prev: any) => ({...prev, ready: false}));
                        return;
                      }
                      startCamera();
                    }}
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
                    if (liveForm.liveType == 'podcast') {
                      setModal(true);
                      return;
                    }
                    if (liveForm.liveType == 'video') {
                      dispatch(
                        setLiveFormFull({
                          liveType: 'video',
                          type: 'PUBLIC',
                          title: 'test title',
                          duration: 20,
                        }),
                      );
                      navigation.navigate('GoLive2');
                    }
                  }}
                  style={styles.btn}>
                  <Text style={[appStyles.paragraph1]}>Go Live</Text>
                </TouchableOpacity>
                <View style={styles.tabs}>
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
    bottom: 0, // Adjust as needed
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
  tabs: {
    flexDirection: 'row',
    marginTop: 15,
    width: '80%',
    justifyContent: 'space-around',
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
  beautify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
});
