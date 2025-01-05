import {View, Text} from 'react-native';
import React from 'react';
import Routes from './src/Routes/Index';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Chat2 from './src/Routes/Test/Chat2';
import Chat3 from './src/Screens/Auth/Home/Chat/Chat3';
import PodCast from './src/Screens/Auth/Home/Chat/PodCast/PodCast';
import LiveStreaming from './src/Routes/Test/LiveStreaming';
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
          {/* r          <Chat3 /> */}

          {/* <PodCast /> */}
          <Routes />
        </Provider>
      </View>
    </GestureHandlerRootView>
  );
}
