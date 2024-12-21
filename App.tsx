import {View, Text} from 'react-native';
import React from 'react';
import Routes from './src/Routes/Index';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Chat2 from './src/Routes/Test/Chat2';
import LiveStreaming from './src/Routes/Test/LiveStreaming';
// import Sw

// import Agora
import Agora from './src/Routes/Agora';

export default function App() {
  return (
    <GestureHandlerRootView>
      <View style={{flex: 1}}>
        {/* <Agora2 /> */}
        {/* <SwipeImran/> */}
        {/* <GestureTest/> */}
        {/* <MoveFunction/> */}
        {/* <LiveStreaming /> */}
        <Chat2 />
        {/* <Routes /> */}
      </View>
    </GestureHandlerRootView>
  );
}
