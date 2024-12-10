import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import Landing from '../Screens/Guest/Landing';
import Phone from '../Screens/Guest/Phone';
import SplashScreen from '../Screens/Guest/SplashScreen';
import Home from '../Screens/Auth/Home/Home';
import GeneralPermission from '../Components/GeneralPermission';
import HomeB from '../Screens/Auth/Home/HomeB';
import Notifications from '../Screens/Auth/Home/Notifications';
import UserProfile from '../Screens/Auth/Home/Profile/UserProfile';
import Coin from '../Screens/Auth/Home/Profile/Coin';
import VIP from '../Screens/Auth/Home/Profile/VIP';
import Ranking from '../Screens/Auth/Home/Profile/ShortCuts/Ranking';
import Inbox from '../Screens/Auth/Home/Profile/ShortCuts/Inbox';
import Friends from '../Screens/Auth/Home/Profile/ShortCuts/Friends';
import Agency from '../Screens/Auth/Home/Profile/ShortCuts/Agency';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
// const Navigation = createStaticNavigation(RootStack);
const Stack = createNativeStackNavigator();

export default function Index() {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    hideLoader();
  }, []);

  const hideLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 800);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{headerShown: false}}>
          {loader ? (
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
          ) : (
            <>
              {/* <Stack.Screen
                name="GeneralPermission"
                component={GeneralPermission}
              /> */}
              <Stack.Screen name="HomeB" component={HomeB} />
              <Stack.Screen name="VIP" component={VIP} />
              <Stack.Group>
                <Stack.Screen name="Agency" component={Agency} />
                <Stack.Screen name="Friends" component={Friends} />
                <Stack.Screen name="Inbox" component={Inbox} />
                <Stack.Screen name="Ranking" component={Ranking} />
              </Stack.Group>
              <Stack.Screen name="UserProfile" component={UserProfile} />
              <Stack.Screen name="Coin" component={Coin} />
              <Stack.Screen name="Notifications" component={Notifications} />
              <Stack.Screen name="Landing" component={Landing} />
              <Stack.Screen name="Phone" component={Phone} />
            </>
          )}
        </Stack.Group>

        {/* <Stack.Screen  name="Home" component={HomeScreen}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Imran = () => {
  return (
    <View>
      <Text>sss</Text>
    </View>
  );
};
