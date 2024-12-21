import {View, Text} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
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
import PurchaseVIP from '../Screens/Auth/Home/Profile/PurchaseVIP';
import JoinAgency from '../Screens/Auth/Home/Profile/ShortCuts/JoinAgency';
import UpdatePassword from '../Screens/Auth/Home/Profile/CRUD/UpdatePassword';
import Register from '../Screens/Guest/Register';
import BlockedUsers from '../Screens/Auth/Home/Profile/Settings/BlockedList';
import ForgetPassword from '../Screens/Guest/ForgetPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chat from '../Screens/Auth/Home/Chat/Chat';
import GoLive from '../Screens/Auth/Home/Tabs/GoLive';
import Settings from '../Screens/Auth/Home/Profile/ShortCuts/Settings';
import NotificationSettings from '../Screens/Auth/Home/Profile/Settings/NotificationSettings';
// import Notifications from '../Screens/Auth/Home/Notifications';
// import Edit
import Context from '../Context/Context';
import EditProfile from '../Screens/Auth/Home/Profile/EditProfile';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {isSearchBarAvailableForCurrentPlatform} from 'react-native-screens';
// const Navigation = createStaticNavigation(RootStack);
const Stack = createNativeStackNavigator();

export default function Index() {
  const [loader, setLoader] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  // const [token, setToken] = useState(null<String| null>);

  useEffect(() => {
    checkUser();
    hideLoader();
  }, []);

  const checkUser = async () => {
    const loggedUser = await AsyncStorage.getItem('loggedUser');
    if (loggedUser) {
      // let user = JSON.parse(loggedUser);
      // dispatchAction(updateUser(user.user));
      setToken(loggedUser);
    }
  };
  // };
  const userAuthInfo = useMemo(() => ({token, setToken}), [token]);

  const hideLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 800);
  };

  const valueToContext = {
    userAuthInfo,
  };
  return (
    <Context.Provider value={valueToContext}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group screenOptions={{headerShown: false}}>
            {loader ? (
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
            ) : (
              <>
                {token == null ? (
                  <Stack.Group>
                    <Stack.Screen name="Landing" component={Landing} />
                    <Stack.Screen name="Phone" component={Phone} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen
                      name="ForgetPassword"
                      component={ForgetPassword}
                    />
                  </Stack.Group>
                ) : (
                  <>
                    <Stack.Screen name="HomeB" component={HomeB} />
                    <Stack.Screen name="VIP" component={VIP} />
                    <Stack.Group>
                      <Stack.Screen name="Agency" component={Agency} />
                      <Stack.Screen name="Friends" component={Friends} />
                      <Stack.Screen name="Inbox" component={Inbox} />
                      <Stack.Screen name="Ranking" component={Ranking} />
                    </Stack.Group>
                    <Stack.Screen name="UserProfile" component={UserProfile} />
                    <Stack.Screen name="PurchaseVIP" component={PurchaseVIP} />
                    <Stack.Screen
                      name="UpdatePassword"
                      component={UpdatePassword}
                    />
                    <Stack.Screen name="GoLive" component={GoLive} />
                    <Stack.Screen name="Coin" component={Coin} />
                    <Stack.Screen name="Chat" component={Chat} />
                    <Stack.Screen name="Settings" component={Settings} />
                    <Stack.Screen name="JoinAgency" component={JoinAgency} />
                    <Stack.Screen name="EditProfile" component={EditProfile} />
                    <Stack.Screen
                      name="Notifications"
                      component={Notifications}
                    />
                    <Stack.Screen
                      name="NotificationSettings"
                      component={NotificationSettings}
                    />
                    <Stack.Screen
                      name="BlockedUsers"
                      component={BlockedUsers}
                    />
                  </>
                )}
              </>
            )}
          </Stack.Group>

          {/* <Stack.Screen  name="Home" component={HomeScreen}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}

const Imran = () => {
  return (
    <View>
      <Text>sss</Text>
    </View>
  );
};
