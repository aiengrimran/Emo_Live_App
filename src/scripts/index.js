import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
export default scripts = {
  clearError: (setError, setLoading) => {
    setLoading(false);
    setTimeout(() => {
      setError('');
    }, 3000);
  },
  updateUserInAsyncStorage: async user => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  },
};

export const checkPermission = async () => {
  if (Platform.OS === 'ios') {
    const photoPermission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    // const photoPermission = await PERMISSIONS.IOS.PHOTO_LIBRARY.request();
    if (photoPermission === RESULTS.GRANTED) {
      // if (cameraPermission === RESULTS.GRANTED && photoPermission === RESULTS.GRANTED) {
      return true;
    }
    if (photoPermission === 'denied') {
      const PermissionResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (PermissionResult == 'granted') {
        return true;
      }
    } else {
      return false;
    }
  } else {
    const cameraPermission = await check(PERMISSIONS.ANDROID.CAMERA);
    if (cameraPermission == 'granted') return true;
    if (cameraPermission == 'denied') {
      let result = await request(PERMISSIONS.ANDROID.CAMERA);
      if (result == 'granted') {
        return true;
      }
    } else {
      return false;
    }
  }
};
export const checkAudioInputPermission = async () => {
  if (Platform.OS === 'ios') {
    // const cameraPermission = await PERMISSIONS.IOS.CAMERA.request();
    const photoPermission = await check(PERMISSIONS.IOS.MICROPHONE);

    // const photoPermission = await PERMISSIONS.IOS.PHOTO_LIBRARY.request();
    if (photoPermission === RESULTS.GRANTED) {
      // if (cameraPermission === RESULTS.GRANTED && photoPermission === RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } else {
    const cameraPermission = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (cameraPermission == 'granted') return true;
    const request2 = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (request2 == 'granted') {
      return true;
    } else {
      return false;
    }
  }
};
