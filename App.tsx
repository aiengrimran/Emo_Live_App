import {
  View,
  Alert,
  I18nManager,
  BackHandler,
  Platform,
  LayoutAnimation,
} from 'react-native';
import React from 'react';
import Routes from './src/Routes/Index';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import hotUpdate from 'react-native-ota-hot-update';
import {store} from './src/store/store';
import Chats1 from './src/tests/Chats1';
import LiveStreaming from './src/tests/LiveStreaming';
// import Sw
import {Provider} from 'react-redux';

// import Agora
import Agora from './src/Routes/Agora';

// Replace <TOKEN> with your actual GitHub token

export default function App() {
  if (I18nManager.isRTL) {
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false);
    // Show an alert and restart app
    Alert.alert(
      'Restart Required',
      'The Emo Live needs to restart to apply set Arabic settings.',
      [{text: 'OK', onPress: () => BackHandler.exitApp()}],
    );
  }
  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const onCheckGitVersion = () => {
    setProgress(0);
    setLoading(true);
    hotUpdate.git.checkForGitUpdate({
      branch: Platform.OS === 'ios' ? 'iOS' : 'android',
      bundlePath:
        Platform.OS === 'ios'
          ? 'output/main.jsbundle'
          : 'output/index.android.bundle',
      url: 'https://github.com/aiengrimran/OTA-bundlep.git',
      // url: 'https://github.com/aiengrimran/OTA-bundle.git',
      onCloneFailed(msg: string) {
        Alert.alert('Clone project failed!', msg, [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ]);
      },
      onCloneSuccess() {
        Alert.alert('Clone project success!', 'Restart to apply the changing', [
          {
            text: 'ok',
            onPress: () => hotUpdate.resetApp(),
          },
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ]);
      },
      onPullFailed(msg: string) {
        Alert.alert('Pull project failed!', msg, [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ]);
      },
      onPullSuccess() {
        Alert.alert('Pull project success!', 'Restart to apply the changing', [
          {
            text: 'ok',
            onPress: () => hotUpdate.resetApp(),
          },
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ]);
      },
      onProgress(received: number, total: number) {
        const percent = (+received / +total) * 100;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setProgress(percent);
      },
      onFinishProgress() {
        setLoading(false);
      },
    });
  };
  return (
    <GestureHandlerRootView>
      <View style={{flex: 1}}>
        {/* <Agora2 /> */}
        {/* <PodCast /> */}
        {/* <SwipeImran/> */}
        {/* <GestureTest/> */}
        {/* <MoveFunction/> */}
        {/* <LiveStreaming /> */}
        <Provider store={store}>
          {/* <PodCast /> */}
          {/* <Audio /> */}
          {/* <Chat /> */}
          {/* <Chats1 /> */}
          <Routes />
          {/* <BackDrop /> */}
        </Provider>
      </View>
    </GestureHandlerRootView>
  );
}
