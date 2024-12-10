import {View, Text} from 'react-native';
import React from 'react';
import Landing from './src/Screens/Guest/Landing';
import Routes from './src/Routes/Index';
import SplashScreen from './src/Screens/Guest/SplashScreen';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <Routes />
      {/* <SplashScreen /> */}
      {/* <Landing /> */}
      {/* <Text>App</Text> */}
    </View>
  );
}
