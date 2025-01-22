import {View, Text} from 'react-native';
import React from 'react';
import Routes from './src/Routes/Index';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Chat2 from './src/Routes/Test/Chat2';
import Chat3 from './src/Screens/Auth/Home/Chat/Chat3';
import BackDrop from './src/Routes/Test/BackDrop';
import PodCast from './src/Screens/Auth/Home/Chat/PodCast/PodCast';
import Chat from './src/Screens/Auth/Home/Chat/Chat';
import Audio from './src/Routes/Test/Audio';
import LiveStreaming from './src/Routes/Test/LiveStreaming';
import Chats1 from './src/tests/Chats1';
import {store} from './src/store/store';
// import Sw
import {Provider} from 'react-redux';

// import Agora
import Agora from './src/Routes/Agora';

export default function App() {
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
