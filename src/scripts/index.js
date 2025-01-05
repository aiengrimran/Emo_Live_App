import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
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
    // const cameraPermission = await PERMISSIONS.IOS.CAMERA.request();
    const photoPermission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);

    // const photoPermission = await PERMISSIONS.IOS.PHOTO_LIBRARY.request();
    if (photoPermission === RESULTS.GRANTED) {
      // if (cameraPermission === RESULTS.GRANTED && photoPermission === RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } else {
    const cameraPermission = await check(PERMISSIONS.ANDROID.CAMERA.request());
    const photoPermission =
      await PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE.request();
    if (
      cameraPermission === RESULTS.GRANTED &&
      photoPermission === RESULTS.GRANTED
    ) {
      return true;
    } else {
      return false;
    }
  }
};
